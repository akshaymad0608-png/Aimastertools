export default function handler(request: any, response: any) {
  response.status(200).json({
    status: 'ok',
    platform: 'vercel',
    timestamp: new Date().toISOString(),
  });
}
