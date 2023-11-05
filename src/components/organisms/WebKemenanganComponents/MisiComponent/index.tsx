import { Button, Form, Modal, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { CardMisiKemenangan } from '../../../moleculs';
import Props from './misi.props';
import { Delete, Plus } from 'react-iconly';
import { colors } from '../../../../theme';
import { Gap } from '../../../atoms';

const MisiComponent: React.FC<Props> = ({
  form,
  onUpdate,
  misi_paslons = null,
  isDisable
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    if (!open) {
      form.setFieldsValue({
        misi: misi_paslons
          ? [...misi_paslons.map((item: any) => item.misi)]
          : []
      });
    }
    setOpen(!open);
  }, [open]);

  return (
    <>
      <CardMisiKemenangan
        misi_paslons={misi_paslons}
        onClickEdit={handleToggleModal}
        isDisable={isDisable}
      />
      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Misi</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onUpdate(e, () => setOpen(false))}
          form={form}
          layout="vertical"
        >
          <Form.List
            name="misi"
            rules={[
              {
                validator: async (_, misi) => {
                  if (!misi || misi.length < 2) {
                    return Promise.reject(new Error('Minimal 2 misi'));
                  }
                }
              }
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    // {...formItemLayout}
                    label={index === 0 ? 'Misi' : ''}
                    required={false}
                    key={field.key}
                    className="m-0 mb-4 w-full"
                  >
                    <div className="flex justify-between items-center">
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Masukkan misi'
                          }
                        ]}
                        noStyle
                        className="m-0"
                      >
                        <Input
                          placeholder="Misi"
                          // className='w-11/12'
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <button
                          className="ml-7"
                          onClick={() => remove(field.name)}
                        >
                          <Delete
                            set="bold"
                            primaryColor={colors.danger}
                            size={24}
                          />
                        </button>
                      ) : null}
                    </div>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    size="large"
                    className="bg-grey3 border-primary hover:text-black focus:text-black opacity-100 hover:opacity-80"
                  >
                    <p className="flex justify-center items-center">
                      <Plus set="bold" size={16} primaryColor={colors.black} />{' '}
                      <span className="ml-2">Tambah Misi</span>
                    </p>
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <div className="flex justify-center">
              <Button size="large" type="primary" htmlType="submit">
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

export default MisiComponent;
