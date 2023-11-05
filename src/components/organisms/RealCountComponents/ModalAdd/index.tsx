import { Button, Col, Form, Input, Modal, Row, Switch } from 'antd';
import React, { useState } from 'react';

import { RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import { FormFoto } from '../../../moleculs';
import FormJumlahSuaraRealCount from '../FormJumlahSuara';
import FormWilayahRealCount from '../FormWilayahRealCount';
import Props from './modalAdd.props';

const ModalAddRealCount: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  draggerProps,
  loading,
  form,
  isEdit,
  onUpdate,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  paslonData,
  isDetail,
  isLegislatif,
  partaiData,
  calonAnggotaData,
  setPartaiSelected
}) => {
  return (
    <Modal width={912} footer={false} visible={visible} onCancel={onCancel}>
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">
          {isEdit ? 'Edit' : isDetail ? 'Detail' : 'Tambah'} Real Count
        </h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        form={form}
        layout="vertical"
      >
        <Row gutter={[12, 12]} className="pb-4 mb-6 border-b border-b-grey3">
          <Col xs={24} lg={12}>
            <Row gutter={[12, 12]}>
              <Col xs={24}>
                <FormWilayahRealCount
                  wilayah={wilayah}
                  setWilayah={setWilayah}
                  provinsiData={provinsiData}
                  kotaData={kotaData}
                  kecamatanData={kecamatanData}
                  kelurahanData={kelurahanData}
                  withKelurahan={true}
                  disableAllInput={isDetail}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={12}>
            <Row gutter={[12, 12]}>
              <RenderIf isTrue={!!isLegislatif}>
                <Col xs={24}>
                  <FormJumlahSuaraRealCount
                    isDetail={isDetail}
                    title="Jumlah Suara Partai"
                    type="select"
                    form={form}
                    data={partaiData?.map(item => ({
                      value: item?.id,
                      label: `${item?.nama_partai}`
                    }))}
                    suara_key={{
                      suara_sah: 'suara_sah_partai',
                      suara_tidak_sah: 'suara_tidak_sah_partai'
                    }}
                    onSelect={setPartaiSelected}
                  />
                </Col>
              </RenderIf>
              <Col xs={24}>
                <FormJumlahSuaraRealCount
                  isDetail={isDetail}
                  title="Jumlah Suara Calon"
                  form={form}
                  data={
                    isLegislatif
                      ? calonAnggotaData?.map(item => ({
                          value: item?.id,
                          label: `No. ${item.no_urut} -
                      ${`${item.nama_calon}`}
                      `
                        }))
                      : paslonData?.map(item => ({
                          value: item?.id,
                          label: `Kandidat ${item.nomor_urut} (
                      ${`${item.nama_paslon} ${
                        item.nama_wakil_paslon
                          ? `& ${item.nama_wakil_paslon}`
                          : ''
                      }`}
                      )`
                        }))
                  }
                />
              </Col>
              <Col xs={24}>
                <FormFoto
                  isDetail={isDetail}
                  loading={loading}
                  isEdit={isEdit}
                  draggerProps={draggerProps}
                  name="foto_form"
                  title="Foto Form C1"
                  form={form}
                />
              </Col>
            </Row>
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
                {isEdit ? 'Simpan' : 'Tambah'}
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

export default ModalAddRealCount;
