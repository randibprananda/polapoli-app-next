import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { RoleInterface } from '../../../../@types/User';
import { LIST_ROLE } from '../../../../constant/contract';
import { RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import Props from './modal.props';

const { Option } = Select;

const PM_KONSULTAN = LIST_ROLE.filter(item => item.id === 1 || item.id === 2);
const KONSULTAN = LIST_ROLE.filter(item => item.id === 2);

const ModalUser: React.FC<Props> = ({
  form,
  visible,
  onCancel,
  onFinish,
  loading,
  roleAvailable,
  isEdit = false
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit' : 'Tambah'} User
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="nama"
          label="Nama"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nama user'
            }
          ]}
        >
          <Input placeholder="Nama User" name="name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan email'
            }
          ]}
        >
          <Input placeholder="Email" name="email" type="email" />
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
              Simpan
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

export default ModalUser;
