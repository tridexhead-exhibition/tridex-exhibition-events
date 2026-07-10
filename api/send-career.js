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
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-top: 5px solid #e53935; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                <!-- Header Banner -->
                <div style="background-color: #091a24; padding: 25px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 1px;">TRIDEX CAREERS</h1>
                  <p style="color: #e53935; margin: 5px 0 0 0; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">Build Your Career with Industry Leaders</p>
                </div>
                
                <!-- Content Area -->
                <div style="padding: 30px;">
                  <h2 style="color: #091a24; font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 20px;">Application Confirmed</h2>
                  <p style="font-size: 15px; margin-bottom: 15px;">Dear <strong>${name}</strong>,</p>
                  <p style="font-size: 15px; margin-bottom: 15px; color: #555555;">Thank you for submitting your application for the <strong>${position}</strong> position at <strong>Tridex Exhibitions &amp; Events</strong>.</p>
                  <p style="font-size: 15px; margin-bottom: 20px; color: #555555;">Our Human Resources team has received your details and attached resume. We review all applications carefully and will reach out to you within 3-5 business days if your profile matches our current qualifications.</p>
                  
                  <div style="background-color: #f8f9fa; border-left: 4px solid #e53935; padding: 15px 20px; border-radius: 4px; margin-bottom: 25px; font-size: 14px;">
                    <strong>Application Details:</strong><br/>
                    <span style="color: #777777;">Position:</span> <span style="color: #091a24; font-weight: 600;">${position}</span>
                  </div>
                  
                  <p style="font-size: 14px; color: #555555; margin-bottom: 25px;">
                    If you need to update any information or share additional portfolios, feel free to reply directly to this email or write to us at <a href="mailto:info@tridexexhibit.com" style="color: #e53935; text-decoration: none; font-weight: 600;">info@tridexexhibit.com</a>.
                  </p>
                  
                  <!-- Footer Signature -->
                  <div style="border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 25px;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #091a24;">Best Regards,</p>
                    <p style="margin: 3px 0 0 0; font-size: 14px; font-weight: 600; color: #e53935;">HR Department</p>
                    <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: 600; color: #091a24;">Tridex Exhibitions &amp; Events</p>
                    <p style="margin: 15px 0 0 0; font-size: 12px; color: #888888; line-height: 1.4;">
                      Exhibition Stand Builder &amp; Turnkey Contractor<br/>
                      <a href="https://tridexexhibit.com" style="color: #e53935; text-decoration: none;">www.tridexexhibit.com</a> | <a href="mailto:info@tridexexhibit.com" style="color: #e53935; text-decoration: none;">info@tridexexhibit.com</a>
                    </p>
                  </div>
                </div>
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
