import { Button, Form, Input, Upload } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { Camera } from 'react-iconly';
import { IcUserDefault } from '../../../../assets';
import { colors } from '../../../../theme';
import { Gap } from '../../../atoms';
import Props from './biodata.props';

const Biodata: React.FC<Props> = ({
  loading = false,
  avatar,
  form,
  uploadProps,
  onFinish
}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="bg-white rounded-xl py-5 px-6">
      <div className="border-b pb-2 border-b-grey3">
        <h2 className="font-bold text-xl">Biodata</h2>
      </div>
      <div>
        <div className="flex justify-center mt-11 mb-9">
          <div className="relative">
            <Image
              src={avatar ? avatar : IcUserDefault}
              width={150}
              height={150}
              objectFit="contain"
              loading="eager"
              alt="Image Profile"
              className="rounded-full"
            />
            <Upload {...uploadProps}>
              <Button
                type="primary"
                shape="circle"
                size="large"
                className="flex justify-center items-center absolute bottom-2 right-0"
              >
                <Camera set="bold" primaryColor={colors.white} />
              </Button>
            </Upload>
          </div>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={e => {
            onFinish(e);
            setIsEdit(false);
          }}
        >
          <Form.Item
            className=" mb-4"
            name="name"
            label="Nama"
            rules={[
              {
                required: true,
                message: 'Tidak boleh kosong!'
              },
              {
                pattern: new RegExp(/^.{1,20}$/),
                message: 'Nama melebihi 20 karakter'
              }
            ]}
          >
            <Input disabled={!isEdit} />
          </Form.Item>
          <Form.Item
            className=" mb-4"
            name="phonenumber"
            label="No HP"
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
          >
            <Input disabled={!isEdit} type="number" />
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
            <Gap height={32} width={10} />
            <Button
              size="large"
              type="primary"
              htmlType="button"
              onClick={() => setIsEdit(true)}
            >
              Ubah Profil
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Biodata;
