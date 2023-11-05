import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { FormWilayah } from '../../../moleculs';
import Props from './formWilayahRealCount.props';

const FormWilayahRealCount: React.FC<Props> = ({
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  disableAllInput
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
        title="Wilayah Real Count"
        disableAllInput={disableAllInput}
      />
      <Row gutter={[6, 24]}>
        <Col xs={24}>
          <Form.Item
            label="TPS"
            name="tps"
            className="mb-0"
            required
            rules={[
              {
                required: true,
                message: 'Masukkan TPS'
              }
            ]}
          >
            <Input
              type="number"
              placeholder="Masukkan TPS"
              disabled={disableAllInput}
            />
          </Form.Item>
        </Col>
        {/* <Col xs={24}>
          <Form.Item
            label="Saksi/Relawan"
            name="saksi"
            className="mb-0"
            required
            rules={[
              {
                required: true,
                message: 'Masukkan Saksi'
              }
            ]}
          >
            <Input  placeholder="Masukkan Saksi/Relawan" disabled />
          </Form.Item>
        </Col> */}
        <Col xs={24}>
          <Form.Item
            label="Keterangan"
            name="keterangan"
            className="mb-0"
            rules={[
              {
                required: !disableAllInput,
                message: 'Masukkan keterangan'
              }
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Masukkan Keterangan"
              readOnly={disableAllInput}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormWilayahRealCount;
