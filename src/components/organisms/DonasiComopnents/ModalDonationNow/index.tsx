import { Button, Form, Input, Modal, Switch } from 'antd';
import React, { useState } from 'react';
import { currencyFormat, currencyToInt } from '../../../../utils';
import Props from './modalDonationNow.props';

const ModalDonationNow: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  form,
  loading,
  amount,
  setAmount
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">Berikan Donasi</h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={onCreate}
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="Isi Nominal Donasi"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nominal'
            }
          ]}
        >
          <Input
            placeholder="Nominal"
            value={currencyFormat(+amount)}
            onChange={e => {
              const val = e.target.value.replace(/[a-zA-Z\W+]/g, '');
              setAmount(val);
            }}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Nama Lengkap"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nama lengkap'
            }
          ]}
        >
          <Input placeholder="Masukkan nama lengkap" type="text" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan email dengan format yang benar',
              type: 'email'
            }
          ]}
        >
          <Input placeholder="Masukkan email" type="email" />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between items-center">
            <p className="font-medium">Sembunyikan nama saya (donasi anonim)</p>{' '}
            <Form.Item name="is_anonim" valuePropName="checked" noStyle>
              <Switch defaultChecked={false} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          name="message"
          label="Keterangan"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan keterangan'
            }
          ]}
        >
          <Input.TextArea placeholder="Keterangan" rows={4} />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Lanjutkan Pembayaran
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDonationNow;
