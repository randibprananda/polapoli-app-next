import { Button, Form, Input, Modal, Select, Switch, Upload } from 'antd';
import { IcImageDefault, IcUserDefault } from '../../../../assets';
import React, { useState } from 'react';
import { RenderIf, checkImageIsString } from '../../../../utils';

import Dragger from 'antd/lib/upload/Dragger';
import { Gap } from '../../../atoms';
import Image from 'next/image';
import { JENIS_PENCALONAN_LEGISLATIF } from '../../../../constant/index';
import { PartaiInterface } from '../../../../@types/Partai';
import Props from './modalAdd.props';
import { colors } from '../../../../theme';

const { Option } = Select;

const ModalAdd: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  draggerProps,
  loading,
  form,
  isEdit,
  onUpdate,
  jenisPencalonan,
  setJenisPencalonan,
  partaiData
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">
          {isEdit ? 'Edit' : 'Tambah'} Calon Anggota
        </h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="foto"
          getValueFromEvent={({ file }) => file.originFileObj}
          required
          rules={[
            {
              required: true,
              message: 'Masukkan foto paslon'
            }
          ]}
        >
          <Dragger {...draggerProps} height={200} className="bg-white">
            <p className="ant-upload-drag-icon">
              <Image
                src={
                  checkImageIsString(form.getFieldValue('foto'))
                    ? form.getFieldValue('foto')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('foto')) && isEdit
                    ? 120
                    : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('foto')) && isEdit
                    ? 120
                    : 50
                }
                objectFit="contain"
                alt="icon dragger"
              />
            </p>
            <p className="ant-upload-text">
              Tarik foto atau,{' '}
              <span className="font-semibold text-primary">Pilih File</span>
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item
          name="jenis_pencalonan"
          label="Jenis Pencalonan"
          required
          rules={[
            {
              required: true,
              message: 'Pilih jenis pencalonan'
            }
          ]}
        >
          <Select
            className="w-full"
            placeholder="Jenis Pencalonan"
            optionFilterProp="children"
            onChange={e => setJenisPencalonan(e)}
          >
            {JENIS_PENCALONAN_LEGISLATIF.map((item: string) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <RenderIf isTrue={!!partaiData}>
          <Form.Item
            name="id_partai"
            label="Partai"
            required
            rules={[
              {
                required: true,
                message: 'Pilih Partai'
              }
            ]}
          >
            <Select
              className="w-full"
              placeholder="Partai"
              optionFilterProp="children"
            >
              {partaiData?.map((item: PartaiInterface) => (
                <Option key={item.id} value={item?.id}>
                  {item.nama_partai}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </RenderIf>
        <RenderIf isTrue={jenisPencalonan === 'Lainnya'}>
          <Form.Item
            name="custom_jenis_pencalonan"
            label="Nama Pencalonan"
            required
            rules={[
              {
                required: true,
                message: 'Masukkan nama pencalonan'
              }
            ]}
          >
            <Input placeholder="Cth. Calon Bupati dan Wakil Bupati" required />
          </Form.Item>
        </RenderIf>
        <Form.Item
          name="no_urut"
          label="No Urut"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nomor urut'
            }
          ]}
        >
          <Input placeholder="No Urut*" name="urut" type="number" />
        </Form.Item>
        <Form.Item
          name="nama_calon"
          label="Nama Calon Anggota"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nama calon anggota'
            }
          ]}
        >
          <Input placeholder="Nama Calon Anggota" />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center justify-between">
            <p className="font-medium">Jadikan calon yang diusung</p>{' '}
            <Form.Item name="is_usung" valuePropName="checked" noStyle>
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
