import { Modal, Form, Input, Button } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../../assets';
import { Gap } from '../../../atoms';
import Props from './modal.props';

const ModalFeed: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  draggerProps,
  loading,
  form,
  isEdit,
  onUpdate
}) => {
  const checkImageIsString = (image: any) => typeof image === 'string';

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit' : 'Tambah'} Feed
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        layout="vertical"
      >
        <Form.Item
          name="judul_feed"
          label="Judul Feed/Broadcast"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan Judul'
            }
          ]}
        >
          <Input placeholder="Judul*" name="judul" />
        </Form.Item>
        <Form.Item
          name="isi"
          label="Isi Broadcast"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan isi'
            }
          ]}
        >
          <Input.TextArea placeholder="Isi Konten*" name="konten" rows={5} />
        </Form.Item>
        <Form.Item
          name="foto_feed"
          label="Foto Feed"
          required
          getValueFromEvent={({ file }) => file.originFileObj}
          rules={[
            {
              required: true,
              message: 'Masukkan foto feed'
            }
          ]}
        >
          <Dragger {...draggerProps} height={200} className="bg-white">
            <p className="ant-upload-drag-icon">
              {/* <InboxOutlined /> */}
              <Image
                src={
                  checkImageIsString(form.getFieldValue('foto_feed'))
                    ? form.getFieldValue('foto_feed')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('foto_feed')) && isEdit
                    ? 120
                    : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('foto_feed')) && isEdit
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

export default ModalFeed;
