import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../config';
import cookie from 'cookie';

async function dataDPT(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/dpt/detail-by-nik?nik=${req.query.nik}`,
        {
          params: {
            page: req.query.page,
            search: req.query.search,
            nik: req.query.nik,
            isPemilih: req.query.isPemilih
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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
  }
}

export default dataDPT;
