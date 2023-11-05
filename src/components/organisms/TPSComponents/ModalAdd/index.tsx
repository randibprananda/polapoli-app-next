import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';

import { Gap } from '../../../atoms';
import { FormDapil, FormWilayah } from '../../../moleculs';
import { KeyValueFormWilayahProps } from '../../../moleculs/FormWilayah/wilayah.props';
import Props from './modalAdd.props';

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
  const keyValueFormWilayah: KeyValueFormWilayahProps = {
    provinsi: 'id',
    kecamatan: 'id',
    kota: 'id',
    kelurahan: 'name'
  };

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">
          {isEdit ? 'Edit' : 'Tambah'} Data TPS
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
              keyValue={keyValueFormWilayah}
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
            <Form.Item
              name="jumlah_tps"
              label="Jumlah TPS"
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: 'Masukkan jumlah TPS',
                  pattern: new RegExp('^[0-9]{1,10}$')
                }
              ]}
              required
            >
              <Input size="large" placeholder="Jumlah TPS" type="number" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="keterangan"
              label="Keterangan/Catatan"
              rules={[
                {
                  required: true,
                  message: 'Tambahkan keterangan/catatan'
                }
              ]}
            >
              <Input.TextArea
                size="large"
                placeholder="Keterangan/Catatan"
                rows={5}
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
                <Button size="large" type="default" ghost onClick={onCancel}>
                  Batal
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
