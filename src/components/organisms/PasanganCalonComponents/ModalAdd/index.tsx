import { Button, Form, Input, Modal, Select, Switch, Upload } from 'antd';
import { IcImageDefault, IcUserDefault } from '../../../../assets';
import React, { useState } from 'react';
import { RenderIf, checkImageIsString } from '../../../../utils';

import { Camera } from 'react-iconly';
import Dragger from 'antd/lib/upload/Dragger';
import { Gap } from '../../../atoms';
import Image from 'next/image';
import { JENIS_PENCALONAN_NON_LEGISLATIF } from '../../../../constant/index';
import { JenisPencalonanInterface } from '../../../../@types/DataMaster';
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
  isLegislatif
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b-grey3 pb-2 mb-6 border-b">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit' : 'Tambah'} Pasangan Calon
        </h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="paslon_profile_photo"
          getValueFromEvent={({ file }) => file.originFileObj}
          required
          rules={[
            {
              required: true,
              message: 'Masukkan foto paslon'
            },
            {
              validator: (rule, value) => {
                if (value.size > 2 * 1024 * 1024) {
                  return Promise.reject(
                    'Foto paslon tidak boleh lebih dari 2MB'
                  );
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Dragger {...draggerProps} height={200} className="bg-white">
            <p className="ant-upload-drag-icon">
              <Image
                src={
                  checkImageIsString(form.getFieldValue('paslon_profile_photo'))
                    ? form.getFieldValue('paslon_profile_photo')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(
                    form.getFieldValue('paslon_profile_photo')
                  ) && isEdit
                    ? 120
                    : 50
                }
                height={
                  checkImageIsString(
                    form.getFieldValue('paslon_profile_photo')
                  ) && isEdit
                    ? 120
                    : 50
                }
                objectFit="contain"
                alt="icon dragger"
              />
            </p>
            <p className="ant-upload-text">
              Tarik foto atau,{' '}
              <span className="text-primary font-semibold">Pilih File</span>
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
            {JENIS_PENCALONAN_NON_LEGISLATIF.map((item: string) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
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
          name="nomor_urut"
          label="No Urut"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nomor urut'
            },
            {
              validator: (rule, value) => {
                if (value < 1) {
                  return Promise.reject('Nomor urut harus lebih besar dari 0');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input placeholder="No Urut*" name="urut" type="number" />
        </Form.Item>
        <Form.Item
          name="nama_paslon"
          label="Nama Paslon"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nama paslon'
            },
            {
              validator: (rule, value) => {
                if (value.length > 50) {
                  return Promise.reject(
                    'Nama paslon tidak boleh lebih dari 50 karakter'
                  );
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input placeholder="Nama Paslon" />
        </Form.Item>
        <Form.Item
          name="nama_wakil_paslon"
          label="Nama Wakil Paslon"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nama wakil paslon'
            },
            {
              validator: (rule, value) => {
                if (value.length > 50) {
                  return Promise.reject(
                    'Nama wakil paslon tidak boleh lebih dari 50 karakter'
                  );
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input placeholder="Nama Wakil Paslon" />
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
