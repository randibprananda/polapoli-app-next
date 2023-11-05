import { Button, Form, message, Modal } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { IcImageDefault } from '../../../../assets';
import { CardBackgroundKemenangan } from '../../../moleculs';
import { DraggerProps } from 'antd/lib/upload';
import Props from './background.props';
import { Gap } from '../../../atoms';

const Background: React.FC<Props> = ({
  backgroundSrc,
  form,
  onUpdate,
  isDisable = false
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => setOpen(!open), [open]);

  const checkImageIsString = (image: any) => typeof image === 'string';

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
      <CardBackgroundKemenangan
        backgroundSrc={backgroundSrc}
        onClickEdit={handleToggleModal}
        isDisable={isDisable}
      />

      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Background</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onUpdate(e, () => setOpen(false))}
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="background_web_kemenangan"
            label="Background"
            getValueFromEvent={({ file }) => file.originFileObj}
          >
            <Dragger {...draggerProps} height={200} className="bg-white">
              <p className="ant-upload-drag-icon">
                <Image
                  src={
                    checkImageIsString(
                      form.getFieldValue('background_web_kemenangan')
                    )
                      ? form.getFieldValue('background_web_kemenangan')
                      : IcImageDefault
                  }
                  width={
                    checkImageIsString(
                      form.getFieldValue('background_web_kemenangan')
                    )
                      ? 120
                      : 50
                  }
                  height={
                    checkImageIsString(
                      form.getFieldValue('background_web_kemenangan')
                    )
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

export default Background;
