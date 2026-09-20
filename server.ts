import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

dotenv.config();

// Rate limiter setup
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false, xForwardedForHeader: false }
});

const getDirname = () => {
  if (typeof __dirname !== 'undefined') {
    return __dirname;
  }
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch (e) {
    return process.cwd();
  }
};
const _dirname = getDirname();

async function startServer() {
  const app = express();
  
  // Trust the reverse proxy to get correct client IPs for rate-limiting
  app.set('trust proxy', 1);
  const PORT = 3000;

  app.use(express.json());
  
  // Apply rate limiting to all API routes
  app.use('/api/', apiLimiter);

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
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

      if (!process.env.GEMINI_API_KEY && !process.env.API_KEY) {
        console.warn('Gemini API key is not configured, using fallback matching');
        return fallbackResponse();
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        console.warn("AI Tool Finder: No API key provided, using fallback matching.");
        return fallbackResponse();
      }
      
      console.log('Using Gemini API key: Set (hidden for security)');
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
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
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });
        
        const jsonText = response.text || "{}";
        const parsed = JSON.parse(jsonText);
        res.json(parsed);
      } catch (genError: any) {
        console.error("AI Tool Finder API Error:", genError.message || "Failed to generate content");
        console.warn("Using fallback matching due to API error.");
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
    app.use(express.static(path.resolve(_dirname, 'dist')));
    app.get('*all', (req, res) => {
      res.sendFile(path.resolve(_dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
