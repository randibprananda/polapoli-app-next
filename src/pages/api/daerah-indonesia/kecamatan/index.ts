import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { API_BACKEND_HOST } from '../../../../config';

async function kecamatan(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  let token = cookies.token;
  if (token) {
    token = token.replace(/"/g, '');
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized'
    });
  }
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/wilayah/kecamatan/${req.query.id_kota}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      res.status(response.status).json(response.data.data);
      return;
    } catch (error: any) {
      res.status(error.response.status).json({
        data: error.response.data
      });
      return;
    }
  } else if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/wilayah/kecamatan/detail/${req.query.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      res.status(response.status).json(response.data.data);
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

export default kecamatan;
