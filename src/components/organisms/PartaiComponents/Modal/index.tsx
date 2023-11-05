import { Button, Form, Input, Modal, Select, Switch, Upload } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React, { useState } from 'react';
import { IcImageDefault, IcUserDefault } from '../../../../assets';
import { checkImageIsString, RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import Props from './modal.props';

const { Option } = Select;

const ModalAdd: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  draggerProps,
  loading,
  form,
  isEdit,
  onUpdate
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit' : 'Tambah'} Partai
        </h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="logo"
          label="Logo Partai"
          getValueFromEvent={({ file }) => file.originFileObj}
          required
          rules={[
            {
              required: true,
              message: 'Masukkan logo partai'
            }
          ]}
        >
          <Dragger {...draggerProps} height={200} className="bg-white">
            <p className="ant-upload-drag-icon">
              <Image
                src={
                  checkImageIsString(form.getFieldValue('logo'))
                    ? form.getFieldValue('logo')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('logo')) && isEdit
                    ? 120
                    : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('logo')) && isEdit
                    ? 120
                    : 50
                }
                objectFit="contain"
                alt="icon dragger"
              />
            </p>
            <p className="ant-upload-text">
              Tarik foto atau,{' '}
              <span className=" text-primary font-semibold">Pilih File</span>
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item
          name="nama_partai"
          label="Nama Partai"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nama partai'
            }
          ]}
        >
          <Input placeholder="Nama Partai" />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between items-center">
            <p className="font-medium">Jadikan partai yang diusung</p>{' '}
            <Form.Item name="status" valuePropName="checked" noStyle>
              <Switch defaultChecked={false} />
            </Form.Item>
          </div>
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
