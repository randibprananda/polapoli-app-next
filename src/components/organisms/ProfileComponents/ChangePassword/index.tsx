import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Gap } from '../../../atoms';
import Props from './changePassword.props';

const ChangePassword: React.FC<Props> = ({ form, onFinish, loading }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="bg-white rounded-xl py-5 px-6">
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className="font-bold text-xl">Ubah Kata Sandi</h2>
      </div>
      <div>
        <Form
          form={form}
          onFinish={e => {
            onFinish(e);
            setIsEdit(false);
          }}
          layout="vertical"
        >
          <Form.Item
            name="current_password"
            label="Kata Sandi Lama"
            rules={[
              {
                required: true,
                message: 'Masukkan Kata Sandi Lama'
              }
            ]}
          >
            <Input.Password type="password" disabled={!isEdit} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Kata Sandi Baru"
            rules={[
              {
                required: true,
                message: 'Masukkan Kata sandi minimal 8 karakter!',
                pattern: new RegExp(/.{8,}$/)
              }
            ]}
          >
            <Input.Password type="password" disabled={!isEdit} />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label="Konfirmasi Kata Sandi Baru"
            rules={[
              {
                required: true,
                message: 'Masukkan Konfirmasi Kata Sandi Baru'
              }
            ]}
          >
            <Input.Password type="password" disabled={!isEdit} />
          </Form.Item>
          <Gap height={16} width={10} />
          {isEdit && (
            <div className="flex justify-center">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Simpan
              </Button>
              <Gap width={16} height={10} />
              <Button
                size="large"
                type="default"
                htmlType="button"
                onClick={() => setIsEdit(false)}
              >
                Batal
              </Button>
            </div>
          )}
        </Form>
        {!isEdit && (
          <div className="flex justify-center">
            <Button
              size="large"
              type="primary"
              htmlType="button"
              onClick={() => setIsEdit(true)}
            >
              Ubah Kata Sandi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
