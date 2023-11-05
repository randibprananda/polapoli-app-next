import { Col, Form, Row, Select } from 'antd';
import React from 'react';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../@types/DaerahIndonesia';
import { RenderIf } from '../../../utils';
import Props, { KeyValueFormWilayahProps } from './wilayah.props';

const { Option } = Select;

const defaultKeyValue: KeyValueFormWilayahProps = {
  provinsi: 'id',
  kecamatan: 'id',
  kota: 'id',
  kelurahan: 'id'
};

const defaultWilayah = {
  provinsi: null,
  kecamatan: null,
  kota: null,
  kelurahan: null
};

const FormWilayah: React.FC<Props> = ({
  withWilayah = true,
  withTitle = true,
  isEdit = true,
  wilayah = defaultWilayah,
  setWilayah,
  provinsiData = [],
  kotaData = [],
  kecamatanData = [],
  kelurahanData = [],
  setWithWilayah,
  description,
  withKelurahan = true,
  keyValue = defaultKeyValue,
  withBorder = false,
  title = 'Data Wilayah',
  disableAllInput = false,
  dataSurvey,
  customLayout = {
    provinsi: {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 12
    },
    kota: {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 12
    },
    kecamatan: {
      xs: 24,
      sm: 24,
      md: withKelurahan ? 12 : 24,
      lg: withKelurahan ? 12 : 24,
      xl: withKelurahan ? 12 : 24
    },
    kelurahan: {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 12
    }
  }
}) => {
  return (
    <Row
      gutter={[6, 24]}
      className={`pb-6 ${withBorder ? 'border-b border-b-grey3' : ''}`}
    >
      <RenderIf isTrue={withTitle}>
        <Col xs={24}>
          <div className="bg-grey3 flex items-start justify-center p-3 mb-1">
            <h2 className="text-base font-semibold">{title}</h2>
          </div>
        </Col>
      </RenderIf>
      {description && (
        <Col xs={24}>
          <p className="w-3/4 mx-auto text-xs italic text-center">
            {description}
          </p>
        </Col>
      )}
      <Col {...customLayout.provinsi}>
        <Form.Item
          name={keyValue.provinsi === 'id' ? 'propinsi_id' : 'propinsi'}
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
            disabled={!withWilayah || disableAllInput}
          >
            {dataSurvey?.propinsi ? (
              <Option value={dataSurvey?.propinsi?.id}>
                {dataSurvey?.propinsi?.name}
              </Option>
            ) : (
              provinsiData.map((item: ProvinsiInterface) => (
                <Option
                  key={item.id}
                  value={keyValue.provinsi === 'id' ? item.id : item.name}
                >
                  {item.name}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>
      </Col>
      <Col {...customLayout.kota}>
        <Form.Item
          name={keyValue.kota === 'id' ? 'kabupaten_id' : 'kabupaten'}
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
            disabled={!wilayah.provinsi || !withWilayah || disableAllInput}
            showSearch
            placeholder="Kabupaten/Kota*"
            optionFilterProp="children"
            onChange={e => setWilayah('kota', e)}
          >
            {dataSurvey?.kabupaten ? (
              <Option value={dataSurvey?.kabupaten?.id}>
                {dataSurvey?.kabupaten?.name}
              </Option>
            ) : (
              kotaData.map((item: KotaInterface) => (
                <Option
                  key={item.id}
                  value={keyValue.kota === 'id' ? item.id : item.name}
                >
                  {item.name}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>
      </Col>

      <Col {...customLayout.kecamatan}>
        <Form.Item
          label="Kecamatan"
          name={keyValue.kecamatan === 'id' ? 'kecamatan_id' : 'kecamatan'}
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
            disabled={!wilayah.kota || !withWilayah || disableAllInput}
            showSearch
            placeholder="Kecamatan*"
            optionFilterProp="children"
            onChange={e => setWilayah('kecamatan', e)}
          >
            {dataSurvey?.kecamatan ? (
              <Option value={dataSurvey?.kecamatan?.id}>
                {dataSurvey?.kecamatan?.name}
              </Option>
            ) : (
              kecamatanData.map((item: KecamatanInterface) => (
                <Option
                  key={item.id}
                  value={keyValue.kecamatan === 'id' ? item.id : item.name}
                >
                  {item.name}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>
      </Col>

      {withKelurahan && (
        <Col {...customLayout.kelurahan}>
          <Form.Item
            label="Kelurahan"
            name={keyValue.kelurahan === 'id' ? 'kelurahan_id' : 'kelurahan'}
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
              disabled={!wilayah.kecamatan || !withWilayah || disableAllInput}
              showSearch
              placeholder="Kelurahan*"
              optionFilterProp="children"
              onChange={e => setWilayah('kelurahan', e)}
            >
              {dataSurvey?.kelurahan ? (
                <Option value={dataSurvey?.kelurahan?.id}>
                  {dataSurvey?.kelurahan?.name}
                </Option>
              ) : (
                kelurahanData.map((item: KelurahanInterface) => (
                  <Option
                    key={item.id}
                    value={keyValue.kelurahan === 'id' ? item.id : item.name}
                  >
                    {item.name}
                  </Option>
                ))
              )}
            </Select>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

export default FormWilayah;
