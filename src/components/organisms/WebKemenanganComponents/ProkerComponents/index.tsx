import { Button, Form, Modal, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import { CardMisiKemenangan, CardProkerKemenangan } from '../../../moleculs';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Delete, Plus } from 'react-iconly';
import { colors } from '../../../../theme';
import { Gap } from '../../../atoms';
import Props from './proker.props';

const ProgramKerjaComponent: React.FC<Props> = ({
  form,
  onUpdate,
  proker_paslons = null,
  isDisable
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    if (!open) {
      form.setFieldsValue({
        prokers: proker_paslons
          ? [...proker_paslons.map((item: any) => item.isi_proker)]
          : []
      });
    }
    setOpen(!open);
  }, [open]);

  return (
    <>
      <CardProkerKemenangan
        proker_paslons={proker_paslons}
        onClickEdit={handleToggleModal}
        isDisable={isDisable}
      />
      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Program Kerja</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onUpdate(e, () => setOpen(false))}
          form={form}
          layout="vertical"
        >
          <Form.List
            name="prokers"
            rules={[
              {
                validator: async (_, misis) => {
                  if (!misis || misis.length < 2) {
                    return Promise.reject(new Error('Minimal 2 program kerja'));
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
                    label={index === 0 ? 'Program Kerja' : ''}
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
                            message: 'Masukkan program kerja'
                          }
                        ]}
                        noStyle
                        className="m-0"
                      >
                        <Input
                          placeholder="Program Kerja"
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
                      <span className="ml-2">Tambah Program Kerja</span>
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

export default ProgramKerjaComponent;
