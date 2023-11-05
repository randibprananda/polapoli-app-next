import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../config';
import cookie from 'cookie';

async function registerAdmin(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/register`,
        req.body
      );

      const userData = {
        name: response.data.data.user?.name,
        username: response.data.data.user?.username
      };

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', JSON.stringify(response.data.data.token), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 12,
          sameSite: 'strict',
          path: '/'
        })
      );

      res.status(response.status).json(userData);
      return;
    } catch (error: any) {
      res.status(error.response.status).json({
        data: error.response.data
      });
      return;
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      status: 'error',
      message: `Method ${req.method} not allowed`
    });
  }
}

export default registerAdmin;
