import { Checkbox, Col, Form, Input, Radio, Row, Space } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../assets';
import { OBJ_TIPE_SOAL_JAWABAN } from '../../../constant';
import { RenderIf } from '../../../utils';
import Props from './soalSurveiItem.props';

const SoalSurveiItem: React.FC<Props> = ({
  isRequired,
  label = 'Pertanyaan',
  type = 'TEXT',
  opsi = ['opsi 1', 'opsi 2', 'opsi 3'],
  field_id,
  draggerProps,
  isDetail = false,
  form,
  rules = {}
}) => {
  const { text, pilihanGanda, checklist, gambar } = OBJ_TIPE_SOAL_JAWABAN;
  const formProps = {
    name: `field_${field_id}`,
    label: label,
    required: isRequired,
    className: 'mb-0',
    rules: [
      {
        required: isRequired,
        message: 'Tidak Boleh Kosong'
      },
      rules
    ]
  };
  return (
    <section className="rounded-xl md:py-9 md:px-8 p-5 bg-white">
      <Row>
        <Col xs={24}>
          <RenderIf isTrue={type === text}>
            <Form.Item {...formProps}>
              <Input disabled={isDetail} type="text" />
            </Form.Item>
          </RenderIf>
          <RenderIf isTrue={type === 'NUMBER'}>
            <Form.Item {...formProps}>
              <Input disabled={isDetail} type="number" min={0} />
            </Form.Item>
          </RenderIf>
          <RenderIf isTrue={type === checklist}>
            <Form.Item {...formProps}>
              <Checkbox.Group>
                <Row>
                  {opsi.map((item: string, index: number) => (
                    <Col span={24} key={index}>
                      <Checkbox value={item} className="mb-3 capitalize">
                        {item}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </RenderIf>
          <RenderIf isTrue={type === gambar}>
            <RenderIf isTrue={isDetail}>
              <Form.Item
                {...formProps}
                getValueFromEvent={({ file }) => file.originFileObj}
              >
                <Image
                  src={
                    form.getFieldValue(`field_${field_id}`) || IcImageDefault
                  }
                  width={400}
                  height={400}
                  objectFit="contain"
                  alt="icon dragger"
                />
              </Form.Item>
            </RenderIf>

            <RenderIf isTrue={!isDetail}>
              <Form.Item
                {...formProps}
                getValueFromEvent={({ file }) => {
                  file.thumbUrl;
                  console.log('file gambar', file);
                }}
              >
                <Dragger {...draggerProps} height={200} className="bg-white">
                  <p className="ant-upload-drag-icon">
                    <Image
                      src={IcImageDefault}
                      width={50}
                      height={50}
                      objectFit="contain"
                      alt="icon dragger"
                    />
                  </p>
                  <p className="ant-upload-text">
                    Tarik foto atau,{' '}
                    <span className=" text-primary font-semibold">
                      Pilih File
                    </span>
                  </p>
                </Dragger>
              </Form.Item>
            </RenderIf>
          </RenderIf>
          <RenderIf isTrue={type === pilihanGanda}>
            <Form.Item {...formProps}>
              <Radio.Group>
                <Space direction="vertical">
                  {opsi.map((item: string, index: number) => (
                    <Radio key={index} value={item} className="capitalize">
                      {item}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          </RenderIf>
        </Col>
      </Row>
    </section>
  );
};

export default SoalSurveiItem;
