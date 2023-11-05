import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { colors } from '../../../theme';

const Spinner = () => {
  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: 36, color: colors.primary }} spin />
      }
    />
  );
};

export default Spinner;
