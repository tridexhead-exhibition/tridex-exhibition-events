// Vercel Serverless Function: api/send-email.js
// Securely forwards contact form inquiries to info@tridexexhibit.com using Resend.

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

  const { companyName, yourName, email, phone, city, showName, message } = req.body;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ message: 'Production Error: Resend API key is not configured on the Vercel dashboard.' });
  }

  try {
    // 1. Send Inquiry details to Tridex Admin
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Tridex Exhibitions <info@tridexexhibit.com>',
        to: 'info@tridexexhibit.com',
        reply_to: email,
        subject: `New Exhibition Inquiry - ${yourName} (${companyName})`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #091a24; border-bottom: 2px solid #e53935; padding-bottom: 10px; margin-top: 0;">New Exhibition Inquiry</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #555;">Client Name:</td>
                <td style="padding: 8px 0; color: #091a24;">${yourName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Company Name:</td>
                <td style="padding: 8px 0; color: #091a24;">${companyName}</td>
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
                <td style="padding: 8px 0; font-weight: bold; color: #555;">City:</td>
                <td style="padding: 8px 0; color: #091a24;">${city || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Show Name:</td>
                <td style="padding: 8px 0; color: #091a24;">${showName || 'N/A'}</td>
              </tr>
            </table>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border: 1px solid #ddd; margin-top: 15px;">
              <h4 style="margin-top: 0; color: #091a24; margin-bottom: 8px;">Stall Requirements:</h4>
              <p style="margin: 0; white-space: pre-wrap; font-size: 0.95rem; color: #444;">${message}</p>
            </div>
            
            <footer style="margin-top: 25px; font-size: 0.8rem; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
              This inquiry was safely transmitted from the Tridex Exhibition 3D website.
            </footer>
          </div>
        `
      })
    });

    const result = await response.json();

    if (response.ok) {
      // 2. Send Auto-Reply to the client from info@tridexexhibit.com
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Tridex Exhibitions <info@tridexexhibit.com>',
            to: email,
            subject: `Thank you for contacting Tridex Exhibitions`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: #091a24; border-bottom: 2px solid #e53935; padding-bottom: 10px; margin-top: 0;">Inquiry Received</h2>
                <p>Dear ${yourName},</p>
                <p>Thank you for reaching out to <strong>Tridex Exhibitions &amp; Events</strong>. We have successfully received your request for exhibition stall design and turnkey fabrication.</p>
                <p>Our dedicated project coordinator is already reviewing your requirements. We will get back to you within 24 hours with a custom 3D stall proposal and costing details.</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border: 1px solid #ddd; margin: 20px 0;">
                  <h4 style="margin-top: 0; color: #091a24; margin-bottom: 8px;">Summary of your request:</h4>
                  <p style="margin: 0; font-size: 0.95rem; color: #555;"><strong>Company:</strong> ${companyName}</p>
                  <p style="margin: 0; font-size: 0.95rem; color: #555;"><strong>Show:</strong> ${showName || 'N/A'}</p>
                </div>
                <p>If you have any layouts or floor plans to share, please reply directly to this email at <a href="mailto:info@tridexexhibit.com" style="color: #e53935; text-decoration: none;">info@tridexexhibit.com</a>.</p>
                <br/>
                <p>Best Regards,</p>
                <p><strong>Team Tridex Exhibitions</strong><br/>
                <span style="color: #888; font-size: 0.9rem;">Exhibition Stand Builder &amp; Turnkey Contractor</span><br/>
                <a href="https://tridexexhibit.com" style="color: #e53935; text-decoration: none;">www.tridexexhibit.com</a></p>
              </div>
            `
          })
        });
      } catch (autoReplyErr) {
        console.error('Failed to send auto-reply to client:', autoReplyErr);
      }

      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(response.status).json({ success: false, message: result.message || 'Resend error sending email.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error processing mail request.' });
  }
}
}
