import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';
import { Gap } from '../../../../atoms';
import { FormWilayahWithJenisWilayah } from '../../../../moleculs';
import Props from './modalAdd.props';

const ModalAdd: React.FC<Props> = ({
  isEdit,
  form,
  visible,
  onCancel,
  onCreate,
  onUpdate,
  loading,
  modalState,
  wilayah,
  provinsiData,
  setWilayah,
  kotaData,
  kecamatanData,
  kelurahanData,
  setDynamicModalState
}) => {
  return (
    <Modal width={964} footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit Barang' : 'Tambah Barang'}
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        layout="vertical"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Row gutter={[6, 24]}>
              <Col xs={24}>
                <Form.Item
                  name="nama_barang"
                  label="Nama Barang"
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan nama barang'
                    }
                  ]}
                >
                  <Input placeholder="Nama Barang*" name="nama_barang" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="nama_satuan"
                  label="Satuan Barang"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan satuan barang'
                    }
                  ]}
                >
                  <Input placeholder="Satuan Barang*" name="satuan_barang" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="harga_satuan"
                  label="Harga Barang"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan harga barang'
                    }
                  ]}
                >
                  <Input placeholder="Harga Barang*" name="harga_barang" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[6, 24]}>
              <Col xs={24}>
                <FormWilayahWithJenisWilayah
                  modalState={modalState}
                  isEdit
                  wilayah={wilayah}
                  setWilayah={setWilayah}
                  provinsiData={provinsiData}
                  kotaData={kotaData}
                  kecamatanData={kecamatanData}
                  kelurahanData={kelurahanData}
                  setDynamicModalState={setDynamicModalState}
                  withDapil
                  withRTRW
                />
              </Col>
              <Col xs={24}>
                <Form.Item
                  className="mb-0"
                  label="Keterangan/Laporan"
                  name="keterangan"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan Keterangan'
                    }
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="Keterangan*" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item>
          <div className="flex justify-center mt-8">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
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
      </Form>
    </Modal>
  );
};

export default ModalAdd;
