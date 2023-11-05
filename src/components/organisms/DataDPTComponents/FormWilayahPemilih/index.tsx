import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { FormDapil, FormWilayah } from '../../../moleculs';
import Props from './formWilayahPemilih.props';

const FormWilayahPemilih: React.FC<Props> = ({
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  isPemilih,
  form,
  mounted,
  isDetail
}) => {
  return (
    <>
      <FormWilayah
        wilayah={wilayah}
        setWilayah={setWilayah}
        provinsiData={provinsiData}
        kotaData={kotaData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        disableAllInput={isDetail}
      />
      <Row gutter={[6, 24]}>
        <Col xs={24}>
          <FormDapil
            mounted={mounted}
            form={form}
            allDisabled={isDetail}
            isActive={!!wilayah.provinsi}
          />
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="TPS"
            name="tps"
            className="mb-0"
            required
            rules={[
              {
                required: true,
                message: 'Masukkan TPS'
              },
              {
                validator: (rule, value) => {
                  if (value < 0) {
                    return Promise.reject('TPS tidak boleh negatif');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input
              type="number"
              placeholder="Masukkan TPS"
              disabled={isDetail}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="RW"
            name="rw"
            className="mb-0"
            required
            rules={[
              {
                required: true,
                message: 'Masukkan RW'
              },
              {
                validator: (rule, value) => {
                  if (value < 0) {
                    return Promise.reject('RW tidak boleh negatif');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input
              type="number"
              placeholder="Masukkan RW"
              disabled={isDetail}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="RT"
            name="rt"
            className="mb-0"
            required
            rules={[
              {
                required: true,
                message: 'Masukkan RT'
              },
              {
                validator: (rule, value) => {
                  if (value < 0) {
                    return Promise.reject('RT tidak boleh negatif');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input
              type="number"
              placeholder="Masukkan RT"
              disabled={isDetail}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Alamat"
            name="alamat"
            className="mb-0"
            required
            rules={[
              {
                required: true,
                message: 'Masukkan Alamat'
              }
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Masukkan Alamat"
              disabled={isDetail}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormWilayahPemilih;
