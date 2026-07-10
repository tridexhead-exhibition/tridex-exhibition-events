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
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-top: 5px solid #e53935; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                <!-- Header Banner -->
                <div style="background-color: #091a24; padding: 25px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 1px;">TRIDEX EXHIBITIONS</h1>
                  <p style="color: #e53935; margin: 5px 0 0 0; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">Exhibition Stand Builder &amp; Turnkey Contractor</p>
                </div>
                
                <!-- Content Area -->
                <div style="padding: 30px;">
                  <h2 style="color: #091a24; font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 20px;">Inquiry Confirmation</h2>
                  <p style="font-size: 15px; margin-bottom: 15px;">Dear <strong>${yourName}</strong>,</p>
                  <p style="font-size: 15px; margin-bottom: 15px; color: #555555;">Thank you for reaching out to <strong>Tridex Exhibitions &amp; Events</strong>. We have successfully received your inquiry for custom exhibition stall design and fabrication.</p>
                  <p style="font-size: 15px; margin-bottom: 20px; color: #555555;">Our dedicated project design team is already reviewing your booth space requirements. We will get back to you within 24 hours with a custom 3D stall proposal and detailed costing sheet.</p>
                  
                  <!-- Summary Card -->
                  <div style="background-color: #f8f9fa; border-left: 4px solid #e53935; padding: 20px; border-radius: 4px; margin-bottom: 25px;">
                    <h3 style="margin-top: 0; color: #091a24; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Inquiry Details Summary</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr>
                        <td style="padding: 4px 0; color: #777777; width: 35%;">Company Name:</td>
                        <td style="padding: 4px 0; color: #091a24; font-weight: 600;">${companyName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #777777;">Show Name:</td>
                        <td style="padding: 4px 0; color: #091a24; font-weight: 600;">${showName || 'N/A'}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <p style="font-size: 14px; color: #555555; background-color: #fff9f9; border: 1px dashed #ffcdd2; padding: 12px; border-radius: 4px; margin-bottom: 25px;">
                    <strong>Next Steps:</strong> If you have any hall layout, space drawing, or references, please reply directly to this email or send them to <a href="mailto:info@tridexexhibit.com" style="color: #e53935; text-decoration: none; font-weight: 600;">info@tridexexhibit.com</a>.
                  </p>
                  
                  <!-- Footer Signature -->
                  <div style="border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 25px;">
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #091a24;">Best Regards,</p>
                    <p style="margin: 3px 0 0 0; font-size: 14px; font-weight: 600; color: #e53935;">Team Tridex Exhibitions</p>
                    <p style="margin: 15px 0 0 0; font-size: 12px; color: #888888; line-height: 1.4;">
                      <strong>Tridex Exhibitions &amp; Events</strong><br/>
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
