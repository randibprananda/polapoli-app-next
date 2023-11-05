import { Button } from 'antd';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import { CardKemenangan } from '../../../atoms';
import Props from './cardKodeWarnaKemenangan.props';

const CardKodeWarnaKemenangan: React.FC<Props> = ({
  onClickEdit,
  tema_warna = '#C41141',
  isDisable = false
}) => {
  return (
    <CardKemenangan
      title="Tema"
      action={
        <Button
          className="ant-btn-success"
          size="middle"
          disabled={isDisable}
          onClick={onClickEdit}
        >
          <p className="flex justify-between items-center">
            <Edit set="light" size={16} primaryColor={colors.white} />{' '}
            <span className="ml-2">Edit</span>
          </p>
        </Button>
      }
      content={
        <div className="flex flex-row">
          <div
            className="w-14 h-14 rounded-lg"
            style={{
              background: tema_warna
            }}
          />
          <div className="ml-3">
            <span className="font-semibold text-xs">Kode Warna</span>
            <p className="font-semibold text-base">{tema_warna}</p>
          </div>
        </div>
      }
    />
  );
};

export default CardKodeWarnaKemenangan;
