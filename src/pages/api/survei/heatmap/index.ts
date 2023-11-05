import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { API_BACKEND_HOST } from '../../../../config';

async function survei(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/survey/result/detail/by-relawan/${req.query.survei}/${req.query.relawan}`,
        {
          params: {
            page: req.query.page
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.query.token}`
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

export default survei;
