import { Button, Table } from 'antd';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import { CardKemenangan } from '../../../atoms';
import Props from './cardDaftarParpolKemenangan.props';

const CardDaftarParpolKemenangan: React.FC<Props> = ({
  onClickEdit,
  data,
  columns,
  isDisable = false
}) => {
  return (
    <CardKemenangan
      title="Daftar Parpol"
      action={
        <Button
          className="ant-btn-success"
          size="middle"
          onClick={onClickEdit}
          disabled={isDisable}
        >
          <p className="flex justify-between items-center">
            <Edit set="light" size={16} primaryColor={colors.white} />{' '}
            <span className="ml-2">Tambah</span>
          </p>
        </Button>
      }
      content={
        <>
          <Table
            dataSource={data}
            columns={columns}
            scroll={{ x: 800, y: 500 }}
          />
        </>
      }
    />
  );
};

export default CardDaftarParpolKemenangan;
