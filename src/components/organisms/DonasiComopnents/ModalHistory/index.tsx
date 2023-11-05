import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { VirtualAccountInterface } from '../../../../@types/Donasi';
import { Gap } from '../../../atoms';
import Props from './modalHistory.props';

const { Option } = Select;

const ModalAlokasiDonasi: React.FC<Props> = ({
  visible,
  onCancel,
  onFinish,
  loading,
  form,
  virtualAccounts
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">Penarikan Dana</h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="bank_code"
          label="Pilih Bank"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan bank'
            }
          ]}
        >
          <Select className="w-full" placeholder="Pilih Bank">
            {virtualAccounts?.map((va: VirtualAccountInterface) => (
              <Option key={va.code}>{va.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="account_number"
          label="Nomor Rekening"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nomor rekening'
            }
          ]}
        >
          <Input placeholder="Nomor Rekening" type="number" />
        </Form.Item>
        <Form.Item
          name="account_name"
          label="Nama"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nama'
            }
          ]}
        >
          <Input placeholder="Nama" type="text" />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Nominal"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nominal'
            }
          ]}
        >
          <Input placeholder="Nominal" type="number" />
        </Form.Item>

        <Form.Item className="text-center">
          <span className="text-xs italic">
            *Pastikan Bank, Nomor Rekening dan Nominal sesuai
          </span>
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
              Tarik Dana
            </Button>
            <Gap width={16} height={2} />
            <Button size="large" type="default" ghost onClick={onCancel}>
              Batal
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAlokasiDonasi;
