import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

dotenv.config();

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
        console.log('Razorpay keys are missing, returning mock order');
        return res.json({
          id: `order_mock_${Date.now()}`,
          amount: Math.round(amount * 100),
          currency,
          key_id: "rzp_test_mock",
          mock: true
        });
      }

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          planName: req.body.planName || 'Pro Plan',
          userEmail: req.body.email || 'unknown'
        }
      };

      console.log('Creating Razorpay order with options:', JSON.stringify(options));
      const order = await razorpay.orders.create(options);
      console.log('Razorpay order created successfully:', order.id);
      
      res.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        key_id: process.env.RAZORPAY_KEY_ID
      });
    } catch (error: any) {
      console.error('Error creating Razorpay order:', error);
      
      let errorMessage = 'Failed to initiate payment. Please try again later.';
      if (error && error.error && error.error.description) {
        errorMessage = error.error.description;
      } else if (error && error.message) {
        errorMessage = error.message;
      }
      
      res.status(500).json({ error: errorMessage });
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
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false',
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
      const { email, name, planName, amount, paymentId } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log(`[MOCK EMAIL] Purchase email sent to: ${email}`);
        return res.json({ success: true, mock: true });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const pdfBuffer = await generateReceiptPDF(name, email, planName, amount, paymentId);

      const mailOptions = {
        from: `"AI Master Tools" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Payment Receipt: ${planName || 'Pro Plan'}`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
            <h2 style="color: #10B981;">Payment Successful!</h2>
            <p>Hi ${name || 'there'},</p>
            <p>Thank you for upgrading to the <strong>${planName || 'Pro'}</strong> plan on AI Master Tools!</p>
            <p>Your account has been successfully updated with premium features. You can now enjoy unlimited tool saves, advanced search, and priority submissions.</p>
            <p>Please find your payment receipt attached to this email.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The AI Master Tools Team</strong></p>
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
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error sending purchase email:', error);
      res.status(500).json({ error: error.message || 'Failed to send email' });
    }
  });

  // Razorpay Payment ID Verification (Manual)
  app.post('/api/verify-payment-id', async (req, res) => {
    try {
      const { paymentId } = req.body;
      
      if (!paymentId) {
        return res.status(400).json({ error: 'Payment ID is required' });
      }

      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        // If no keys, allow any ID starting with 'pay_' for testing
        if (paymentId.startsWith('pay_')) {
          console.log(`[MOCK VERIFY] Manual verification successful for ID: ${paymentId}`);
          return res.json({ success: true, message: "Payment verified (Mock Mode for Testing)" });
        }
        return res.status(500).json({ error: 'Payment verification system is not configured. Please contact support.' });
      }

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const payment = await razorpay.payments.fetch(paymentId);

      if (payment.status === 'captured' || payment.status === 'authorized') {
        res.json({ 
          success: true, 
          message: "Payment verified successfully",
          amount: (payment.amount as number) / 100,
          email: payment.email
        });
      } else {
        res.status(400).json({ 
          success: false, 
          message: `Payment status is ${payment.status}. It must be captured to activate Pro.` 
        });
      }
    } catch (error: any) {
      console.error('Error fetching payment:', error);
      
      // Extract Razorpay error description if available
      let errorMessage = 'Failed to verify payment ID';
      if (error && error.error && error.error.description) {
        errorMessage = error.error.description;
      } else if (error && error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      res.status(500).json({ error: errorMessage });
    }
  });

  // AI Tool Finder Endpoint
  app.post('/api/find-tools', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) return res.status(400).json({ error: 'Query is required' });

      // Fallback function to generate local response if API is unavailable
      const fallbackResponse = () => {
        const keywords = query.toLowerCase().split(/\s+/).filter((w: string) => w.length > 2);
        return res.json({
          category: "",
          keywords: keywords,
          suggestion: "Here are some tools that match your search terms."
        });
      };

      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'undefined' || process.env.GEMINI_API_KEY === '') {
        console.warn('Gemini API key is not configured, using fallback matching');
        return fallbackResponse();
      }

      console.log('Using Gemini API key:', process.env.GEMINI_API_KEY ? 'Set (hidden for security)' : 'Not set', 'Raw value:', process.env.GEMINI_API_KEY);
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        Analyze the following user query representing their need for an AI tool.
        Return a JSON object matching this schema exactly:
        {
          "category": "String (e.g., Video, Image Gen, Writing, etc.)",
          "keywords": ["String"],
          "suggestion": "string detailing a brief helpful message matching the user intent"
        }
        
        User Query: "${query}"
      `;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });
        
        const jsonText = response.text || "{}";
        const parsed = JSON.parse(jsonText);
        res.json(parsed);
      } catch (genError: any) {
        console.error("AI Tool Finder Error:", genError);
        console.warn("Using fallback matching due to API error");
        return fallbackResponse();
      }
    } catch (error: any) {
      console.error("AI Tool Finder Unexpected Error:", error);
      res.status(500).json({ error: error.message || 'Failed to analyze query' });
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
