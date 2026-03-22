import Razorpay from 'razorpay';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId } = req.body;
    
    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      if (paymentId.startsWith('pay_')) {
        return res.json({ success: true, message: "Payment verified (Mock Mode)" });
      }
      return res.status(500).json({ error: 'Razorpay keys not configured' });
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
}
