import { Button, Col, Form, Modal, Row } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React, { useState } from 'react';
import { IcDocument } from '../../../../assets';
import { RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import { FormDapil, FormWilayah } from '../../../moleculs';
import Props from './modalImport.props';

const ModalImportTPS: React.FC<Props> = ({
  visible,
  onCancel,
  form,
  onDownloadTemplate,
  onUploadTemplate,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  draggerProps,
  description
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleDownloadTemplate = () => {
    const dapil = form.getFieldValue('dapil');
    if (dapil) {
      setIsValid(() => true);
      onDownloadTemplate();
    } else {
      setIsValid(() => false);
    }
  };

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">Import Data Jumlah TPS</h2>
      </div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onUploadTemplate}
      >
        <Row gutter={[6, 24]}>
          <Col xs={24}>
            <FormWilayah
              wilayah={wilayah}
              setWilayah={setWilayah}
              provinsiData={provinsiData}
              kotaData={kotaData}
              kecamatanData={kecamatanData}
              kelurahanData={kelurahanData}
              withKelurahan={false}
              description={description}
            />
          </Col>
          <Col xs={24}>
            <FormDapil
              form={form}
              mounted={visible}
              isActive={!!wilayah.provinsi}
            />
            <RenderIf isTrue={!isValid}>
              <span className="text-danger">
                Anda harus memilih dapil dahulu
              </span>
            </RenderIf>
          </Col>
          <Col xs={24}>
            <Button
              size="large"
              type="default"
              onClick={handleDownloadTemplate}
              disabled={
                !wilayah.provinsi || !wilayah.kota || !wilayah.kecamatan
              }
              block
            >
              Download Template Data Jumlah TPS
            </Button>
          </Col>
          <Col xs={24}>
            <p className="italic text-xs text-center w-3/4 mx-auto">
              Pastikan data yang anda isi lebih dari 3 baris
            </p>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="file_tps"
              getValueFromEvent={({ file }) => file.originFileObj}
              required
              rules={[
                {
                  required: true,
                  message: 'Masukkan file .xls'
                }
              ]}
            >
              <Dragger {...draggerProps} height={200} className="bg-white">
                <p className="ant-upload-drag-icon">
                  <Image
                    src={IcDocument}
                    width={50}
                    height={50}
                    objectFit="contain"
                    alt="icon dragger"
                  />
                </p>
                <p className="ant-upload-text">
                  Tarik filemu atau,{' '}
                  <span className=" text-primary font-semibold">
                    Pilih File
                  </span>
                </p>
              </Dragger>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <div className="flex justify-center">
              <Button size="large" type="primary" htmlType="submit">
                Import
              </Button>
              <Gap width={16} height={2} />
              <Button size="large" type="default" ghost onClick={onCancel}>
                Batal
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalImportTPS;
