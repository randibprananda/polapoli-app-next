import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { JENIS_KELAMIN } from '../../../../constant';

const { Option } = Select;

type BiodataKoordinatorProps = {
  isDetail: boolean;
};

const BiodataKoordinator: React.FC<BiodataKoordinatorProps> = ({
  isDetail
}) => {
  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <Form.Item
          name="nama"
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
          <Input placeholder="Masukkan nama" readOnly={isDetail} />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="email"
          label="Email"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan email',
              type: 'email'
            }
          ]}
          required
        >
          <Input
            placeholder="Masukkan email"
            type="email"
            readOnly={isDetail}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="nomor_hp"
          label="No HP"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Tidak boleh kosong!'
            },
            {
              message: 'Nomor Handphone minimal 10 digit!',
              pattern: /^([0-9]){10,}$/
            },
            {
              message:
                'Nomor Handphone tidak boleh lebih dari 13/14 digit angka!',
              pattern: /^([0-9]){1,14}$/
            }
          ]}
          required
        >
          <Input
            placeholder="Masukkan No HP "
            type="number"
            readOnly={isDetail}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="jenis_kelamin"
          label="Jenis Kelamin"
          className="w-full mb-0"
          rules={[
            {
              required: true,
              message: 'Pilih Jenis Kelamin'
            }
          ]}
          required
        >
          <Select placeholder="Pilih Jenis Kelamin" disabled={isDetail}>
            {JENIS_KELAMIN?.map(item => (
              <Option key={item.key}>{item.value}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24}>
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
            placeholder="Masukkan Keterangan"
            readOnly={isDetail}
          />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <p className="p-0 m-0 text-xs italic font-normal text-center">
          *Pastikan input email dengan benar, karena undangan akan dikirim via
          email.
        </p>
      </Col>
    </Row>
  );
};

export default BiodataKoordinator;
