import { Col, Form, Row } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../../assets';
import { checkImageIsString } from '../../../../utils';
import Props from './formBukti.props';

const FormBuktiQuickCount: React.FC<Props> = ({
  draggerProps,
  form,
  isEdit,
  isDetail = false
}) => {
  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="bg-grey3 p-3 flex justify-center items-start mb-1">
          <h2 className="font-semibold text-base">Bukti</h2>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="bukti"
          getValueFromEvent={({ file }) => file.originFileObj}
          required
          rules={[
            {
              required: true,
              message: 'Masukkan Bukti'
            }
          ]}
        >
          <Dragger
            {...draggerProps}
            height={200}
            className="bg-white"
            disabled={isDetail}
          >
            <p className="ant-upload-drag-icon">
              <Image
                src={
                  checkImageIsString(form.getFieldValue('bukti'))
                    ? form.getFieldValue('bukti')
                    : IcImageDefault
                }
                width={
                  checkImageIsString(form.getFieldValue('bukti')) && isEdit
                    ? 120
                    : 50
                }
                height={
                  checkImageIsString(form.getFieldValue('bukti')) && isEdit
                    ? 120
                    : 50
                }
                objectFit="contain"
                alt="icon dragger"
              />
            </p>
            <p className="ant-upload-text">
              Tarik foto atau,{' '}
              <span className=" text-primary font-semibold">Pilih File</span>
            </p>
          </Dragger>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormBuktiQuickCount;
