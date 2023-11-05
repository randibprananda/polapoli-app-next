import { Modal, Form, Row, Col, Input, Button, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { StokLogistikInterface } from '../../../../../@types/Logistik';
import { useStokLogistik } from '../../../../../swr';
import { currencyFormat } from '../../../../../utils';
import { Gap } from '../../../../atoms';
import { FormWilayahWithJenisWilayah } from '../../../../moleculs';
import Props from './modal.props';

const { Option } = Select;

const ModalPemesananLogistik: React.FC<Props> = ({
  isEdit,
  form,
  visible,
  onCancel,
  onCreate,
  onUpdate,
  loading,
  stokData,
  wilayah,
  setWilayah,
  kecamatanData,
  provinsiData,
  kotaData,
  modalState,
  setDynamicModalState,
  kelurahanData
}) => {
  const oldStokBarangId = form.getFieldValue('stok_barang_id');
  const [id, setId] = useState(null);

  const [total, setTotal] = useState(0);
  const { data, isLoading } = useStokLogistik(true, id || oldStokBarangId);

  useEffect(() => {
    if (!visible) {
      setId(null);
    }
  }, [visible]);
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel} width={1000}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit Pemesanan Barang' : 'Tambah Pemesanan Barang'}
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
                  name="stok_barang_id"
                  label="Nama Barang"
                  required
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan nama barang'
                    }
                  ]}
                >
                  <Select
                    className="w-full"
                    placeholder="Nama Barang*"
                    optionFilterProp="children"
                    showSearch
                    onChange={e => setId(e)}
                  >
                    {stokData.map((item: StokLogistikInterface) => (
                      <Option key={item.id} value={item.id}>
                        {item.nama_barang}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Satuan Barang"
                  required
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan satuan barang'
                    }
                  ]}
                >
                  <Input
                    placeholder="Satuan Barang*"
                    value={isLoading ? '' : data?.data.nama_satuan}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Harga Satuan"
                  required
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan harga barang'
                    }
                  ]}
                >
                  <Input
                    placeholder="Harga Satuan*"
                    value={
                      isLoading
                        ? ''
                        : currencyFormat(
                            oldStokBarangId || id ? data?.data.harga_satuan : 0
                          )
                    }
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  className="mb-0"
                  label="Jumlah Pemesanan"
                  required
                  name="jumlah_pesanan"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan jumlah pemesanan',
                      pattern: new RegExp('^[0-9]{1,10}$')
                    }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Jumlah Pemesanan*"
                    value={total}
                    onChange={e => {
                      setTotal(parseInt(e.target.value));
                      if (e.target.value !== '') {
                        form.setFieldsValue({
                          ...form.getFieldsValue,
                          estimasi_harga_total: currencyFormat(
                            parseInt(e.target.value) * data?.data.harga_satuan
                          )
                        });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Estimasi Harga"
                  name="estimasi_harga_total"
                  required
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan estimasi harga'
                    }
                  ]}
                >
                  <Input
                    placeholder="Estimasi Harga*"
                    value={currencyFormat(total * data?.data.harga_satuan)}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[6, 24]}>
              <Col xs={24}>
                <FormWilayahWithJenisWilayah
                  withRTRW
                  withDapil
                  wilayah={wilayah}
                  setWilayah={setWilayah}
                  kecamatanData={kecamatanData}
                  provinsiData={provinsiData}
                  kotaData={kotaData}
                  kelurahanData={kelurahanData}
                  modalState={modalState}
                  setDynamicModalState={setDynamicModalState}
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

export default ModalPemesananLogistik;
