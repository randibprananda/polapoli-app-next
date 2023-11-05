import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import React from 'react';
import { UserInterface } from '../../../../@types/User';
import { TIPE_SURVEI } from '../../../../constant';
import { Gap } from '../../../atoms';
import { FormWilayah } from '../../../moleculs';
import Props from './modalAddJadwalKunjungan.props';

const { Option } = Select;

const ModalAddJadwalKunjungan: React.FC<Props> = ({
  visible,
  isEdit,
  isDetail,
  form,
  onCancel,
  onCreate,
  onUpdate,
  loading,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  relawanData,
  onSearchRelawan
}) => {
  const generateOption = () =>
    relawanData?.map((item: UserInterface) => (
      <Option key={item.id} value={item.id} className="capitalize">
        {item.name}
      </Option>
    ));

  return (
    <Modal
      width={1000}
      footer={false}
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
    >
      <div className="border-b-grey3 pb-2 mb-6 border-b">
        <h2 className=" text-xl font-bold">
          {isEdit ? 'Edit' : isDetail ? 'Detail' : 'Tambah'} Jadwal
        </h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={isEdit ? onUpdate : onCreate}
        layout="vertical"
      >
        <Row gutter={24} className="border-b-grey3 pb-6 mb-6 border-b">
          <Col xs={24} md={10}>
            <Form.Item
              name="jenis_survey"
              label="Jenis Survei"
              rules={[
                {
                  required: true,
                  message: 'Pilih jenis survey'
                }
              ]}
            >
              <Select placeholder="Jenis Survei">
                {TIPE_SURVEI.map((item: string) => (
                  <Option key={item} className="capitalize">
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <FormWilayah
              isEdit={isEdit}
              wilayah={wilayah}
              setWilayah={setWilayah}
              provinsiData={provinsiData}
              kotaData={kotaData}
              kecamatanData={kecamatanData}
              kelurahanData={kelurahanData}
              withTitle={false}
              keyValue={{
                provinsi: 'id',
                kecamatan: 'id',
                kota: 'id',
                kelurahan: 'id'
              }}
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
            <Form.Item
              label="RW"
              name="rw"
              className="mb-0"
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
                style={{ marginBottom: 10 }}
              />
            </Form.Item>
            <Form.Item
              label="RT"
              name="rt"
              className="mb-0"
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
              <Input type="number" placeholder="Masukkan RT" />
            </Form.Item>
          </Col>

          <Col xs={24} md={14}>
            <Form.Item
              name="user_id"
              label="Pilih Anggota Relawan"
              rules={[
                {
                  required: true,
                  message: 'Pilih anggota relawan'
                }
              ]}
            >
              <Select
                showSearch
                placeholder="Pilih Anggota Relawan"
                onSearch={e => onSearchRelawan(e, 'select')}
                filterOption={false}
              >
                {generateOption()}
              </Select>
            </Form.Item>
            <Form.Item
              name="jadwal_kunjungan"
              label="Tanggal Kunjungan"
              rules={[
                {
                  required: true,
                  message: 'Pilih jadwal kunjungan'
                }
              ]}
            >
              <Input
                type="date"
                className="w-full"
                placeholder="Pilih jadwal kunjungan"
              />
            </Form.Item>
            <Form.Item
              name="keterangan"
              label="Keterangan"
              rules={[
                {
                  required: true,
                  message: 'Masukkan keterangan'
                }
              ]}
            >
              <Input.TextArea rows={3} placeholder="Keterangan/Catatan" />
            </Form.Item>
          </Col>
        </Row>
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
      </Form>
    </Modal>
  );
};

export default ModalAddJadwalKunjungan;
