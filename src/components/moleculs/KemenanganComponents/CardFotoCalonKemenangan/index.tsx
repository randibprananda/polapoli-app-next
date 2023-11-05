import { Button } from 'antd';
import Image from 'next/image';
import React from 'react';
import { Edit } from 'react-iconly';
import { IcImageDefault } from '../../../../assets';
import { colors } from '../../../../theme';
import Props from './cardFotoCalonKemenangan.props';

const CardFotoCalonKemenangan: React.FC<Props> = ({
  foto_calon = null,
  onClickEdit,
  isDisable = false
}) => {
  return (
    <div className="p-6 sm:px-6 sm:py-7  relative h-96">
      <div className="absolute inset-0 bg-white rounded-xl">
        <Image
          src={foto_calon ? foto_calon : IcImageDefault}
          alt="foto paslone"
          objectFit="cover"
          layout="fill"
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-start sm:justify-end items-start sm:items-center">
        <Button
          className="ant-btn-success"
          size="middle"
          onClick={onClickEdit}
          disabled={isDisable}
        >
          <p className="flex justify-between items-center">
            <Edit set="light" size={16} primaryColor={colors.white} />{' '}
            <span className="ml-2">Edit</span>
          </p>
        </Button>
      </div>
    </div>
  );
};

export default CardFotoCalonKemenangan;
