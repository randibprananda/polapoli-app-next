import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select
} from 'antd';
import React, { useEffect, useState } from 'react';
import { JenisIsuInterface } from '../../../../@types/Isu';
import { Gap } from '../../../atoms';
import FormImageIsu from '../FormImage';
import FormTanggapan from '../FormTanggapan';
import FormWilayah from '../FormWilayahWithJenisIsu';
import Props from './modalDetail.props';

const { Option } = Select;

const ModalDetail: React.FC<Props> = ({
  visible,
  onCancel,
  onFinish,
  draggerProps,
  loading,
  form,
  kotaData = [],
  provinsiData = [],
  kecamatanData = [],
  kelurahanData = [],
  tempWilayah,
  setTempWilayah,
  jenisIsu,
  isEdit,
  withWilayah,
  jenisWilayahIsu,
  withTanggapan,
  setDynamicModalState,
  handleAbaikan,
  handleBatalAbaikan
}) => {
  const [isOnline, setIsOnline] = useState<any>(null);

  const onReset = () => {
    setIsOnline(null);
  };

  useEffect(() => {
    setIsOnline(form.getFieldValue('jenis_isu_id') == 2);
  }, [visible]);

  const hanldeCheckedWithWilayah = (e: any) => {
    setDynamicModalState('withWilayah', e.target.checked);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      isu_wilayah: e.target.checked
    });
  };

  return (
    <Modal
      width={1200}
      footer={false}
      visible={visible}
      onCancel={() => {
        onCancel();
        onReset();
      }}
    >
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">{isEdit ? 'Edit' : 'Detail'} Isu</h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={e => onFinish(e, true)}
        layout="vertical"
      >
        <Row gutter={24} className="border-b pb-6 border-b-grey3 mb-6">
          <Col xs={24} md={8}>
            <Row gutter={[6, 24]} className="pb-6 mb-6">
              <Col xs={24}>
                <FormImageIsu
                  form={form}
                  isEdit={isEdit}
                  draggerProps={draggerProps}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Jenis Isu"
              required
              name="jenis_isu_id"
              rules={[
                {
                  required: true,
                  message: 'Pilih jenis isu'
                }
              ]}
            >
              <Select
                disabled={!isEdit}
                className="w-full"
                placeholder="Jenis Isu"
                optionFilterProp="children"
                onChange={e => setIsOnline(e === 2)}
              >
                {jenisIsu?.map((isu: JenisIsuInterface) => (
                  <Option key={isu.id} value={isu.id}>
                    {isu.nama_jenis_isu}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {isOnline && (
              <>
                <Form.Item
                  name="judul_isu"
                  label="Judul Isu"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan judul isu'
                    }
                  ]}
                >
                  <Input placeholder="Judul Isu*" disabled={!isEdit} />
                </Form.Item>
                <Form.Item
                  name="url_isu"
                  label="URL / Alamat Website"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'Masukkan url / alamat website'
                    }
                  ]}
                >
                  <Input
                    placeholder="URL / Alamat Website"
                    disabled={!isEdit}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item
              name="dampak_isu"
              label="Dampak"
              required
              rules={[
                {
                  required: true,
                  message: 'Pilih dampak isu'
                }
              ]}
            >
              <Select
                disabled={!isEdit}
                className="w-full"
                placeholder="Dampak Isu"
                optionFilterProp="children"
              >
                <Option value="Negatif">Negatif</Option>
                <Option value="Positif">Positif</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="tanggal_isu"
              label="Tanggal Isu"
              required
              rules={[
                {
                  required: true,
                  message: 'Masukkan tanggal isu'
                }
              ]}
            >
              <DatePicker
                disabled={!isEdit}
                placeholder="Tanggal Isu"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              name="keterangan_isu"
              label="Keterangan/Laporan"
              required
              rules={[
                {
                  required: true,
                  message: 'Masukkan keterangan/laporan'
                }
              ]}
            >
              <Input.TextArea
                placeholder="Keterangan/Laporan"
                rows={5}
                disabled={!isEdit}
              />
            </Form.Item>
            <Form.Item
              name="nama_pelapor"
              label="Nama Pelapor"
              required
              rules={[
                {
                  required: true,
                  message: 'Masukkan nama pelapor'
                }
              ]}
            >
              <Input placeholder="Nama Pelapor*" disabled />
            </Form.Item>
            <Form.Item name="isu_wilayah" valuePropName="checked" noStyle>
              <Checkbox
                disabled={!isEdit}
                defaultChecked={withWilayah}
                checked={withWilayah}
                onChange={e => hanldeCheckedWithWilayah(e)}
              >
                Isu Wilayah
              </Checkbox>
              <p className="font-medium italic text-sm text-grey1">
                Silahkan tanda jika isu memiliki wilayah spesifik
              </p>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Row gutter={[6, 24]} className="pb-6 mb-6">
              <Col xs={24}>
                <FormWilayah
                  withWilayah={withWilayah}
                  jenisWilayahIsu={jenisWilayahIsu}
                  isEdit={isEdit}
                  tempWilayah={tempWilayah}
                  setTempWilayah={setTempWilayah}
                  setDynamicModalState={setDynamicModalState}
                  provinsiData={provinsiData}
                  kotaData={kotaData}
                  kecamatanData={kecamatanData}
                  kelurahanData={kelurahanData}
                  form={form}
                  visible={visible}
                />
              </Col>
              <Col xs={24}>
                <FormTanggapan
                  isEdit={isEdit}
                  withTanggapan={withTanggapan}
                  form={form}
                  setDynamicModalState={setDynamicModalState}
                  handleAbaikan={handleAbaikan}
                  handleBatalAbaikan={handleBatalAbaikan}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item>
          <div className="flex justify-center">
            {isEdit ? (
              <>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Edit
                </Button>
                <Gap width={16} height={2} />
                <Button
                  size="large"
                  type="default"
                  ghost
                  onClick={() => {
                    onCancel();
                    onReset();
                  }}
                >
                  Batal
                </Button>
              </>
            ) : (
              <Button
                size="large"
                type="default"
                ghost
                onClick={() => {
                  onCancel();
                  onReset();
                }}
              >
                Tutup
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDetail;
