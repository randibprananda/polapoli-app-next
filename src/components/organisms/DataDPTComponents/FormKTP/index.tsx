import { Col, Form, Row } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../../assets';
import { checkImageIsString } from '../../../../utils';
import Props from './formKTP.props';

const FormKTP: React.FC<Props> = ({
  draggerProps,
  isEdit,
  form,
  isDetail = false,
  isPemilih
}) => {
  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="flex items-start justify-center p-3 mb-1 bg-grey3">
          <h2 className="text-base font-semibold">Foto / Scan KTP</h2>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="foto_ktp"
          getValueFromEvent={({ file }) => file.originFileObj}
          required
          rules={[
            {
              required: true,
              message: 'Masukkan KTP'
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
                  checkImageIsString(form.getFieldValue('foto_ktp'))
                    ? form.getFieldValue('foto_ktp')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('foto_ktp')) ? 120 : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('foto_ktp')) ? 120 : 50
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

export default FormKTP;
