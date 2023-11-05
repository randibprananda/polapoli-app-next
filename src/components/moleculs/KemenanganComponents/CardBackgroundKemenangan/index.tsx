import { Button, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import Props from './cardBackgroundKemenangan.props';

const CardBackgroundKemenangan: React.FC<Props> = ({
  backgroundSrc = null,
  onClickEdit = () => {},
  isDisable = false
}) => {
  return (
    <div
      className="p-4 sm:px-6 sm:py-7 rounded-xl h-80 bg-cover bg-no-repeat bg-center"
      style={{
        [backgroundSrc ? 'backgroundImage' : 'backgroundColor']: backgroundSrc
          ? `url(${backgroundSrc})`
          : colors.primary
      }}
    >
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center">
        <Title level={3} className="text-base text-white">
          Background
        </Title>
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
      </div>
    </div>
  );
};

export default CardBackgroundKemenangan;
