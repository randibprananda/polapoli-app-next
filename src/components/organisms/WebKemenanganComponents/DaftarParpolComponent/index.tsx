import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { Gap } from '../../../atoms';
import { CardDaftarParpolKemenangan } from '../../../moleculs';
import Image from 'next/image';
import Dragger from 'antd/lib/upload/Dragger';
import { checkImageIsString } from '../../../../utils';
import Props from './daftarParpol.props';
import { IcImageDefault } from '../../../../assets';
import { ParpolInterface } from '../../../../@types/Kemenangan';

const DaftarParpolComponent: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  draggerProps,
  loading,
  form,
  isEdit,
  onUpdate,
  onOpenModal,
  data,
  columns,
  isDisable
}) => {
  return (
    <>
      <CardDaftarParpolKemenangan
        data={data}
        columns={columns}
        onClickEdit={onOpenModal}
        isDisable={isDisable}
      />

      <Modal footer={false} visible={visible} onCancel={onCancel}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">
            {isEdit ? 'Edit' : 'Tambah'} Partai Politik
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
            name="foto_parpol"
            label="Foto"
            getValueFromEvent={({ file }) => file.originFileObj}
            required={!isEdit}
            rules={[
              {
                required: !isEdit,
                message: 'Masukkan foto'
              }
            ]}
          >
            <Dragger {...draggerProps} height={200} className="bg-white">
              <p className="ant-upload-drag-icon">
                <Image
                  src={
                    checkImageIsString(form.getFieldValue('foto_parpol'))
                      ? form.getFieldValue('foto_parpol')
                      : IcImageDefault
                  }
                  width={
                    checkImageIsString(form.getFieldValue('foto_parpol'))
                      ? 120
                      : 50
                  }
                  height={
                    checkImageIsString(form.getFieldValue('foto_parpol'))
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
            name="nama_parpol"
            label="Nama Partai Politik"
            required
            rules={[
              {
                required: true,
                message: 'Masukkan Nama Partai Politik'
              }
            ]}
          >
            <Input placeholder="Nama Partai Politik" />
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
    </>
  );
};

export default DaftarParpolComponent;
