import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../config';
import cookie from 'cookie';
import formidable from 'formidable';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

async function pasanganCalon(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/tim-relawan/list-paslon`,
        {
          params: {
            page: req.query.page,
            search: req.query.search
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
      const jsonData: any = await new Promise(function (resolve, reject) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) {
            reject(err);
            return;
          }
          resolve({
            fields,
            files
          });
        });
      });

      var FormData = require('form-data');
      const formData = new FormData();
      formData.append('nama_paslon', jsonData.fields.nama_paslon);
      formData.append('nomor_urut', jsonData.fields.nomor_urut);
      formData.append('jenis_pencalonan', jsonData.fields.jenis_pencalonan);
      formData.append('is_usung', jsonData.fields.is_usung);
      jsonData.files.paslon_profile_photo &&
        formData.append(
          'paslon_profile_photo',
          createReadStream(jsonData.files.paslon_profile_photo.filepath)
        );
      jsonData.fields.nama_wakil_paslon &&
        formData.append('nama_wakil_paslon', jsonData.fields.nama_wakil_paslon);

      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/tim-relawan/paslon${
          req.query.id ? `/update/${req.query.id}` : ''
        }`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
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
        `${API_BACKEND_HOST}/api/v1/tim-relawan/paslon/${req.query.id}`,
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

export default pasanganCalon;
