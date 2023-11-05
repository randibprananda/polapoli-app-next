import { Button } from 'antd';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import { CardKemenangan } from '../../../atoms';
import Props from './cardVisiKemenangan.props';

const CardVisiKemenangan: React.FC<Props> = ({
  onClickEdit = () => {},
  visi = null,
  isDisable = false
}) => {
  return (
    <CardKemenangan
      title="Visi"
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
        <p className="font-medium text-sm text-justify">{visi || '-'}</p>
      }
    />
  );
};

export default CardVisiKemenangan;
