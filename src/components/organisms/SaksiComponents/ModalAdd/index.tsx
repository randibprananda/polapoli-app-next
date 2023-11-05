import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';

import { Gap } from '../../../atoms';
import { FormWilayah } from '../../../moleculs';
import BiodataSaksi from '../BiodataSaksi';
import Props from './modalAdd.props';

const ModalAddSaksi: React.FC<Props> = ({
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
  isDetail
}) => {
  return (
    <Modal
      width={824}
      footer={false}
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
    >
      <div className="border-b-grey3 pb-2 mb-6 border-b">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit Saksi' : isDetail ? 'Detail Saksi' : 'Tambah Saksi'}
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        layout="vertical"
      >
        <Row gutter={24} className="border-b-grey3 pb-6 mb-6 border-b">
          <Col xs={24} lg={14}>
            <BiodataSaksi isDetail={isDetail} />
          </Col>
          <Col xs={24} lg={10}>
            <FormWilayah
              wilayah={wilayah}
              setWilayah={setWilayah}
              provinsiData={provinsiData}
              kotaData={kotaData}
              kecamatanData={kecamatanData}
              kelurahanData={kelurahanData}
              disableAllInput={isDetail}
              customLayout={{
                provinsi: {
                  xs: 24,
                  sm: 24,
                  md: 24,
                  lg: 24,
                  xl: 24
                },
                kota: {
                  xs: 24,
                  sm: 24,
                  md: 24,
                  lg: 24,
                  xl: 24
                },
                kecamatan: {
                  xs: 24,
                  sm: 24,
                  md: 24,
                  lg: 24,
                  xl: 24
                },
                kelurahan: {
                  xs: 24,
                  sm: 24,
                  md: 24,
                  lg: 24,
                  xl: 24
                }
              }}
            />
            <Row gutter={[6, 24]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="RW"
                  name="rw"
                  className="mb-0"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan RW'
                    },
                    {
                      validator: (rule, value) => {
                        if (value < 0) {
                          return Promise.reject('RW tidak boleh negatif');
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Masukkan RW"
                    readOnly={isDetail}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="RT"
                  name="rt"
                  className="mb-0"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan RT'
                    },
                    {
                      validator: (rule, value) => {
                        if (value < 0) {
                          return Promise.reject('RT tidak boleh negatif');
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Masukkan RT"
                    readOnly={isDetail}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="TPS"
                  name="tps"
                  className="mb-0"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan TPS'
                    },
                    {
                      validator: (rule, value) => {
                        if (value < 0) {
                          return Promise.reject('TPS tidak boleh negatif');
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Masukkan TPS"
                    readOnly={isDetail}
                  />
                </Form.Item>
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

export default ModalAddSaksi;
