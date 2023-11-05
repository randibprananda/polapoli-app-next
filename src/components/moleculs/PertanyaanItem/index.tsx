import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Switch } from 'antd';
import { Delete, Plus } from 'react-iconly';
import { colors } from '../../../theme';
import Props from './pertanyaanItem.props';
import { RenderIf } from '../../../utils';
import { TIPE_SOAL_JAWABAN } from '../../../constant';

const { Option } = Select;

const PertanyaanItem: React.FC<Props> = ({
  index,
  onDelete,
  onChange,
  initJenisJawaban = 'TEXT'
}) => {
  const [jenisJawaban, setJenisJawaban] = useState(initJenisJawaban);

  const handleSelectChange = (value: string) => {
    setJenisJawaban(value);
    onChange(index, value);
  };

  return (
    <section className="bg-white rounded-xl p-4 md:py-9 md:px-8 mb-6">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={17}>
          <Form.Item
            name={`label_inputan_${index}`}
            label="Pertanyaan"
            required
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Tidak Boleh Kosong'
              }
            ]}
          >
            <Input placeholder="Pertanyaan ?" />
          </Form.Item>
        </Col>
        <Col xs={24} md={7}>
          <Form.Item
            name={`tipe_${index}`}
            label="Jenis Jawaban"
            className="mb-0"
            required
            rules={[
              {
                required: true,
                message: 'Tidak Boleh Kosong'
              }
            ]}
          >
            <Select defaultValue="TEXT" onChange={handleSelectChange}>
              {TIPE_SOAL_JAWABAN.map((item: { key: string; value: string }) => (
                <Option key={item.key}>{item.value}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <RenderIf
          isTrue={
            jenisJawaban === 'PILIHAN GANDA' || jenisJawaban === 'CHECKLIST'
          }
        >
          <Col xs={24}>
            <Form.List
              name={`pilihan_${index}`}
              rules={[
                {
                  validator: async (_, pilihan) => {
                    if (!pilihan || pilihan.length < 2) {
                      return Promise.reject(
                        new Error('Minimal 2 opsi jawaban')
                      );
                    }
                  }
                }
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, _) => (
                    <Form.Item
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
                              message: 'Masukkan Opsi'
                            }
                          ]}
                          noStyle
                          className="m-0"
                        >
                          <Input placeholder="Opsi Jawaban" />
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
                        <Plus
                          set="bold"
                          size={16}
                          primaryColor={colors.black}
                        />{' '}
                        <span className="ml-2">Tambah Opsi Jawaban</span>
                      </p>
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </RenderIf>
        <Col xs={24} className="border-t border-t-grey3 pt-6">
          <div className="flex justify-end">
            <button type="button" onClick={() => onDelete(index)}>
              <Delete set="bold" size={24} primaryColor={colors.danger} />
            </button>
            <Form.Item className=" border-l-2 ml-8 pl-8 border-l-grey3 mb-0">
              <div className="flex justify-between items-center">
                <p className="font-medium mr-3">Wajib diisi</p>{' '}
                <Form.Item
                  name={`required_${index}`}
                  valuePropName="checked"
                  noStyle
                >
                  <Switch defaultChecked={false} />
                </Form.Item>
              </div>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default PertanyaanItem;
