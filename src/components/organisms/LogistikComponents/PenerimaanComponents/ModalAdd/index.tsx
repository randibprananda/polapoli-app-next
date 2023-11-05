import { Modal, Form, Row, Col, Select, Input, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  PemesananLogistikInterface,
  StokLogistikInterface
} from '../../../../../@types/Logistik';
import { usePemesananLogistik, useStokLogistik } from '../../../../../swr';
import { currencyFormat } from '../../../../../utils';
import { Gap } from '../../../../atoms';
import { FormWilayahWithJenisWilayah } from '../../../../moleculs';
import Props from './modalAdd.props';

const { Option } = Select;

const ModalPenerimaanLogistik: React.FC<Props> = ({
  visible,
  loading,
  onCancel,
  form,
  onCreate,
  stokData,
  pemesananData,
  wilayah,
  setWilayah,
  kecamatanData,
  provinsiData,
  kotaData,
  modalState,
  setDynamicModalState,
  kelurahanData
}) => {
  const [id, setId] = useState(null);
  const [total, setTotal] = useState(0);
  const [jenisPenerimaan, setJenisPenerimaan] = useState(null);
  const [cookies] = useCookies(['user']);

  const { data: stokAvailable, isLoading: stokLoading } = useStokLogistik(
    jenisPenerimaan === '1',
    id
  );
  const { data: pemesananAvailable, isLoading: pemesananLoading } =
    usePemesananLogistik(jenisPenerimaan === '0', id);

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel} width={1000}>
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">Tambah Penerimaan Barang</h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onCreate}
        layout="vertical"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Row gutter={[6, 24]}>
              <Col xs={24}>
                <Form.Item
                  label="Pilih Jenis Penerimaan"
                  required
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Pilih Penerimaan'
                    }
                  ]}
                >
                  <Select
                    className="w-full"
                    placeholder="Jenis Penerimaan*"
                    optionFilterProp="children"
                    onChange={(e: any) => {
                      setJenisPenerimaan(e);
                      setId(null);
                      setTotal(0);
                      form.setFieldsValue({
                        ...form,
                        jumlah_diterima: ''
                      });
                    }}
                  >
                    <Option value="0">Penerimaan Dari Pemesanan</Option>
                    <Option value="1">
                      Penerimaan Langsung (tanpa pemesanan)
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name={
                    jenisPenerimaan === '0'
                      ? 'pemesanan_barang_id'
                      : 'stok_barang_id'
                  }
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
                    disabled={!jenisPenerimaan}
                  >
                    {jenisPenerimaan === '0'
                      ? pemesananData.map(
                          (item: PemesananLogistikInterface) => (
                            <Option key={item.id} value={item.id}>
                              {item.stok_barang.nama_barang}
                            </Option>
                          )
                        )
                      : stokData.map((item: StokLogistikInterface) => (
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
                    value={
                      jenisPenerimaan === '0'
                        ? pemesananAvailable?.data?.stok_barang?.nama_satuan
                        : stokAvailable?.data.nama_satuan
                    }
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
                      jenisPenerimaan === '0'
                        ? currencyFormat(
                            id && !pemesananLoading
                              ? pemesananAvailable?.data?.stok_barang
                                  ?.harga_satuan
                              : 0
                          )
                        : currencyFormat(
                            id && !stokLoading
                              ? stokAvailable?.data.harga_satuan
                              : 0
                          )
                    }
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  className="mb-0"
                  label="Jumlah Penerimaan"
                  required
                  name="jumlah_diterima"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan jumlah penerimaan',
                      pattern: new RegExp('^[0-9]{1,10}$')
                    }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Jumlah Penerimaan*"
                    value={total}
                    onChange={e => setTotal(parseInt(e.target.value))}
                  />
                </Form.Item>
              </Col>
              {jenisPenerimaan === '0' && (
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Sisa Pesanan"
                    required
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Masukkan sisa pesanan'
                      }
                    ]}
                  >
                    <Input
                      placeholder="Sisa Pesanan*"
                      value={
                        id && !pemesananLoading
                          ? pemesananAvailable?.data?.sisa_pesanan
                          : 0
                      }
                      disabled
                    />
                  </Form.Item>
                </Col>
              )}
              <Col xs={24}>
                <Form.Item className="mb-0" label="Penerima Barang" required>
                  <Input
                    placeholder="Current User Login"
                    disabled
                    value={cookies?.user?.username}
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
                  Tambah
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

export default ModalPenerimaanLogistik;
