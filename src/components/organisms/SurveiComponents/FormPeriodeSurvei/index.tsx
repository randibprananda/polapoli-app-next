import { Col, DatePicker, Form, Input, Row } from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;

const FormPeriodeSurvei: React.FC<{ isDetail: boolean }> = ({ isDetail }) => {
  return (
    <Row gutter={[6, 24]}>
      {/* <Col xs={24}>
        <div className="flex items-start justify-center p-3 mb-1 bg-grey3">
          <p className="text-base font-semibold">Periode Survei</p>
        </div>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          name="pembukaan_survey"
          label="Mulai dari"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan Mulai dari'
            }
          ]}
          className="mb-0"
        >
          <DatePicker className="w-full" placeholder="Mulai dari" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          name="penutupan_survey"
          label="Sampai dari"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan Sampai dari'
            }
          ]}
          className="mb-0"
        >
          <DatePicker className="w-full" placeholder="Sampai dari" />
        </Form.Item>
        
      </Col> */}
      <Col xs={24}>
        <Form.Item
          name="range"
          label="Mulai dari - Sampai dari"
          required
          rules={[
            {
              required: true,
              message: 'Tidak boleh kosong'
            }
          ]}
          className="mb-0"
        >
          <RangePicker
            className="w-full"
            placeholder={['Mulai dari', 'Sampai dari']}
            disabled={isDetail}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormPeriodeSurvei;
