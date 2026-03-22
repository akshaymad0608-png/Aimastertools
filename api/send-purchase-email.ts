import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

function generateReceiptPDF(name: string, email: string, planName: string, amount: number, paymentId: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text('AI Master Tools', { align: 'center' });
    doc.fontSize(14).font('Helvetica').text('Payment Receipt', { align: 'center' });
    doc.moveDown(2);

    // Details
    const date = new Date().toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    
    doc.fontSize(12);
    doc.font('Helvetica-Bold').text('Billed To:');
    doc.font('Helvetica').text(`Name: ${name || 'N/A'}`);
    doc.text(`Email: ${email}`);
    doc.moveDown(1);

    doc.font('Helvetica-Bold').text('Transaction Details:');
    doc.font('Helvetica').text(`Date: ${date}`);
    doc.text(`Transaction ID: ${paymentId || 'N/A'}`);
    doc.moveDown(2);

    // Table Header
    doc.font('Helvetica-Bold');
    doc.text('---------------------------------------------------------------------------');
    doc.text('Description');
    doc.text('---------------------------------------------------------------------------');
    doc.moveDown(0.5);
    
    // Item
    doc.font('Helvetica');
    doc.text(`Subscription: ${planName}`);
    doc.text(`Amount: Rs. ${amount || 0}`);
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold');
    doc.text('---------------------------------------------------------------------------');
    doc.moveDown();
    
    // Total
    doc.fontSize(16).text(`Total Paid: Rs. ${amount || 0}`);

    doc.moveDown(4);
    doc.fontSize(10).font('Helvetica-Oblique').fillColor('gray').text('Thank you for your business!', { align: 'center' });

    doc.end();
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, planName, amount, paymentId } = req.body;

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

    const pdfBuffer = await generateReceiptPDF(name, email, planName, amount, paymentId);

    const mailOptions = {
      from: `"AI Master Tools" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Payment Receipt: ${planName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4f46e5;">Thank you for your purchase!</h2>
          <p>Hi ${name || 'there'},</p>
          <p>We've successfully processed your payment for the <strong>${planName}</strong> plan.</p>
          <p>Your account has been upgraded, and you now have access to all premium features.</p>
          <p>Please find your payment receipt attached to this email.</p>
          <p>If you have any questions or need support, please reply to this email.</p>
          <br/>
          <p>Best regards,</p>
          <p>The AI Master Tools Team</p>
        </div>
      `,
      attachments: [
        {
          filename: `Receipt-${paymentId || 'Order'}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Purchase email sent successfully" });
  } catch (error: any) {
    console.error('Error sending purchase email:', error);
    res.status(500).json({ error: error.message || 'Failed to send purchase email' });
  }
}
