import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { METODE_GAJI } from '../../../../constant';
import { Gap } from '../../../atoms';
import Props from './modalAdd.props';

const { Option } = Select;
const ModalAdd: React.FC<Props> = ({
  isEdit,
  form,
  visible,
  onCancel,
  onCreate,
  onUpdate,
  loading,
  nameDisabled = false
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit Role' : 'Tambah Role'}
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Nama Role"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nama role'
            }
          ]}
        >
          <Input disabled={nameDisabled} placeholder="Nama Role" name="name" />
        </Form.Item>

        <Form.Item
          name="metode_gaji"
          label="Metode Gaji"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan metode gaji'
            }
          ]}
        >
          <Select placeholder="Pilih Metode Gaji">
            {METODE_GAJI.map((item: string) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="gaji"
          label="Nominal Gaji"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan gaji'
            }
          ]}
        >
          <Input placeholder="Gaji" type="number" name="gaji" />
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
              {isEdit ? 'Simpan' : 'Tambah'}
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

export default ModalAdd;
