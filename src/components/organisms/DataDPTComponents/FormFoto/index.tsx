import { Col, Form, Row } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../../assets';
import Props from './formFoto.props';

const FormFoto: React.FC<Props> = ({
  draggerProps,
  form,
  isEdit,
  isDetail = false,
  isPemilih
}) => {
  const checkImageIsString = (image: any) => typeof image === 'string';
  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="flex items-start justify-center p-3 mb-1 bg-grey3">
          <h2 className="text-base font-semibold">Foto</h2>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="foto"
          getValueFromEvent={({ file }) => file.originFileObj}
          required
          rules={[
            {
              required: true,
              message: 'Masukkan foto'
            }
          ]}
        >
          <Dragger
            {...draggerProps}
            height={200}
            className="bg-white"
            disabled={isDetail}
            // disabled={!isPemilih}
          >
            <p className="ant-upload-drag-icon">
              <Image
                src={
                  checkImageIsString(form.getFieldValue('foto'))
                    ? form.getFieldValue('foto')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('foto')) ? 120 : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('foto')) ? 120 : 50
                }
                objectFit="contain"
                alt="icon dragger"
              />
            </p>
            <p className="ant-upload-text" hidden={isDetail}>
              Tarik foto atau,{' '}
              <span className="font-semibold text-primary">Pilih File</span>
            </p>
          </Dragger>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormFoto;
