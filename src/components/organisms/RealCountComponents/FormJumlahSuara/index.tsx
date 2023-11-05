import { Row, Col, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { RenderIf } from '../../../../utils';
import Props from './formJumlahSuara.props';

const { Option } = Select;

const FormJumlahSuaraRealCount: React.FC<Props> = ({
  title = 'Jumlah Suara',
  type = 'input',
  data,
  suara_key = {
    suara_sah: 'suara_sah',
    suara_tidak_sah: 'suara_tidak_sah'
  },
  form,
  onSelect,
  isDetail = false
}) => {
  const [total, setTotal] = useState(0);

  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="bg-grey3 p-3 flex justify-center items-start mb-1">
          <h2 className="font-semibold text-base">{title}</h2>
        </div>
      </Col>
      <RenderIf isTrue={type === 'select'}>
        <Col xs={24}>
          <Form.Item
            label="Partai"
            name="partai_id"
            required
            className="mb-0"
            rules={[
              {
                required: true
              }
            ]}
          >
            {
              <Select
                placeholder="Pilih Partai"
                onChange={e => onSelect(e)}
                disabled={isDetail}
              >
                {data?.map((item, index) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            }
          </Form.Item>
        </Col>
      </RenderIf>
      <RenderIf isTrue={type === 'input'}>
        {data?.map((item, index) => (
          <Col xs={24} key={item.value}>
            <Form.Item
              label={item.label}
              name={`suara_sah_paslon[${index}]`}
              required
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Masukkan Jumlah Suara Sah'
                }
              ]}
            >
              <Input
                type="number"
                placeholder="Jumlah Suara Sah"
                value={total}
                readOnly={isDetail}
              />
            </Form.Item>
          </Col>
        ))}
      </RenderIf>
      <Col xs={12}>
        <Form.Item
          label="Total Suara Sah"
          name={suara_key.suara_sah}
          required
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan Total Suara Sah'
            }
          ]}
        >
          <Input
            type="number"
            placeholder="Total Suara Sah"
            value={total}
            readOnly={isDetail}
          />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label="Suara Tidak Sah"
          name={suara_key.suara_tidak_sah}
          required
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan Suara Tidak Sah'
            }
          ]}
        >
          <Input type="number" placeholder="Jumlah Suara" readOnly={isDetail} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormJumlahSuaraRealCount;
