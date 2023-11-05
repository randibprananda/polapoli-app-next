import { Button } from 'antd';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import { CardKemenangan } from '../../../atoms';
import Props from './misi.props';

const CardMisiKemenangan: React.FC<Props> = ({
  misi_paslons = null,
  onClickEdit = () => {},
  isDisable = false
}) => {
  return (
    <CardKemenangan
      title="Misi"
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
        <ul className="list-decimal px-5">
          {misi_paslons?.map((item: any, index: number) => (
            <li key={index} className="text-sm font-medium mb-2">
              {item.misi}
            </li>
          ))}
        </ul>
      }
    />
  );
};

export default CardMisiKemenangan;
