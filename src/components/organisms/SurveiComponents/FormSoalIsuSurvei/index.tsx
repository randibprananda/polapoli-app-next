import { Col, Row } from 'antd';
import React from 'react';

import { OBJ_TIPE_SOAL_JAWABAN } from '../../../../constant';
import { SoalSurveiItem } from '../../../moleculs';
import Props from './formSoalIsuSurvei.props';

const FormSoalIsuSurvei: React.FC<Props> = ({ form, draggerProps }) => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24}>
        <div className="bg-grey3 flex items-start justify-center p-3 mb-1">
          <h2 className="text-base font-semibold">Monitoring Isu</h2>
        </div>
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.gambar}
          label="Foto/Bukti Isu"
          isRequired={true}
          field_id="foto_isu;isu"
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.pilihanGanda}
          opsi={['Isu Lapangan', 'Isu Online']}
          label="Jenis Isu"
          isRequired={false}
          field_id="jenis_isu_id;isu"
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.pilihanGanda}
          opsi={['Positif', 'Negatif', 'Netral']}
          label="Dampak"
          isRequired={true}
          field_id="dampak_isu;isu"
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="Keterangan/Laporan"
          isRequired={true}
          field_id="keterangan_isu;isu"
        />
      </Col>
    </Row>
  );
};

export default FormSoalIsuSurvei;
