import { Button } from 'antd';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import { CardKemenangan } from '../../../atoms';
import Props from './proker.props';

const CardProkerKemenangan: React.FC<Props> = ({
  proker_paslons = null,
  onClickEdit = () => {},
  isDisable = false
}) => {
  return (
    <CardKemenangan
      title="Program Kerja"
      action={
        <Button
          disabled={isDisable}
          className="ant-btn-success"
          size="middle"
          onClick={onClickEdit}
        >
          <p className="flex justify-between items-center">
            <Edit set="light" size={16} primaryColor={colors.white} />{' '}
            <span className="ml-2">Edit</span>
          </p>
        </Button>
      }
      content={
        <ul className="list-decimal px-5">
          {proker_paslons?.map((item: any, index: number) => (
            <li key={index} className="text-sm font-medium mb-2">
              {item?.isi_proker}
            </li>
          ))}
        </ul>
      }
    />
  );
};

export default CardProkerKemenangan;
