import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../@types/DaerahIndonesia';
import { RenderIf } from '../../../utils';
import Props from './wilayah.props';

const { Option } = Select;
const FormWilayahWithJenisWilayah: React.FC<Props> = ({
  modalState: { withWilayah, jenisWilayah },
  isEdit,
  isDetail,
  isCreate,
  wilayah,
  setWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  setDynamicModalState,
  title = 'Data Wilayah',
  withTitle = true,
  label = 'Wilayah',
  withDapil = false,
  withRTRW = false,
  width = '12',
  customName
}) => {
  const jenisWilayahName = customName && {
    name: customName
  };

  return (
    <Row gutter={[6, 24]}>
      <RenderIf isTrue={withTitle}>
        <Col xs={24}>
          <div className="bg-grey3 flex items-start justify-center p-3 mb-1">
            <p className="text-base font-semibold">{title}</p>
          </div>
        </Col>
      </RenderIf>
      <Col xs={24}>
        <Form.Item
          label={label}
          className="mb-0"
          rules={[
            {
              required: withWilayah,
              message: 'Pilih jenis wilayah'
            }
          ]}
          required={withWilayah}
          {...jenisWilayahName}
        >
          <Select
            className="w-full"
            showSearch
            placeholder={label}
            optionFilterProp="children"
            defaultValue={jenisWilayah}
            value={jenisWilayah}
            onChange={e => setDynamicModalState('jenisWilayah', e)}
            disabled={!withWilayah || isDetail}
            defaultActiveFirstOption
          >
            <Option value="0">Provinsi</Option>
            <Option value="1">Kota/Kab</Option>
            <Option value="2">Kecamatan</Option>
            <Option value="3">Kelurahan</Option>
            {withDapil && <Option value="4">Dapil</Option>}
            {withRTRW && <Option value={withDapil ? '5' : '4'}>RT/RW</Option>}
          </Select>
        </Form.Item>
      </Col>
      {(jenisWilayah === '0' ||
        jenisWilayah === '1' ||
        jenisWilayah === '2' ||
        jenisWilayah === '3' ||
        jenisWilayah === '4' ||
        jenisWilayah === '5') && (
        <Col xs={24} md={+width}>
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
              onChange={e => setWilayah('provinsi', e)}
              disabled={!withWilayah || isDetail}
            >
              {provinsiData.map((item: ProvinsiInterface) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      )}
      {(jenisWilayah === '1' ||
        jenisWilayah === '2' ||
        jenisWilayah === '3' ||
        jenisWilayah === '4' ||
        jenisWilayah === '5') && (
        <Col xs={24} md={+width}>
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
              disabled={!wilayah.provinsi || !withWilayah || isDetail}
              showSearch
              placeholder="Kabupaten/Kota*"
              optionFilterProp="children"
              onChange={e => setWilayah('kota', e)}
            >
              {kotaData.map((item: KotaInterface) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      )}

      {(jenisWilayah === '2' ||
        jenisWilayah === '3' ||
        jenisWilayah === '4' ||
        jenisWilayah === '5') && (
        <Col xs={24} md={+width}>
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
              disabled={!wilayah.kota || !withWilayah || isDetail}
              showSearch
              placeholder="Kecamatan*"
              optionFilterProp="children"
              onChange={e => setWilayah('kecamatan', e)}
            >
              {kecamatanData.map((item: KecamatanInterface) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      )}
      {(jenisWilayah === '3' ||
        jenisWilayah === '4' ||
        jenisWilayah === '5') && (
        // biar kerok
        <Col xs={24} md={+width}>
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
              disabled={!wilayah.kecamatan || !withWilayah || isDetail}
              showSearch
              placeholder="Kelurahan*"
              optionFilterProp="children"
              onChange={e => {
                setWilayah('kelurahan', e);
              }}
            >
              {kelurahanData.map((item: KelurahanInterface) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      )}
      {withDapil && (jenisWilayah === '4' || jenisWilayah === '5') && (
        <Col xs={24} md={24}>
          <Form.Item
            label="Dapil"
            name="dapil"
            className="mb-0"
            rules={[
              {
                required: withWilayah,
                message: 'Pilih jenis wilayah'
              },
              {
                validator: (rule, value) => {
                  if (value < 0) {
                    return Promise.reject(
                      'Dapil Tidak Boleh Berisi Nilai Negatif'
                    );
                  }
                  return Promise.resolve();
                }
              }
            ]}
            required={withWilayah}
          >
            <Input type="text" placeholder="Dapil" readOnly={isDetail} />
          </Form.Item>
        </Col>
      )}
      {withRTRW && jenisWilayah === (withDapil ? '5' : '4') && (
        <>
          <Col xs={24} md={+width}>
            <Form.Item
              label="RW"
              name="rw"
              className="mb-0"
              rules={[
                {
                  required: withWilayah,
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
              required={withWilayah}
            >
              <Input type="number" placeholder="RW" readOnly={isDetail} />
            </Form.Item>
          </Col>
          <Col xs={24} md={+width}>
            <Form.Item
              label="RT"
              name="rt"
              className="mb-0"
              rules={[
                {
                  required: withWilayah,
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
              required={withWilayah}
            >
              <Input type="number" placeholder="RT" readOnly={isDetail} />
            </Form.Item>
          </Col>
        </>
      )}
    </Row>
  );
};

export default FormWilayahWithJenisWilayah;
