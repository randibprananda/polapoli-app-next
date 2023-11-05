import { Button, Col, Form, Input, Modal, Row, Switch } from 'antd';
import React from 'react';

import { RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import FormBuktiQuickCount from '../FormBuktiQuickCount';
import FormIdentitasResponden from '../FormIdentitasResponden';
import FormKandidatPilihan from '../FormKandidatPilihan';
import FormMetodePengambilan from '../FormMetodePengambilan';
import FormWilayahQuickCount from '../FormWilayahQuickCount';
import Props from './modalAdd.props';

const ModalAddSampleQuickCount: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  draggerProps,
  loading,
  form,
  isEdit,
  isDetail,
  onUpdate,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  paslons,
  isLegislatif,
  partaiData,
  calonAnggotaData,
  setPartaiSelected
}) => {
  return (
    <Modal width={1200} footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b-grey3 pb-2 mb-6 border-b">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit' : isDetail ? 'Detail' : 'Tambah'} Quick Count/Sample
        </h2>
      </div>
      <Form
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        form={form}
        layout="vertical"
      >
        <Row gutter={[12, 12]} className="border-b-grey3 pb-4 mb-6 border-b">
          <Col xs={24} lg={8}>
            <Row gutter={[12, 12]}>
              <Col xs={24}>
                <FormMetodePengambilan isDetail={isDetail} />
              </Col>
              <Col xs={24}>
                <FormWilayahQuickCount
                  wilayah={wilayah}
                  setWilayah={setWilayah}
                  provinsiData={provinsiData}
                  kotaData={kotaData}
                  kecamatanData={kecamatanData}
                  kelurahanData={kelurahanData}
                  disableAllInput={isDetail}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={10}>
            {/* //! isDetail Belum Tahu Buat Apa */}
            <FormIdentitasResponden
              isDetail={false}
              disableAllInput={isDetail}
            />
          </Col>
          <Col xs={24} lg={6}>
            <Row gutter={[12, 12]}>
              <RenderIf isTrue={!!isLegislatif}>
                <Col xs={24}>
                  <FormKandidatPilihan
                    title="Kandidat Partai"
                    data={partaiData?.map(item => ({
                      value: item?.id,
                      label: `${item?.nama_partai}`
                    }))}
                    name="kandidat_partai_id"
                    onSelect={setPartaiSelected}
                    isDetail={isDetail}
                  />
                </Col>
              </RenderIf>
              <Col xs={24}>
                <FormKandidatPilihan
                  isDetail={isDetail}
                  data={
                    isLegislatif
                      ? calonAnggotaData?.map(item => ({
                          value: item?.id,
                          label: `No. ${item.no_urut} -
                      ${`${item.nama_calon}`}
                      `
                        }))
                      : paslons?.map(item => ({
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
                <FormBuktiQuickCount
                  isDetail={isDetail}
                  isEdit={isEdit}
                  loading={loading}
                  draggerProps={draggerProps}
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

export default ModalAddSampleQuickCount;
