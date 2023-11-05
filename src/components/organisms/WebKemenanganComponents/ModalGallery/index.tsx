import { Button, Form, Input, Modal } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../../assets';
import { Gap } from '../../../atoms';
import Props from './modalGallery.props';

const ModalGallery: React.FC<Props> = ({
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
          {isEdit ? 'Edit' : 'Tambah'} Galeri
        </h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={
          isEdit ? e => onUpdate(e, onCancel) : e => onCreate(e, onCancel)
        }
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="foto_galeri_paslon"
          label="Foto"
          getValueFromEvent={({ file }) => file.originFileObj}
          required
          rules={[
            {
              required: true,
              message: 'Masukkan foto'
            }
          ]}
        >
          <Dragger {...draggerProps} height={200} className="bg-white">
            <p className="ant-upload-drag-icon">
              <Image
                src={
                  checkImageIsString(form.getFieldValue('foto_galeri_paslon'))
                    ? form.getFieldValue('foto_galeri_paslon')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('foto_galeri_paslon'))
                    ? 120
                    : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('foto_galeri_paslon'))
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
          name="keterangan"
          label="Keterangan"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan Keterangan'
            }
          ]}
        >
          <Input.TextArea rows={4} placeholder="Keterangan" />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
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

export default ModalGallery;
