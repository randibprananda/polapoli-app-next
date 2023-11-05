import { Modal, Form, Row, Col, Select, Input, Button, Checkbox } from 'antd';
import React, { useState } from 'react';
import { StokLogistikInterface } from '../../../../../@types/Logistik';
import { useStokLogistik } from '../../../../../swr';
import { currencyFormat } from '../../../../../utils';
import { Gap } from '../../../../atoms';
import { FormWilayah, FormWilayahWithJenisWilayah } from '../../../../moleculs';
import Props from './modal.props';

const { Option } = Select;

const ModalPengeluaranLogistik: React.FC<Props> = ({
  visible,
  onCancel,
  form,
  loading,
  stokData,
  onFinish,
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
  const { data: stokAvailable, isLoading: stokLoading } = useStokLogistik(
    true,
    id
  );
  const [total, setTotal] = useState(0);

  const isNotAvailable =
    !!id && !stokLoading && stokAvailable?.data?.stok_akhir === 0;

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel} width={1000}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">Tambah Pengeluaran Barang</h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[24, 24]} className="border-b pb-6 border-b-grey3 mb-6">
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
                    value={stokAvailable?.data.nama_satuan}
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
                    value={currencyFormat(
                      id && !stokLoading ? stokAvailable?.data.harga_satuan : 0
                    )}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  className="mb-0"
                  label="Jumlah Pengeluaran"
                  required
                  name="jumlah_pengeluaran"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan jumlah pengeluaran',
                      pattern: new RegExp('^[0-9]{1,10}$')
                    }
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Jumlah Pengeluaran"
                    value={total}
                    onChange={e => setTotal(parseInt(e.target.value))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Sisa Stok"
                  required
                  className="mb-0"
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan sisa stok'
                    }
                  ]}
                >
                  <Input
                    placeholder="Sisa Stok"
                    value={
                      id && !stokLoading ? stokAvailable?.data?.stok_akhir : 0
                    }
                    disabled
                  />
                </Form.Item>
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
              <Col xs={24}>
                <Form.Item name="isu_wilayah" valuePropName="checked" noStyle>
                  <Checkbox
                    defaultChecked={modalState.withWilayah}
                    checked={modalState.withWilayah}
                    onChange={e =>
                      setDynamicModalState('withWilayah', e.target.checked)
                    }
                    className="font-medium"
                  >
                    Pengeluaran Ke Wilayah
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <FormWilayahWithJenisWilayah
              withDapil
              withRTRW
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
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item>
              <div className="flex justify-center">
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={isNotAvailable}
                >
                  {isNotAvailable ? 'Stok Kosong' : 'Tambah'}
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

export default ModalPengeluaranLogistik;
