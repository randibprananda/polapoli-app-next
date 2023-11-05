import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

async function resetCookies(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      res.setHeader('Set-Cookie', [
        cookie.serialize('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          expires: new Date(0),
          sameSite: 'strict',
          path: '/'
        }),
        cookie.serialize('user', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          expires: new Date(0),
          sameSite: 'strict',
          path: '/'
        })
      ]);
      res.status(200).json({
        message: 'Success'
      });
    } catch (error: any) {
      res.status(error.response.status).json({
        data: error.response.data
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      status: 'error',
      message: `Method ${req.method} not allowed`
    });
  }
}

export default resetCookies;
