import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../../config';
import cookie from 'cookie';
import formidable from 'formidable';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

async function updateBackground(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');

  if (req.method === 'POST') {
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
      formData.append(
        'background_web_kemenangan',
        createReadStream(jsonData.files.background_web_kemenangan.filepath)
      );

      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/web-kemenangan/update-background`,
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
  }
}

export default updateBackground;
