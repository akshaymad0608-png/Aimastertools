import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log(`[MOCK EMAIL] Welcome email would be sent to ${email}`);
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
      subject: 'Welcome to AI Master Tools!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4f46e5;">Welcome to AI Master Tools!</h2>
          <p>Hi ${name || 'there'},</p>
          <p>Thank you for joining AI Master Tools. We're excited to have you on board!</p>
          <p>With your account, you can now access our suite of AI-powered tools designed to boost your productivity.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <br/>
          <p>Best regards,</p>
          <p>The AI Master Tools Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Welcome email sent successfully" });
  } catch (error: any) {
    console.error('Error sending welcome email:', error);
    res.status(500).json({ error: error.message || 'Failed to send welcome email' });
  }
}
