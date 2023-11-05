import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_CMS } from '../../../../config';

async function author(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_CMS}/api/v1/outhor/${req.query.id}`,
        {
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

export default author;
