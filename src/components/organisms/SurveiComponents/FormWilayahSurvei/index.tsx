import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { FormWilayahWithJenisWilayah } from '../../../moleculs';
import Props from './formWilayahSurvei.props';

const FormWilayahSurvei: React.FC<Props> = ({
  modalState,
  isEdit = true,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  setDynamicModalState,
  customName,
  form,
  isDetail
}) => {
  return (
    <Row gutter={[6, 24]}>
      <Col xs={24}>
        <div className="bg-grey3 flex items-start justify-center p-3 mb-1">
          <p className="text-base font-semibold">Wilayah Survei</p>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          label="Judul"
          name="judul_survey"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan Judul'
            }
          ]}
          className="mb-0"
        >
          <Input placeholder="Judul" disabled={isDetail} />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <FormWilayahWithJenisWilayah
          modalState={modalState}
          isEdit
          wilayah={wilayah}
          setWilayah={setWilayah}
          provinsiData={provinsiData}
          kotaData={kotaData}
          kecamatanData={kecamatanData}
          kelurahanData={kelurahanData}
          setDynamicModalState={setDynamicModalState}
          withTitle={false}
          withDapil={true}
          label="Pilih Tingkat Wilayah Survey"
          customName={customName}
          isDetail={isDetail}
        />
      </Col>
      <Col xs={24}>
        <Form.Item
          label="Target Responden"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan Target Responden'
            },
            {
              validator: (rule, value) => {
                if (value < 0) {
                  return Promise.reject(
                    'Target Responden Tidak Boleh Berisi Nilai Negatif'
                  );
                }
                return Promise.resolve();
              }
            }
          ]}
          className="mb-0"
          name="target_responden"
        >
          <Input
            placeholder="Target Responden"
            type="number"
            disabled={isDetail}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormWilayahSurvei;
