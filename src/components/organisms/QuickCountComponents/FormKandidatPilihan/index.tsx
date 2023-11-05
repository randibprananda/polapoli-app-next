import { Col, Form, Radio, Row, Space } from 'antd';
import React from 'react';

type Props = {
  title?: string;
  data: { value: number; label: string }[];
  name?: string;
  onSelect?: any;
  isDetail?: boolean;
};
const FormKandidatPilihan: React.FC<Props> = ({
  title = 'Kandidat Calon',
  data,
  name = 'kandidat_pilihan_id',
  onSelect,
  isDetail = false
}) => {
  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="bg-grey3 flex items-start justify-center p-3 mb-1">
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          className="mb-0"
          name={name}
          rules={[{ required: true, message: 'Pilih salah satu kandidat' }]}
        >
          <Radio.Group
            onChange={onSelect ? e => onSelect(e.target.value) : undefined}
          >
            <Space direction="vertical">
              {data?.map((kandidat: any) => (
                <Radio
                  key={kandidat.value}
                  value={kandidat.value}
                  disabled={isDetail}
                >
                  {kandidat?.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormKandidatPilihan;
