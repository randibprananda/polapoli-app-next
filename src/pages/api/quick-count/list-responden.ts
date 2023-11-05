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

async function listResponden(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token.replace(/"/g, '');
  if (req.method === 'GET') {
    try {
      const response = await axios.get(
        `${API_BACKEND_HOST}/api/v1/quick-count/list`,
        {
          params: {
            propinsi_id: req.query.propinsi_id,
            kabupaten_id: req.query.kabupaten_id,
            kecamatan_id: req.query.kecamatan_id,
            kelurahan_id: req.query.kelurahan_id,
            tps: req.query.tps,
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
      formData.append('metode_pengambilan', jsonData.fields.metode_pengambilan);
      formData.append(
        'kandidat_pilihan_id',
        jsonData.fields.kandidat_pilihan_id
      );
      formData.append('propinsi_id', jsonData.fields.propinsi_id);
      formData.append('kabupaten_id', jsonData.fields.kabupaten_id);
      formData.append('kecamatan_id', jsonData.fields.kecamatan_id);
      formData.append('kelurahan_id', jsonData.fields.kelurahan_id);
      formData.append('tps', jsonData.fields.tps);
      formData.append('referal_relawan', jsonData.fields.referal_relawan);
      formData.append('nama_responden', jsonData.fields.nama_responden);
      jsonData.fields.keterangan &&
        formData.append('keterangan', jsonData.fields.keterangan);
      jsonData.fields.no_hp && formData.append('no_hp', jsonData.fields.no_hp);
      jsonData.fields.no_hp_lain &&
        formData.append('no_hp_lain', jsonData.fields.no_hp_lain);
      jsonData.fields.no_hp_lain &&
        formData.append('no_hp_lain', jsonData.fields.no_hp_lain);
      jsonData.fields.nik && formData.append('nik', jsonData.fields.nik);
      jsonData.fields.nik && formData.append('nik', jsonData.fields.nik);
      jsonData.fields.no_hp_lain &&
        formData.append('no_hp_lain', jsonData.fields.no_hp_lain);
      jsonData.files.bukti &&
        formData.append(
          'bukti',
          createReadStream(jsonData.files.bukti.filepath)
        );
      jsonData.fields.kandidat_partai_id &&
        formData.append(
          'kandidat_partai_id',
          jsonData.fields.kandidat_partai_id
        );
      formData.append('isLegislatif', jsonData.fields.isLegislatif);

      const response = await axios.post(
        `${API_BACKEND_HOST}/api/v1/quick-count${
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
        `${API_BACKEND_HOST}/api/v1/quick-count/delete/${req.query.id}`,
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
