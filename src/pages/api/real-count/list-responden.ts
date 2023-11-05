import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../config';
import cookie from 'cookie';
import formidable from 'formidable';
import { createReadStream } from 'fs';
import { debugValues } from '../../../utils';

export const config = {
  api: {
    bodyParser: false
  }
};

async function listResponden(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/real-count/list`,
        {
          params: {
            propinsi_id: req.query.propinsi_id,
            kabupaten_id: req.query.kabupaten_id,
            kecamatan_id: req.query.kecamatan_id,
            kelurahan_id: req.query.kelurahan_id,
            isLegislatif: req.query.isLegislatif,
            page: req.query.page
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

      for (const key of Object.keys(jsonData.fields)) {
        if (key !== 'foto_form') {
          formData.append(key, jsonData.fields[key]);
        }
      }

      jsonData.files.foto_form &&
        formData.append(
          'foto_form',
          createReadStream(jsonData.files.foto_form.filepath)
        );

      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/real-count${
          req.query.id ? `/update/${req.query.id}` : '/add'
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
      console.log(error.response.data);
      res.status(error.response.status).json({
        data: error.response.data
      });
      return;
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await axios.delete(
        `${API_BACKEND_HOST}/api/v1/real-count/delete/${req.query.id}`,
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

export default listResponden;
