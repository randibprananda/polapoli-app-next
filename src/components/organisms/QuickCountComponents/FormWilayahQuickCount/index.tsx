import { Row, Col, Form, Input } from 'antd';
import React from 'react';
import { FormWilayah } from '../../../moleculs';
import Props from './formWilayahQuickCount.props';

const FormWilayahQuickCount: React.FC<Props> = ({
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
        title="Wilayah Quick Count"
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
              },
              {
                pattern: /^([0-9])/,
                message: 'TPS harus berupa angka tidak boleh kurang dari 0'
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
      </Row>
    </>
  );
};

export default FormWilayahQuickCount;
