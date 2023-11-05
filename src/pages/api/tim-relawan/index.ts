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

async function timRelawan(req: NextApiRequest, res: NextApiResponse) {
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
        `${API_BACKEND_HOST}/api/v1/tim-relawan/list`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      res.setHeader('Set-Cookie', [
        cookie.serialize('_r', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          expires: new Date(0),
          sameSite: 'strict',
          path: '/'
        })
      ]);

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
      formData.append('nama_tim_relawan', jsonData.fields.nama_tim_relawan);
      formData.append(
        'photo_tim_relawan',
        createReadStream(jsonData.files.photo_tim_relawan.filepath)
      );

      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/tim-relawan`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            authorization: `Bearer ${token}`
          }
        }
      );

      res.status(response.status).json(response?.data);

      return;
    } catch (error: any) {
      console.log(error.response.data);
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

export default timRelawan;
