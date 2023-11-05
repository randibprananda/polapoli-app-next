import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST, BASE_URL } from '../../../config';

async function emailVerification(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = JSON.parse(req.cookies.token);
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/email/verification-notification`,
        {
          custom_url: `${BASE_URL}/auth/register`
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
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

export default emailVerification;
