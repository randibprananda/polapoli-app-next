import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { RenderIf } from '../../../../utils';
import Props from './formIdentitasResponden.props';

const { Option } = Select;

const FormIdentitasResponden: React.FC<Props> = ({
  isDetail,
  disableAllInput
}) => {
  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="flex items-start justify-center p-3 mb-1 bg-grey3">
          <h2 className="text-base font-semibold">Biodata</h2>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="nama_responden"
          label="Nama"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan nama'
            }
          ]}
          required
        >
          <Input
            placeholder="Masukkan nama"
            readOnly={isDetail}
            disabled={disableAllInput}
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={12}>
        <Form.Item
          name="nik"
          label="NIK"
          className="mb-0"
          rules={[
            {
              message: 'Masukkan NIK (16 karakter) dan Harus Angka',
              pattern: /^([0-9]){16}$/
            }
          ]}
        >
          <Input
            placeholder="Masukkan NIK"
            readOnly={isDetail}
            disabled={disableAllInput}
          />
        </Form.Item>
      </Col>

      <Col xs={24} lg={12}>
        <Form.Item
          name="usia"
          label="Usia"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Usia wajib diisi'
            },
            {
              pattern: /^([0-9])/,
              message: 'Usia harus berupa angka'
            }
          ]}
        >
          <Input
            placeholder="Masukkan Usia"
            readOnly={isDetail}
            disabled={disableAllInput}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="no_hp"
          label="No HP"
          className="mb-0"
          rules={[
            {
              message:
                'No HP harus berupa angka dan terdiri minimal 10 - 13 angka',
              pattern: /^([0-9]){10,13}$/
            }
          ]}
        >
          <Input
            placeholder="Masukkan No HP"
            readOnly={isDetail}
            disabled={disableAllInput}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="no_hp_lain"
          label="No HP Lain"
          className="mb-0"
          rules={[
            {
              message:
                'No HP harus berupa angka dan terdiri minimal 10 - 13 angka',
              pattern: /^([0-9]){10,13}$/
            }
          ]}
        >
          <Input
            placeholder="Masukkan No HP Lain"
            readOnly={isDetail}
            disabled={disableAllInput}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={24}>
        <Form.Item
          name="keterangan"
          label="Keterangan"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan keterangan'
            }
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Keterangan"
            readOnly={isDetail}
            disabled={disableAllInput}
          />
        </Form.Item>
      </Col>
      <RenderIf isTrue={isDetail}>
        <Col xs={24}>
          <Form.Item
            name="referal_relawan"
            label="Referal Relawan"
            className="mb-0"
          >
            <Input
              placeholder="Current User Login"
              disabled={disableAllInput}
            />
          </Form.Item>
        </Col>
      </RenderIf>
    </Row>
  );
};

export default FormIdentitasResponden;
