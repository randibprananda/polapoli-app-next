import { Button, Col, Form, Modal, Row } from 'antd';
import React from 'react';
import { RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import { FormWilayahWithJenisWilayah } from '../../../moleculs';
import BiodataKoordinator from '../BiodataKoordinator';
import DaftarAnggotaKoordinator from '../DaftarAnggotaKoordinator';
import Props from './modalAdd.props';

const ModalAddKoordinator: React.FC<Props> = ({
  isCreate,
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
  modalState,
  setDynamicModalState,
  relawanData,
  saksiData,
  isDetail,
  anggotaRelawan,
  anggotaSaksi,
  setAnggotaRelawan,
  setAnggotaSaksi,
  onSearchRelawan,
  onSearchSaksi,
  setKelurahanId
}) => {
  const generateLabel = (jenisKoordinator: any) => {
    const classLabel =
      'mx-auto w-full max-w-md text-center text-xs italic font-normal mb-6 p-0';
    if (jenisKoordinator == 1) {
      return (
        <p className={classLabel + ''}>
          *Pastikan anda telah menambahkan koordinator provinsi terlebih dahulu
        </p>
      );
    }

    if (jenisKoordinator == 2) {
      return (
        <p className={classLabel}>
          *Pastikan anda telah menambahkan koordinator provinsi dan
          kabupaten/kota terlebih dahulu
        </p>
      );
    }

    if (jenisKoordinator == 3) {
      return (
        <p className={classLabel}>
          *Pastikan anda telah menambahkan koordinator provinsi, kabupaten/kota,
          dan kecamatan terlebih dahulu
        </p>
      );
    }

    if (jenisKoordinator == 4) {
      return (
        <p className={classLabel}>
          *Pastikan anda telah menambahkan koordinator provinsi, kabupaten/kota,
          kecamatan, dan kelurahan terlebih dahulu
        </p>
      );
    }

    return (
      <p className={classLabel}>*Pastikan anda memasukkan data yang valid</p>
    );
  };

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
          {isEdit ? 'Edit' : isDetail ? 'Detail' : 'Tambah'} Koordinator
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        layout="vertical"
      >
        <Row gutter={24} className="pb-6 mb-6 border-b border-b-grey3">
          <Col xs={24}>{generateLabel(modalState.jenisWilayah)}</Col>
          <Col xs={24} lg={6}>
            <BiodataKoordinator isDetail={isDetail} />
          </Col>
          <Col xs={24} lg={6}>
            <FormWilayahWithJenisWilayah
              modalState={modalState}
              isEdit={isEdit}
              isDetail={isDetail}
              isCreate={isCreate}
              wilayah={wilayah}
              setWilayah={setWilayah}
              provinsiData={provinsiData}
              kotaData={kotaData}
              kecamatanData={kecamatanData}
              kelurahanData={kelurahanData}
              setDynamicModalState={setDynamicModalState}
              withTitle={false}
              withRTRW={true}
              label="Koordinator Tingkat"
              customName="nama_tingkat_koordinator"
              width="24"
            />
          </Col>
          <Col xs={24} lg={6}>
            <RenderIf isTrue={modalState.jenisWilayah === '4'}>
              <DaftarAnggotaKoordinator
                anggota={anggotaRelawan}
                setAnggota={setAnggotaRelawan}
                title="Daftar Relawan"
                data={relawanData}
                customNameField="relawan_id"
                onSearch={onSearchRelawan}
                isDetail={isDetail}
              />
            </RenderIf>
          </Col>

          <Col xs={24} lg={6}>
            <RenderIf isTrue={modalState.jenisWilayah === '4'}>
              <DaftarAnggotaKoordinator
                anggota={anggotaSaksi}
                setAnggota={setAnggotaSaksi}
                title="Daftar Saksi"
                data={saksiData}
                customNameField="saksi_id"
                onSearch={onSearchSaksi}
                isDetail={isDetail}
              />
            </RenderIf>
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
                {isEdit ? 'Edit' : 'Tambah & Kirim Undangan'}
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

export default ModalAddKoordinator;
