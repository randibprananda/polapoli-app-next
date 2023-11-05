import { Button, Form, Input, Modal } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../../assets';
import { checkBaseUrlImage, RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import Props from './modalAlokasi.props';

const ModalAlokasiDonasi: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  draggerProps,
  loading,
  form,
  isEdit,
  isDetail,
  onUpdate
}) => {
  const checkImageIsString = (image: any) => typeof image === 'string';

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">Alokasi Dana</h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="bukti_alokasi"
          label="Bukti Foto"
          getValueFromEvent={({ file }) => file.originFileObj}
          required={!isEdit}
          rules={[
            {
              required: !isEdit,
              message: 'Masukkan bukti foto'
            }
          ]}
        >
          <Dragger
            {...draggerProps}
            height={200}
            className="bg-white"
            disabled={isDetail}
          >
            <p className="ant-upload-drag-icon">
              <Image
                src={
                  checkImageIsString(form.getFieldValue('bukti_alokasi'))
                    ? form.getFieldValue('bukti_alokasi')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('bukti_alokasi')) &&
                  (isEdit || isDetail)
                    ? 120
                    : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('bukti_alokasi')) &&
                  (isEdit || isDetail)
                    ? 120
                    : 50
                }
                objectFit="contain"
                alt="icon dragger"
              />
            </p>
            <RenderIf isTrue={!isDetail}>
              <p className="ant-upload-text">
                Tarik foto atau,{' '}
                <span className=" text-primary font-semibold">Pilih File</span>
              </p>
            </RenderIf>
          </Dragger>
        </Form.Item>
        <Form.Item
          name="nominal"
          label="Nominal"
          extra={
            isDetail || isEdit
              ? ''
              : 'Pastikan nominal yang diinputkan benar, karena nominal tidak bisa diubah'
          }
          required
          rules={[
            {
              required: true,
              message: 'Masukkan nominal'
            }
          ]}
        >
          <Input
            disabled={isEdit || isDetail}
            placeholder="Nominal"
            type="number"
          />
        </Form.Item>
        <Form.Item
          name="keterangan"
          label="Keterangan"
          required
          rules={[
            {
              required: true,
              message: 'Masukkan keterangan'
            }
          ]}
        >
          <Input.TextArea
            readOnly={isDetail}
            placeholder="Keterangan"
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          {isDetail ? (
            <div className="flex justify-center">
              <Button size="large" type="default" ghost onClick={onCancel}>
                Tutup
              </Button>
            </div>
          ) : (
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
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAlokasiDonasi;
