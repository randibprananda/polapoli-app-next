import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { RenderIf } from '../../../utils';
import Props from './formDapil.props';

const { Option } = Select;

export const setDapil = (values: any) => {
  const dapil = values?.custom_dapil ? values?.custom_dapil : values.dapil;
  delete values?.custom_dapil;

  return dapil;
};

export const getDapil = (value: number | string) => ({
  dapil: +value > 10 ? 'Lainnya' : +value,
  custom_dapil: +value > 10 ? +value : ''
});

const FormDapil: React.FC<Props> = ({
  mounted,
  form,
  isActive,
  customLayout = {
    dapil: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    customDapil: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  allDisabled
}) => {
  const [dapil, setDapil] = useState<number | string>(1);

  useEffect(() => {
    if (form.getFieldValue('dapil') == 'Lainnya') {
      setDapil(form.getFieldValue('dapil'));
    } else {
      setDapil(1);
    }
  }, [mounted, form.getFieldValue('dapil')]);

  return (
    <Row gutter={[6, 24]}>
      <Col {...customLayout.dapil}>
        <Form.Item
          name="dapil"
          label="Dapil"
          required
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Pilih Dapil'
            }
          ]}
        >
          <Select
            disabled={allDisabled ? allDisabled : !isActive}
            className="w-full"
            placeholder="Dapil"
            optionFilterProp="children"
            onChange={e => setDapil(e)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number) => (
              <Option key={item}>{item}</Option>
            ))}
            <Option key="Lainnya">Lainnya</Option>
          </Select>
        </Form.Item>
      </Col>
      <RenderIf isTrue={isActive && dapil === 'Lainnya'}>
        <Col {...customLayout.customDapil}>
          <Form.Item
            name="custom_dapil"
            label="Dapil Lainnya"
            className="mb-0"
            required
            rules={[
              {
                required: true,
                message: 'Max 2 digit',
                pattern: /^\w{0,2}$/
              }
            ]}
          >
            <Input
              disabled={allDisabled}
              placeholder="Nomor Dapil"
              type="number"
              required
            />
          </Form.Item>
        </Col>
      </RenderIf>
    </Row>
  );
};

export default FormDapil;
