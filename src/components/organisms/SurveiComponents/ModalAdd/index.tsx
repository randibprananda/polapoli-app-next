import { Button, Col, Form, Modal, Row } from 'antd';

import FormPeriodeSurvei from '../FormPeriodeSurvei';
import FormWilayahSurvei from '../FormWilayahSurvei';
import { Gap } from '../../../atoms';
import Props from './modalAdd.props';
import React from 'react';

const ModalAddSurvei: React.FC<Props> = ({
  visible,
  onCancel,
  onFinish,
  loading,
  form,
  modalState,
  isEdit = true,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  setDynamicModalState,
  isDetail = false
}) => {
  const onReset = () => {};

  return (
    <Modal
      width={500}
      footer={false}
      visible={visible}
      onCancel={() => {
        onCancel();
        onReset();
      }}
    >
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">
          {isEdit ? 'Edit' : isDetail ? 'Detail' : 'Tambah'} Survei
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[24, 24]} className="pb-6 mb-6 border-b border-b-grey3">
          <Col xs={24}>
            <FormWilayahSurvei
              modalState={modalState}
              isEdit={isEdit}
              wilayah={wilayah}
              setWilayah={setWilayah}
              provinsiData={provinsiData}
              kotaData={kotaData}
              kecamatanData={kecamatanData}
              kelurahanData={kelurahanData}
              setDynamicModalState={setDynamicModalState}
              withTitle={false}
              customName="tingkat_survei"
              isDetail={isDetail}
            />
          </Col>
          <Col xs={24}>
            <FormPeriodeSurvei isDetail={isDetail} />
          </Col>
        </Row>
        {isDetail ? (
          <Form.Item>
            <div className="flex justify-center">
              <Button size="large" type="default" ghost onClick={onCancel}>
                Tutup
              </Button>
            </div>
          </Form.Item>
        ) : (
          <Form.Item>
            <div className="flex justify-center">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                {isEdit ? 'Edit' : 'Tambah'}
              </Button>
              <Gap width={16} height={2} />
              <Button size="large" type="default" ghost onClick={onCancel}>
                Batal
              </Button>
            </div>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalAddSurvei;
