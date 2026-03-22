import Razorpay from 'razorpay';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, planName, email } = req.body;

    if (!amount || !planName) {
      return res.status(400).json({ error: 'Amount and plan name are required' });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.json({
        id: `mock_order_${Date.now()}`,
        amount: amount * 100,
        currency: "INR",
        key_id: "rzp_test_mock_key",
        isMock: true
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan: planName,
        email: email || 'anonymous'
      }
    };

    const order = await razorpay.orders.create(options);
    res.json({
      ...order,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    
    let errorMessage = 'Something went wrong';
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
