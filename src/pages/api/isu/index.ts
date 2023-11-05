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

async function isu(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/issue/list-all`,
        {
          params: {
            page: req.query.page,
            search: req.query.search,
            jenis_isu_id: req.query.jenisIsu
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
      formData.append('jenis_isu_id', jsonData.fields.jenis_isu_id);
      formData.append('dampak_isu', jsonData.fields.dampak_isu);
      formData.append('tanggal_isu', jsonData.fields.tanggal_isu);
      formData.append('keterangan_isu', jsonData.fields.keterangan_isu);
      formData.append('nama_pelapor', jsonData.fields.nama_pelapor);
      jsonData.fields.tanggapan_isu &&
        formData.append('tanggapan_isu', jsonData.fields.tanggapan_isu);
      jsonData.fields.judul_isu &&
        formData.append('judul_isu', jsonData.fields.judul_isu);
      jsonData.fields.url_isu &&
        formData.append('url_isu', jsonData.fields.url_isu);
      jsonData.fields.propinsi_id &&
        formData.append('propinsi_id', jsonData.fields.propinsi_id);
      jsonData.fields.kabupaten_id &&
        formData.append('kabupaten_id', jsonData.fields.kabupaten_id);
      jsonData.fields.kecamatan_id &&
        formData.append('kecamatan_id', jsonData.fields.kecamatan_id);
      jsonData.fields.kelurahan_id &&
        formData.append('kelurahan_id', jsonData.fields.kelurahan_id);
      jsonData.fields.dapil && formData.append('dapil', jsonData.fields.dapil);

      jsonData.files.foto_isu &&
        formData.append(
          'foto_isu',
          createReadStream(jsonData.files.foto_isu.filepath)
        );

      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/issue${
          req.query.id ? `/update/${req.query.id}` : '/add-issue'
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
      console.log(error);
      res.status(error.response.status).json({
        data: error.response.data
      });
      return;
    }
  } else if (req.method === 'DELETE') {
    try {
      const response = await axios.delete(
        `${API_BACKEND_HOST}/api/v1/issue/delete/${req.query.id}`,
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

export default isu;
