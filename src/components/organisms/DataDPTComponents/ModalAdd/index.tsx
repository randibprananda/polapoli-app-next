import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import FormBiodataPemilih from '../FormBiodataPemilih';
import FormFoto from '../FormFoto';
import FormKontakPemilih from '../FormKontakPemilih';
import FormKTP from '../FormKTP';
import FormWilayahDPT from '../FormWilayahPemilih';
import Props from './modalAdd.props';

const ModalAdd: React.FC<Props> = ({
  visible,
  isEdit,
  form,
  onCancel,
  onCreate,
  onUpdate,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  loading,
  isPemilih = false,
  draggerPropsFoto,
  draggerPropsKTP,
  isDetail = true,
  onTogglePemilih,
  withButton = true,
  onSearchNIK,
  dptData,
  setNIK
}) => {
  return (
    <Modal
      width={1200}
      footer={false}
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
    >
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">
          {isEdit
            ? 'Edit Data DPT'
            : isDetail && isPemilih
            ? 'Detail Data Pemilih/Pendukung'
            : isDetail && !isPemilih
            ? 'Detail Data DPT'
            : isPemilih
            ? 'Tambah Data Pemilih/Pendukung'
            : 'Tambah Data DPT'}
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        layout="vertical"
      >
        <Row gutter={24} className="pb-6 mb-6 border-b border-b-grey3">
          <Col xs={24} md={12}>
            <FormBiodataPemilih
              isDetail={isDetail}
              isPemilih={isPemilih}
              dptData={dptData}
              setNIK={setNIK}
              onSearchNIK={onSearchNIK}
            />
          </Col>
          <Col xs={24} md={12}>
            <FormWilayahDPT
              wilayah={wilayah}
              setWilayah={setWilayah}
              provinsiData={provinsiData}
              kotaData={kotaData}
              kecamatanData={kecamatanData}
              kelurahanData={kelurahanData}
              isPemilih={isPemilih}
              mounted={visible}
              form={form}
              isDetail={isDetail}
            />
            <Gap height={24} width={10} />
            <RenderIf isTrue={isPemilih}>
              <FormKontakPemilih
                isDetail={isDetail && isPemilih}
                isPemilih={isPemilih}
              />
              <FormFoto
                loading={loading}
                draggerProps={draggerPropsFoto}
                form={form}
                isEdit={isEdit}
                isDetail={isDetail && isPemilih}
                isPemilih={isPemilih}
              />
              <FormKTP
                loading={loading}
                draggerProps={draggerPropsKTP}
                form={form}
                isEdit={isEdit}
                isDetail={isDetail && isPemilih}
                isPemilih={isPemilih}
              />
            </RenderIf>
          </Col>
        </Row>
        <RenderIf isTrue={withButton}>
          <Form.Item>
            <div
              className={`flex ${
                isDetail && !isPemilih ? 'justify-between' : 'justify-center'
              }`}
            >
              {isDetail && !isPemilih ? (
                <>
                  <Button
                    size="large"
                    type="default"
                    danger={isPemilih}
                    loading={loading}
                    onClick={onTogglePemilih}
                  >
                    {isPemilih
                      ? 'Hapus Sebagai Pendukung/Pemilih'
                      : 'Jadikan Sebagai Pendukung/Pemilih'}
                  </Button>
                  <Gap width={16} height={2} />
                  <Button size="large" type="default" ghost onClick={onCancel}>
                    Tutup
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loading}
                  >
                    {isEdit ? 'Simpan' : 'Tambah'}
                  </Button>
                  <Gap width={16} height={2} />
                  <Button size="large" type="default" ghost onClick={onCancel}>
                    Batal
                  </Button>
                </>
              )}
            </div>
          </Form.Item>
        </RenderIf>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
