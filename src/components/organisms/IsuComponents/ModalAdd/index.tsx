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
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../../@types/DaerahIndonesia';
import { JenisIsuInterface } from '../../../../@types/Isu';
import { IcImageDefault } from '../../../../assets';
import { DAMPAK_ISU } from '../../../../constant';
import { RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import { FormDapil } from '../../../moleculs';
import Props from './modalAdd.props';

const { Option } = Select;

const ModalAdd: React.FC<Props> = ({
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
  withWilayah,
  setWithWilayah,
  jenisWilayahIsu,
  setJenisWilayahIsu
}) => {
  const [cookies] = useCookies(['user']);
  const [isOnline, setIsOnline] = useState<any>(null);

  const onReset = () => {
    setJenisWilayahIsu(null);
    setWithWilayah(false);
    setIsOnline(null);
  };

  const hanldeCheckedWithWilayah = (e: any) => {
    setWithWilayah(e.target.checked);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      isu_wilayah: e.target.checked
    });

    // reset wilayah
    if (!e.target.checked) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        propinsi_id: '',
        kabupaten_id: '',
        kecamatan_id: '',
        kelurahan_id: ''
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      nama_pelapor: cookies.user.name
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

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
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">Tambah Isu</h2>
      </div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={24} className="pb-6 mb-6 border-b border-b-grey3">
          <Col xs={24} md={12}>
            <Form.Item
              label="Bukti/Foto Isu"
              rules={[
                {
                  required: true,
                  message: 'Masukkan bukti / foto isu'
                }
              ]}
              name="foto_isu"
              getValueFromEvent={({ file }) => file.originFileObj}
            >
              <Dragger {...draggerProps} height={200} className="bg-white">
                <p className="ant-upload-drag-icon">
                  {/* <InboxOutlined /> */}
                  <Image
                    src={IcImageDefault}
                    width={50}
                    height={50}
                    objectFit="contain"
                    alt="icon dragger"
                  />
                </p>
                <p className="ant-upload-text">
                  Tarik foto atau,{' '}
                  <span className="font-semibold text-primary">Pilih File</span>
                </p>
              </Dragger>
            </Form.Item>
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
                  <Input placeholder="Judul Isu*" />
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
                  <Input placeholder="URL / Alamat Website" name="calon" />
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
                className="w-full"
                placeholder="Dampak Isu"
                optionFilterProp="children"
              >
                {DAMPAK_ISU?.map((value: string) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
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
              <DatePicker placeholder="Tanggal Isu" className="w-full" />
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
                name="calon"
                rows={5}
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
                value={withWilayah}
                onChange={e => hanldeCheckedWithWilayah(e)}
              >
                Isu Wilayah
              </Checkbox>
              <p className="text-sm italic font-medium text-grey1">
                Silahkan tanda jika isu memiliki wilayah spesifik
              </p>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[6, 24]} className="pb-6 mb-6 border-b border-b-grey3">
              <Col xs={24}>
                <div className="flex items-start justify-center p-3 mb-5 bg-grey3">
                  <p className="text-base font-semibold">Data Wilayah</p>
                </div>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Wilayah Isu"
                  className="mb-0"
                  rules={[
                    {
                      required: withWilayah,
                      message: 'Pilih jenis wilayah'
                    }
                  ]}
                  required={withWilayah}
                >
                  <Select
                    className="w-full"
                    showSearch
                    placeholder="Wilayah Isu"
                    optionFilterProp="children"
                    value={jenisWilayahIsu}
                    onChange={e => setJenisWilayahIsu(e)}
                    disabled={!withWilayah}
                  >
                    <Option value="1">Kabupaten/Kota</Option>
                    <Option value="2">Kecamatan</Option>
                    <Option value="3">Kelurahan/Desa</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="propinsi_id"
                  label="Provinsi"
                  className="mb-0"
                  rules={[
                    {
                      required: withWilayah,
                      message: 'Pilih provinsi'
                    }
                  ]}
                  required={withWilayah}
                >
                  <Select
                    className="w-full"
                    showSearch
                    placeholder="Provinsi*"
                    optionFilterProp="children"
                    onChange={e => setTempWilayah('provinsi', e)}
                    disabled={!withWilayah}
                  >
                    {provinsiData.map((item: ProvinsiInterface) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <RenderIf
                isTrue={
                  jenisWilayahIsu === '1' ||
                  jenisWilayahIsu === '2' ||
                  jenisWilayahIsu === '3'
                }
              >
                <Col xs={24} md={12}>
                  <Form.Item
                    name="kabupaten_id"
                    label="Kota/Kabupaten"
                    className="mb-0"
                    rules={[
                      {
                        required: withWilayah,
                        message: 'Pilih jenis kota/kabupaten'
                      }
                    ]}
                    required={withWilayah}
                  >
                    <Select
                      className="w-full"
                      disabled={!tempWilayah.provinsi || !withWilayah}
                      showSearch
                      placeholder="Kabupaten/Kota*"
                      optionFilterProp="children"
                      onChange={e => setTempWilayah('kota', e)}
                    >
                      {kotaData.map((item: KotaInterface) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </RenderIf>

              <RenderIf
                isTrue={jenisWilayahIsu === '2' || jenisWilayahIsu === '3'}
              >
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Kecamatan"
                    name="kecamatan_id"
                    className="mb-0"
                    rules={[
                      {
                        required: withWilayah,
                        message: 'Pilih kecamatan'
                      }
                    ]}
                    required={withWilayah}
                  >
                    <Select
                      className="w-full"
                      disabled={!tempWilayah.kota || !withWilayah}
                      showSearch
                      placeholder="Kecamatan*"
                      optionFilterProp="children"
                      onChange={e => setTempWilayah('kecamatan', e)}
                    >
                      {kecamatanData.map((item: KecamatanInterface) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </RenderIf>
              <RenderIf isTrue={jenisWilayahIsu === '3'}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Kelurahan"
                    name="kelurahan_id"
                    className="mb-0"
                    rules={[
                      {
                        required: withWilayah,
                        message: 'Pilih jenis wilayah'
                      }
                    ]}
                    required={withWilayah}
                  >
                    <Select
                      className="w-full"
                      disabled={!tempWilayah.kecamatan || !withWilayah}
                      showSearch
                      placeholder="Kelurahan*"
                      optionFilterProp="children"
                      onChange={e => setTempWilayah('kelurahan', e)}
                    >
                      {kelurahanData.map((item: KelurahanInterface) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </RenderIf>

              <RenderIf
                isTrue={
                  jenisWilayahIsu === '1' ||
                  jenisWilayahIsu === '2' ||
                  jenisWilayahIsu === '3'
                }
              >
                <Col xs={24}>
                  <FormDapil
                    form={form}
                    mounted={visible}
                    isActive={!!tempWilayah.provinsi || !withWilayah}
                  />
                </Col>
              </RenderIf>
            </Row>
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
              Tambah
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
