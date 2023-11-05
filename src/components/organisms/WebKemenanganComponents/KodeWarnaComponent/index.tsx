import React, { useCallback, useState } from 'react';
import { Gap } from '../../../atoms';
import { CardKodeWarnaKemenangan } from '../../../moleculs';
import { Modal, Form, Button, Input } from 'antd';
import Props from './kodeWarna.props';
import { ChromePicker } from 'react-color';

const KodeWarnaComponent: React.FC<Props> = ({
  form,
  onUpdate,
  tema_warna,
  isDisable
}) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(tema_warna);
  const [showColorPicker, setShowColorPicker] = useState(true);

  const handleToggleModal = useCallback(() => setOpen(!open), [open]);

  return (
    <>
      <CardKodeWarnaKemenangan
        tema_warna={tema_warna}
        onClickEdit={handleToggleModal}
        isDisable={isDisable}
      />
      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Tema Warna</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={() =>
            onUpdate(
              {
                tema_warna: color
              },
              () => setOpen(false)
            )
          }
          form={form}
          layout="vertical"
        >
          <Form.Item label="Tema Warna">
            <div className="relative">
              <button
                type="button"
                className="flex flex-row items-center bg-grey3 p-1 rounded"
                onClick={() => {
                  setShowColorPicker(!showColorPicker);
                }}
              >
                <div
                  className=" w-8 h-8 rounded"
                  style={{
                    background: color
                  }}
                ></div>
                <div className="ml-3">
                  <p className="font-semibold text-base">{color}</p>
                </div>
              </button>
              {showColorPicker && (
                <ChromePicker
                  className="absolute top-0 left-36 z-40"
                  color={color}
                  onChange={(updateColor: any) => {
                    setColor(updateColor.hex);
                  }}
                />
              )}
            </div>
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

export default KodeWarnaComponent;
