import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../../config';
import cookie from 'cookie';

async function jumlahDPT(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/jumlah-dpt/list-all`,
        {
          params: {
            propinsi_id: req.query.propinsi_id,
            kabupaten_id: req.query.kabupaten_id,
            kecamatan_id: req.query.kecamatan_id
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
  } else if (req.method === 'POST') {
    try {
      const form = {
        ...req.body,
        propinsi_id: req.body.propinsi_id + '',
        kabupaten_id: req.body.kabupaten_id + '',
        kecamatan_id: req.body.kecamatan_id + ''
      };
      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/jumlah-dpt/add-jumlah-dpt`,
        form,
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
      res.status(error.response.status).json({
        data: error.response.data
      });
      return;
    }
  } else if (req.method === 'PUT') {
    try {
      const form = {
        ...req.body,
        propinsi_id: req.body.propinsi_id + '',
        kabupaten_id: req.body.kabupaten_id + '',
        kecamatan_id: req.body.kecamatan_id + '',
        kelurahan_id: req.body.kelurahan_id + ''
      };
      const response = await axios.put(
        `${API_BACKEND_HOST}/api/v1/jumlah-dpt/update/${req.query.id}`,
        form,
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
      res.status(error.response.status).json({
        data: error.response.data
      });
      return;
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await axios.delete(
        `${API_BACKEND_HOST}/api/v1/jumlah-dpt/delete/${req.query.id}`,
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

export default jumlahDPT;
