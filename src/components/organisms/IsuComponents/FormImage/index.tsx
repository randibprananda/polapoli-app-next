import { Row, Col, Form, Upload, Button } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React from 'react';
import { Edit } from 'react-iconly';
import { IcImageDefault } from '../../../../assets';
import { colors } from '../../../../theme';
import Image from 'next/image';
import Props from './formImage.props';

const FormImageIsu: React.FC<Props> = ({ form, isEdit, draggerProps }) => {
  return (
    <Row gutter={[6, 24]}>
      <Col xs={24}>
        <div className="bg-grey3 p-3 flex justify-center items-start mb-1">
          <p className="font-semibold text-base">Foto</p>
        </div>
      </Col>

      <Col xs={24}>
        <Form.Item
          required
          name="foto_isu"
          getValueFromEvent={({ file }) => file.originFileObj}
        >
          {form.getFieldValue('foto_isu') || isEdit ? (
            <>
              <Image
                src={form.getFieldValue('foto_isu')}
                width={450}
                height={450}
                objectFit="contain"
                alt="icon dragger"
              />
              {isEdit && (
                <div className="text-center">
                  <Upload {...draggerProps}>
                    <Button
                      type="primary"
                      size="middle"
                      className="bg-success hover:bg-success border-success hover:border-success ml-2"
                      onClick={() => {}}
                    >
                      <p className="flex justify-between items-center">
                        <Edit
                          set="light"
                          size={16}
                          primaryColor={colors.white}
                        />{' '}
                        <span className="ml-2">Ganti Foto</span>
                      </p>
                    </Button>
                  </Upload>
                </div>
              )}
              <div className="text-center"></div>
            </>
          ) : (
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
                <span className=" text-primary font-semibold">Pilih File</span>
              </p>
            </Dragger>
          )}
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormImageIsu;
