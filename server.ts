import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Razorpay Order Creation
  app.post('/api/create-order', async (req, res) => {
    try {
      const { amount, currency = 'INR' } = req.body;
      
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        // Return a mock order if keys are not configured so the user can test the UI
        return res.json({
          id: `mock_order_${Date.now()}`,
          currency,
          amount: amount * 100,
          key_id: 'mock_key_id',
          isMock: true
        });
      }

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: amount * 100, // amount in smallest currency unit (paise)
        currency,
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      
      res.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        key_id: process.env.RAZORPAY_KEY_ID
      });
    } catch (error: any) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: error.message || 'Something went wrong' });
    }
  });

  // Razorpay Payment Verification
  app.post('/api/verify-payment', (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      if (!process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ error: 'Razorpay secret not configured' });
      }

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, message: "Invalid signature sent!" });
      }
    } catch (error: any) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: error.message || 'Something went wrong' });
    }
  });

  // Send Welcome Email
  app.post('/api/send-welcome-email', async (req, res) => {
    try {
      const { email, name } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log(`[MOCK EMAIL] Welcome email sent to: ${email}`);
        return res.json({ success: true, mock: true });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"AI Master Tools" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank You for Logging In! 🚀',
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2 style="color: #3B82F6;">Welcome back to AI Master Tools!</h2>
            <p>Hi ${name || 'there'},</p>
            <p>Thank you for logging in to AI Master Tools. We are thrilled to have you!</p>
            <p>Explore the best AI tools, compare features, and boost your productivity.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The AI Master Tools Team</strong></p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: error.message || 'Failed to send email' });
    }
  });

  // Send Purchase Email
  app.post('/api/send-purchase-email', async (req, res) => {
    try {
      const { email, name, planName } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log(`[MOCK EMAIL] Purchase email sent to: ${email}`);
        return res.json({ success: true, mock: true });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"AI Master Tools" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank You for Your Purchase! 🎉',
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2 style="color: #10B981;">Payment Successful!</h2>
            <p>Hi ${name || 'there'},</p>
            <p>Thank you for upgrading to the <strong>${planName || 'Pro'}</strong> plan on AI Master Tools!</p>
            <p>Your account has been successfully updated with premium features. You can now enjoy unlimited tool saves, advanced search, and priority submissions.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The AI Master Tools Team</strong></p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error sending purchase email:', error);
      res.status(500).json({ error: error.message || 'Failed to send email' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*all', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
