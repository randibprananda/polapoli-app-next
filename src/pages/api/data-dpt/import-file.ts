import axios from 'axios';
import cookie from 'cookie';
import formidable from 'formidable';
import { createReadStream } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BACKEND_HOST } from '../../../config';

export const config = {
  api: {
    bodyParser: false
  }
};

async function importDPT(req: NextApiRequest, res: NextApiResponse) {
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
      formData.append('propinsi_id', jsonData.fields.propinsi_id);
      formData.append('kabupaten_id', jsonData.fields.kabupaten_id);
      formData.append('kecamatan_id', jsonData.fields.kecamatan_id);
      formData.append('kelurahan_id', jsonData.fields.kelurahan_id);
      formData.append('dapil', jsonData.fields.dapil);
      formData.append(
        'file_dpt',
        createReadStream(jsonData.files.file_dpt.filepath)
      );

      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/dpt/file-import-dpt`,
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

export default importDPT;
