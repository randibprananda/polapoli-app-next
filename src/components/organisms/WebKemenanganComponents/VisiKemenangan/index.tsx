import { Button, Form, Input, Modal } from 'antd';
import React, { useCallback, useState } from 'react';
import { Gap } from '../../../atoms';
import { CardVisiKemenangan } from '../../../moleculs';
import Props from './visi.props';

const VisiKemenangan: React.FC<Props> = ({
  form,
  onUpdate,
  visi,
  isDisable
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    if (!open) {
      form.setFieldsValue({
        visi
      });
    }

    setOpen(!open);
  }, [open]);

  return (
    <>
      <CardVisiKemenangan
        visi={visi}
        onClickEdit={handleToggleModal}
        isDisable={isDisable}
      />
      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Visi</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onUpdate(e, () => setOpen(false))}
          form={form}
          layout="vertical"
        >
          <Form.Item name="visi" label="Visi">
            <Input.TextArea rows={5} placeholder="Visi" />
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

export default VisiKemenangan;
