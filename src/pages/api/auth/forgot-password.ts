import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST, BASE_URL } from '../../../config';

async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/forgot-password`,
        req.body,
        {
          params: {
            custom_url: `${BASE_URL}/auth/register`
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      res.status(response.status).json(response.data);
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

export default forgotPassword;
