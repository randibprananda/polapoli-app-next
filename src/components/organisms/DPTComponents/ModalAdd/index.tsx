import { Button, Col, Input, Modal, Row, Select, Form } from 'antd';
import React from 'react';
import { Gap } from '../../../atoms';
import { FormDapil, FormWilayah } from '../../../moleculs';
import Props from './modalAdd.props';

const { Option } = Select;

const ModalAdd: React.FC<Props> = ({
  visible,
  onCancel,
  form,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  onFinish,
  loading,
  isEdit
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit' : 'Tambah'} Data DPT
        </h2>
      </div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
              keyValue={{
                provinsi: 'id',
                kecamatan: 'id',
                kota: 'id',
                kelurahan: 'id'
              }}
            />
          </Col>
          <Col xs={24}>
            <FormDapil
              form={form}
              mounted={visible}
              isActive={!!wilayah.provinsi}
            />
          </Col>

          <Col xs={24}>
            <Row gutter={[6, 24]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="lakilaki"
                  label="Laki-laki"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan jumlah laki-laki',
                      pattern: new RegExp('^[0-9]{1,10}$')
                    }
                  ]}
                  required
                >
                  <Input
                    size="large"
                    placeholder="Laki-laki"
                    type="number"
                    disabled={
                      !wilayah.provinsi ||
                      !wilayah.kota ||
                      !wilayah.kecamatan ||
                      !wilayah.kelurahan
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="perempuan"
                  label="Perempuan"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan jumlah perempuan',
                      pattern: new RegExp('^[0-9]{1,10}$')
                    }
                  ]}
                  required
                >
                  <Input
                    size="large"
                    placeholder="Perempuan"
                    type="number"
                    disabled={
                      !wilayah.provinsi ||
                      !wilayah.kota ||
                      !wilayah.kecamatan ||
                      !wilayah.kelurahan
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item>
                  <div className="flex justify-center">
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      {isEdit ? 'Simpan' : 'Tambah'}
                    </Button>
                    <Gap width={16} height={2} />
                    <Button
                      size="large"
                      type="default"
                      ghost
                      onClick={onCancel}
                    >
                      Batal
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
