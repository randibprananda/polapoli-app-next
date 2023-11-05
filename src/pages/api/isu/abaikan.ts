import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../config';
import cookie from 'cookie';

async function abaikanIsu(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');

  if (req.method === 'PUT') {
    try {
      const response = await axios.put(
        `${API_BACKEND_HOST}/api/v1/issue/response/abaikan/${req.query.id}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      res.status(response.status).json(response.data);
      return;
    } catch (error: any) {
      console.log(error);
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

export default abaikanIsu;
