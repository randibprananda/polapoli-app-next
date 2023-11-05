import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { DPTInterface } from '../../../../@types/Pendukung';
import { AGAMA_DI_INDONESIA, JENIS_KELAMIN } from '../../../../constant';
import { RenderIf } from '../../../../utils';
import Props from './formBiodataPemilih.props';

const { Option } = Select;

const FormBiodataPemilih: React.FC<Props> = ({
  isDetail,
  isPemilih,
  dptData,
  onSearchNIK = () => {},
  setNIK = () => {}
}) => {
  const generateOption = () =>
    dptData?.map((item: DPTInterface) => (
      <Option key={item.id} value={item.nik} className="capitalize">
        {item.nik}
      </Option>
    ));

  return (
    <Row gutter={[6, 24]} className={'pb-6'}>
      <Col xs={24}>
        <div className="flex items-start justify-center p-3 mb-1 bg-grey3">
          <h2 className="text-base font-semibold">Biodata</h2>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="nik"
          label="NIK"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan NIK (16 karakter)',
              pattern: /^([0-9]){16}$/
            }
          ]}
          required
        >
          {isPemilih ? (
            <Select
              showSearch
              placeholder="Pilih NIK"
              onChange={e => setNIK(e)}
              onSearch={e => onSearchNIK(e)}
              disabled={isDetail}
            >
              {generateOption()}
            </Select>
          ) : (
            <Input
              placeholder="Masukkan NIK"
              type="number"
              disabled={isDetail}
            />
          )}
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="nama"
          label="Nama"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan nama'
            }
          ]}
          required
        >
          <Input placeholder="Masukkan nama" disabled={isDetail} />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="tempat_lahir"
          label="Tempat Lahir"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan Tempat Lahir'
            }
          ]}
          required
        >
          <Input placeholder="Masukkan Tempat Lahir" disabled={isDetail} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="tanggal_lahir"
          label="Tanggal Lahir"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Masukkan Tanggal Lahir'
            }
          ]}
          required
        >
          <DatePicker
            className="w-full"
            placeholder="Pilih Tanggal Lahir"
            disabled={isDetail}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="jenis_kelamin"
          label="Jenis Kelamin"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Pilih Jenis Kelamin'
            }
          ]}
          required
        >
          <Select placeholder="Pilih Jenis Kelamin" disabled={isDetail}>
            {JENIS_KELAMIN.map((item: any) => (
              <Option key={item.key} className="capitalize">
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <RenderIf isTrue={isPemilih}>
        <Col xs={24} md={12}>
          <Form.Item
            name="agama"
            label="Agama"
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Pilih agama'
              }
            ]}
          >
            <Select placeholder="Pilih Agama" disabled={isDetail}>
              {AGAMA_DI_INDONESIA.map((item: string) => (
                <Option key={item} className="capitalize">
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="suku"
            label="Suku"
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Masukkan nama suku'
              }
            ]}
          >
            <Input
              placeholder="Masukkan Nama Suku"
              readOnly={!isPemilih}
              disabled={isDetail}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="keterangan"
            label="Keterangan"
            className="mb-0"
            rules={[
              {
                required: true,
                message: 'Masukkan keterangan'
              }
            ]}
          >
            <Input.TextArea
              disabled={isDetail}
              placeholder="Masukkan Keterangan"
              rows={4}
              readOnly={!isPemilih}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="referal_relawan"
            label="Referal Relawan"
            className="mb-0"
          >
            <Input placeholder="Current User Login" disabled />
          </Form.Item>
        </Col>
      </RenderIf>
    </Row>
  );
};

export default FormBiodataPemilih;
