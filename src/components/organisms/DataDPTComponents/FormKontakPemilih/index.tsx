import { Col, Form, Input, Row } from 'antd';
import React from 'react';

const FormKontakPemilih: React.FC<{
  isDetail?: boolean;
  isPemilih?: boolean;
}> = ({ isDetail = false, isPemilih }) => {
  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="flex items-start justify-center p-3 mb-1 bg-grey3">
          <h2 className="text-base font-semibold">Informasi Kontak</h2>
        </div>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          className="mb-0"
          name="no_hp"
          label="No HP"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan No HP',
              pattern: /^([0-9]){10,13}$/
            }
          ]}
        >
          <Input
            placeholder="No. HP"
            type="number"
            readOnly={!isPemilih}
            disabled={isDetail}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          className="mb-0"
          name="no_hp_lainnya"
          label="No. HP Lainnya (opsional)"
        >
          <Input
            placeholder="No. HP Lainnya (opsional)"
            readOnly={!isPemilih}
            disabled={isDetail}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          className="mb-0"
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'Masukkan email dengan format yang benar'
            }
          ]}
        >
          <Input
            placeholder="Email"
            type="email"
            readOnly={!isPemilih}
            disabled={isDetail}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormKontakPemilih;
