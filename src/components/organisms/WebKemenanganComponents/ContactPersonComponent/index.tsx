import { Button, Form, Modal, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { Gap } from '../../../atoms';
import { CardContactPersonKemenangan } from '../../../moleculs';
import Props from './contactPerson.props';

const ContactPersonComponent: React.FC<Props> = ({
  form,
  onUpdate,
  data,
  isDisable = false
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    if (!open) {
      form.setFieldsValue({
        alamat: data?.alamat,
        telepon: data?.telepon,
        email: data?.email,
        whatsapp: data?.whatsapp
      });
    }
    setOpen(!open);
  }, [open]);

  return (
    <>
      <CardContactPersonKemenangan
        alamat={data?.alamat}
        telepon={data?.telepon}
        email={data?.email}
        whatsapp={data?.whatsapp}
        onClickEdit={handleToggleModal}
        isDisable={isDisable}
      />
      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Contact Person</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onUpdate(e, () => setOpen(false))}
          form={form}
          layout="vertical"
        >
          <Form.Item name="alamat" label="Alamat">
            <Input.TextArea placeholder="Alamat" rows={4} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                message: 'Masukkan email yang valid',
                type: 'email'
              }
            ]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item name="telepon" label="Telepon">
            <Input placeholder="Telepon" type="number" />
          </Form.Item>
          <Form.Item name="whatsapp" label="Whatsapp">
            <Input placeholder="Whatsapp" type="number" />
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

export default ContactPersonComponent;
