import { Col, Form, Row, Select } from 'antd';
import React from 'react';

import { METODE_PENGAMBILAN_COUNT } from '../../../../constant';

const { Option } = Select;
const FormMetodePengambilan: React.FC<{ isDetail?: boolean }> = ({
  isDetail = false
}) => {
  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="flex items-start justify-center p-3 mb-1 bg-grey3">
          <h2 className="text-base font-semibold">Metode Pengambilan</h2>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          className="mb-0"
          name="metode_pengambilan"
          label="Metode Pengambilan"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan Metode Pengambilan'
            }
          ]}
        >
          <Select placeholder="Metode Pengambilan" disabled={isDetail}>
            {METODE_PENGAMBILAN_COUNT?.map((item: string) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormMetodePengambilan;
