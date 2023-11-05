import { Button } from 'antd';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import { CardKemenangan, Gap, TextWithLabel } from '../../../atoms';
import Props from './cardContactPersonKemenangan.props';

const CardContactPersonKemenangan: React.FC<Props> = ({
  onClickEdit = () => {},
  alamat = null,
  email = null,
  telepon = null,
  whatsapp = null,
  isDisable = false
}) => {
  return (
    <CardKemenangan
      title="Contact Person"
      action={
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
      }
      content={
        <div>
          <TextWithLabel label="Alamat" text={alamat || '-'} />
          <Gap height={16} width={16} />
          <TextWithLabel label="Email" text={email || '-'} />
          <Gap height={16} width={16} />
          <TextWithLabel label="Telepon" text={telepon || '-'} />
          <Gap height={16} width={16} />
          <TextWithLabel label="Whatsapp" text={whatsapp || '-'} />
        </div>
      }
    />
  );
};

export default CardContactPersonKemenangan;
