import React, { useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { Delete } from 'react-iconly';
import { colors } from '../../../../theme';
import Props from './daftarAnggota.props';
import { UserInterface } from '../../../../@types/User';

const { Option } = Select;
const DaftarAnggotaKoordinator: React.FC<Props> = ({
  title = 'Daftar Anggota',
  data = [],
  customNameField = 'daftar_anggota',
  anggota,
  setAnggota,
  onSearch,
  isDetail = false
}) => {
  const pushAnggota = (newAnggota: any) => {
    const exist = anggota.filter((item: any) => newAnggota.key == item.key);
    if (exist.length === 0) {
      setAnggota([...anggota, newAnggota]);
    }
  };
  const removeAnggota = (id: any) =>
    setAnggota([...anggota.filter((item: any) => item.key != id)]);

  return (
    <Row gutter={[6, 24]}>
      <Col xs={24}>
        <div className="bg-grey3 p-3 flex justify-center items-start mb-1">
          <h2 className="font-semibold text-base">{title}</h2>
        </div>
      </Col>
      <Col xs={24}>
        <Form.Item label="Pilih Anggota" className="mb-0">
          <Select
            showSearch
            placeholder="Pilih Anggota"
            onChange={e => {
              const value = e.split(',');
              pushAnggota({
                key: value[0],
                value: value[1]
              });
            }}
            onSearch={e => onSearch(e, 'select')}
            disabled={isDetail}
          >
            {data?.map((item: UserInterface) => (
              <Option key={`${item.id},${item.name}`} className="capitalize">
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <h3 className="font-semibold text-sm pb-2 border-b border-b-grey3">
          {anggota.length} anggota
        </h3>
      </Col>
      <Col xs={24}>
        <Form.List name={customNameField}>
          {() => (
            <>
              {anggota.map((field: any, index: number) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  className="m-0 mb-4 w-full px-3 py-2 border border-grey3"
                >
                  <div className="flex justify-between items-center p-0">
                    <span>{field.value}</span>
                    <button
                      className="ml-7"
                      type="button"
                      onClick={() => removeAnggota(field.key)}
                      disabled={isDetail}
                    >
                      <Delete
                        set="bold"
                        primaryColor={colors.danger}
                        size={24}
                      />
                    </button>
                  </div>
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>
      </Col>
    </Row>
  );
};

export default DaftarAnggotaKoordinator;
