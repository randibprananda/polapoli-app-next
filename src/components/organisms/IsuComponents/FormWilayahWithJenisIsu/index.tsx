import { Col, Form, Row, Select } from 'antd';
import React from 'react';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../../@types/DaerahIndonesia';
import { RenderIf } from '../../../../utils';
import { FormDapil } from '../../../moleculs';
import Props from './wilayah.props';

const { Option } = Select;
const FormWilayah: React.FC<Props> = ({
  withWilayah,
  jenisWilayahIsu,
  isEdit,
  tempWilayah,
  setTempWilayah,
  provinsiData,
  kotaData,
  kecamatanData,
  kelurahanData,
  setDynamicModalState,
  form,
  visible
}) => {
  return (
    <Row gutter={[6, 24]}>
      <Col xs={24}>
        <div className="flex items-start justify-center p-3 mb-1 bg-grey3">
          <p className="text-base font-semibold">Data Wilayah</p>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          label="Wilayah Isu"
          className="mb-0"
          required={withWilayah}
          rules={[
            {
              required: withWilayah,
              message: 'Pilih jenis wilayah'
            }
          ]}
        >
          <Select
            className="w-full"
            showSearch
            placeholder="Wilayah Isu"
            optionFilterProp="children"
            defaultValue={jenisWilayahIsu}
            value={jenisWilayahIsu}
            onChange={e => setDynamicModalState('jenisWilayahIsu', e)}
            disabled={!withWilayah || !isEdit}
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
            disabled={!withWilayah || !isEdit}
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
              disabled={!tempWilayah.provinsi || !withWilayah || !isEdit}
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

      <RenderIf isTrue={jenisWilayahIsu === '2' || jenisWilayahIsu === '3'}>
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
              disabled={!tempWilayah.kota || !withWilayah || !isEdit}
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
              disabled={!tempWilayah.kecamatan || !withWilayah || !isEdit}
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
            isActive={!!tempWilayah.provinsi || !withWilayah || !isEdit}
            allDisabled={!isEdit}
          />
        </Col>
      </RenderIf>
    </Row>
  );
};

export default FormWilayah;
