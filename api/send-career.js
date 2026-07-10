// Vercel Serverless Function: api/send-career.js
// Securely forwards job applications and attached resumes to info@tridexexhibit.com using Resend.

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, position, message, cvFile } = req.body;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ message: 'Production Error: Resend API key is not configured on the Vercel dashboard.' });
  }

  try {
    const payload = {
      from: 'Tridex Careers <info@tridexexhibit.com>',
      to: 'info@tridexexhibit.com',
      reply_to: email,
      subject: `New Job Application: ${name} (${position})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #091a24; border-bottom: 2px solid #e53935; padding-bottom: 10px; margin-top: 0;">New Job Application</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #555;">Candidate Name:</td>
              <td style="padding: 8px 0; color: #091a24;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email Address:</td>
              <td style="padding: 8px 0; color: #091a24;"><a href="mailto:${email}" style="color: #e53935; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone Number:</td>
              <td style="padding: 8px 0; color: #091a24;"><a href="tel:${phone}" style="color: #e53935; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Position Applied:</td>
              <td style="padding: 8px 0; color: #091a24; font-weight: bold;">${position}</td>
            </tr>
          </table>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border: 1px solid #ddd; margin-top: 15px;">
            <h4 style="margin-top: 0; color: #091a24; margin-bottom: 8px;">Cover Message / Brief Profile:</h4>
            <p style="margin: 0; white-space: pre-wrap; font-size: 0.95rem; color: #444;">${message || 'No cover message provided.'}</p>
          </div>
          
          <p style="margin-top: 20px; font-size: 0.9rem; color: #666;">
            <strong>Attached Resume:</strong> ${cvFile ? cvFile.name : 'None (No attachment found)'}
          </p>
          
          <footer style="margin-top: 25px; font-size: 0.8rem; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
            This job application was safely submitted from the Tridex Exhibition Career page.
          </footer>
        </div>
      `
    };

    // Attach CV file if present in Base64
    if (cvFile && cvFile.base64) {
      const base64Data = cvFile.base64.split(',')[1] || cvFile.base64;
      payload.attachments = [
        {
          content: base64Data,
          filename: cvFile.name
        }
      ];
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (response.ok) {
      // 2. Send Auto-Reply to the candidate from info@tridexexhibit.com
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Tridex Careers <info@tridexexhibit.com>',
            to: email,
            subject: `Application Received - Tridex Exhibitions`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: #091a24; border-bottom: 2px solid #e53935; padding-bottom: 10px; margin-top: 0;">Application Confirmed</h2>
                <p>Dear ${name},</p>
                <p>Thank you for submitting your application for the <strong>${position}</strong> position at <strong>Tridex Exhibitions &amp; Events</strong>.</p>
                <p>Our Human Resources team has received your details and attached resume. We review all applications carefully and will reach out to you within 3-5 business days if your profile matches our current requirements.</p>
                <br/>
                <p>Best Regards,</p>
                <p><strong>HR Department</strong><br/>
                <strong>Tridex Exhibitions &amp; Events</strong><br/>
                <a href="https://tridexexhibit.com" style="color: #e53935; text-decoration: none;">www.tridexexhibit.com</a></p>
              </div>
            `
          })
        });
      } catch (autoReplyErr) {
        console.error('Failed to send auto-reply to candidate:', autoReplyErr);
      }

      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(response.status).json({ success: false, message: result.message || 'Resend error sending CV email.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error processing CV upload.' });
  }
}
}
