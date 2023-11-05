import { Form, Select } from 'antd';
import React from 'react';

const { Option } = Select;

export type FilterProps = {
  label?: string;
  value: any;
  onChange: (val: any) => void;
  data: { value: string | number; label: string }[];
};

const Filter: React.FC<FilterProps> = ({
  label = 'Filter',
  value,
  onChange,
  data
}) => {
  return (
    <Form layout="horizontal">
      <Form.Item label={label} className="mb-0">
        <Select
          value={value}
          onChange={onChange}
          style={{
            minWidth: 200
          }}
        >
          {data.map(item => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default Filter;
