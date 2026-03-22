import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, planName } = req.body;

    if (!email || !planName) {
      return res.status(400).json({ error: 'Email and plan name are required' });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log(`[MOCK EMAIL] Purchase email for ${planName} would be sent to ${email}`);
      return res.json({ success: true, message: "Email logged (Mock Mode)" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'false' ? false : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"AI Master Tools" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for purchasing ${planName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4f46e5;">Thank you for your purchase!</h2>
          <p>Hi ${name || 'there'},</p>
          <p>We've successfully processed your payment for the <strong>${planName}</strong> plan.</p>
          <p>Your account has been upgraded, and you now have access to all premium features.</p>
          <p>If you have any questions or need support, please reply to this email.</p>
          <br/>
          <p>Best regards,</p>
          <p>The AI Master Tools Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Purchase email sent successfully" });
  } catch (error: any) {
    console.error('Error sending purchase email:', error);
    res.status(500).json({ error: error.message || 'Failed to send purchase email' });
  }
}
