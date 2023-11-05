import React from 'react';
import { Pie as APie } from '@ant-design/plots';
import { colors } from '../../../theme';

export type PieProps = {
  data: any;
  angleField?: string;
  colorField?: string;
};

const Pie: React.FC<PieProps> = ({
  data,
  angleField = 'total',
  colorField = 'paslon'
}) => {
  const config = {
    appendPadding: 10,
    data,
    angleField,
    colorField,
    color: [
      colors.primary,
      colors.info,
      colors.rose,
      colors.logan,
      colors.viola,
      colors.grey2,
      colors.success,
      colors.warning,
      colors.danger
    ],
    radius: 0.9,

    interactions: [
      {
        type: 'element-active'
      }
    ]
  };

  // eslint-disable-next-line no-use-before-define
  return <APie {...config} />;
};

export default Pie;
