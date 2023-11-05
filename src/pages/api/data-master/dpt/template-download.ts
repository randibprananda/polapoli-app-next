import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../../config';
import cookie from 'cookie';

async function downloadTemplateDPT(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/jumlah-dpt/file-export-jumlah-dpt`,
        req.body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          responseType: 'arraybuffer'
        }
      );

      res
        .status(response.status)
        .setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
        .setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        .setHeader(
          'content-disposition',
          response.headers['content-disposition']
        )
        .json(response.data);
      return;
    } catch (error: any) {
      console.log(error.response);
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

export default downloadTemplateDPT;
