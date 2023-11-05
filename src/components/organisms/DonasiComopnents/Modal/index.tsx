import { Button, DatePicker, Form, Input, Modal, Switch } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../../assets';
import { Gap } from '../../../atoms';
import Props from './modalDonasi.props';

const ModalDonasi: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  draggerProps,
  loading,
  form,
  isEdit,
  onUpdate,
  optionalState,
  setOptionalState
}) => {
  const checkImageIsString = (image: any) => typeof image === 'string';

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">
          {isEdit ? 'Edit' : 'Tambah'} Donasi
        </h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="donation_image"
          label="Foto Donasi"
          getValueFromEvent={({ file }) => file.originFileObj}
          required
          rules={[
            {
              required: true,
              message: 'Masukkan foto donasi'
            }
          ]}
        >
          <Dragger {...draggerProps} height={200} className="bg-white">
            <p className="ant-upload-drag-icon">
              <Image
                src={
                  checkImageIsString(form.getFieldValue('donation_image'))
                    ? form.getFieldValue('donation_image')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('donation_image')) &&
                  isEdit
                    ? 120
                    : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('donation_image')) &&
                  isEdit
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
          name="donation_title"
          label="Judul Donasi"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan judul donasi'
            }
          ]}
        >
          <Input placeholder="Judul Donasi" />
        </Form.Item>
        <Form.Item
          name="donation_description"
          label="Deskripsi"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan deskripsi'
            }
          ]}
        >
          <Input.TextArea placeholder="Deskripsi" rows={4} />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center justify-between mb-1">
            <p className="text-base font-semibold ">Target Donasi</p>{' '}
            <Switch
              checked={optionalState.withTarget}
              onChange={e => setOptionalState('withTarget', e)}
            />
          </div>
          <Form.Item
            name="target_amount"
            className="mb-0"
            rules={[
              {
                required: optionalState.withTarget,
                message: 'Masukkan target donasi'
              }
            ]}
          >
            <Input
              placeholder="Target Donasi"
              disabled={!optionalState.withTarget}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div className="flex items-center justify-between mb-1">
            <p className="text-base font-semibold ">Batas Akhir Donasi</p>{' '}
            <Switch
              checked={optionalState.withDateline}
              onChange={e => setOptionalState('withDateline', e)}
            />
          </div>
          <Form.Item
            name="batas_akhir"
            className="mb-0"
            rules={[
              {
                required: optionalState.withDateline,
                message: 'Masukkan batas akhir donasi'
              }
            ]}
          >
            <DatePicker
              placeholder="Batas Akhir Donasi"
              className="w-full"
              disabled={!optionalState.withDateline}
            />
          </Form.Item>
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

export default ModalDonasi;
