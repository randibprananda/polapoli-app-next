import { Button, Form, message, Modal } from 'antd';
import { DraggerProps } from 'antd/lib/upload';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { IcImageDefault } from '../../../../assets';
import { Gap } from '../../../atoms';
import { CardFotoCalonKemenangan } from '../../../moleculs';
import Props from './fotoCalon.props';

const FotoCalonComponent: React.FC<Props> = ({
  form,
  onUpdate,
  foto_calon,
  isDisable
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => setOpen(!open), [open]);

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    beforeUpload: file => {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isPNG) {
        message.error('Format tidak didukung! Masukan file .png atau .jpg', 3);
      }
      return isPNG;
    },
    maxCount: 1
  };

  return (
    <>
      <CardFotoCalonKemenangan
        foto_calon={foto_calon}
        onClickEdit={handleToggleModal}
        isDisable={isDisable}
      />
      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Foto Calon</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onUpdate(e, () => setOpen(false))}
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="foto_calon_web_kemenangan"
            label="Foto Calon"
            getValueFromEvent={({ file }) => file.originFileObj}
          >
            <Dragger {...draggerProps} height={200} className="bg-white">
              <p className="ant-upload-drag-icon">
                <Image
                  src={IcImageDefault}
                  width={50}
                  height={50}
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
              >
                Edit
              </Button>
              <Gap width={16} height={2} />
              <Button
                size="large"
                type="default"
                ghost
                onClick={handleToggleModal}
              >
                Batal
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FotoCalonComponent;
