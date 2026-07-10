// Vercel Serverless Function: api/send-schedule.js
// Securely forwards callback scheduling requests to info@tridexexhibit.com using Resend.

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

  const { name, email, phone, date, timeSlot } = req.body;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ message: 'Production Error: Resend API key is not configured on the Vercel dashboard.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Tridex Schedule Call <onboarding@resend.dev>', // Replace with verified sender domain on Resend
        to: 'info@tridexexhibit.com',
        subject: `New Call Scheduled: ${name} on ${date}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #091a24; border-bottom: 2px solid #e53935; padding-bottom: 10px; margin-top: 0;">New Call Callback Scheduled</h2>
            <p>A client has requested a call callback with the following preferences:</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #555;">Name:</td>
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
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Preferred Date:</td>
                <td style="padding: 8px 0; color: #091a24; font-weight: bold;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Preferred Time Slot:</td>
                <td style="padding: 8px 0; color: #091a24; font-weight: bold; color: #e53935;">${timeSlot}</td>
              </tr>
            </table>
            
            <footer style="margin-top: 25px; font-size: 0.8rem; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
              This scheduling request was safely transmitted from the Tridex Exhibition Floating Contact panel.
            </footer>
          </div>
        `
      })
    });

    const result = await response.json();
    if (response.ok) {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(response.status).json({ success: false, message: result.message || 'Resend error scheduling callback.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error processing callback request.' });
  }
}
