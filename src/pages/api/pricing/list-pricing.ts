import axios from 'axios';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_CMS } from '../../../config';

async function listPricing(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_CMS}/api/v1/pricing_new?division_list${req.query.division_id}`,
        {
          params: {
            division_id: req.query.division_id
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
  }
}

export default listPricing;
