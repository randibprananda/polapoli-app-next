import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../../config';

async function getDetailKemenanganBySlug(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/web-kemenangan/${req.query.slug ? req.query.slug : '-'}`,
      );

      res.status(response.status).json(response.data);
      return;
    } catch (error: any) {
      console.log(error.response.data, error)
      res.status(error.response.status).json({
        data: error.response.data
      });
      return;
    }
  }
}

export default getDetailKemenanganBySlug;
