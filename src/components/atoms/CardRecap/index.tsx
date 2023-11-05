import React from 'react';
import { Card } from 'antd';
import Props from './cardRecap.props';

const CardRecap: React.FC<Props> = ({ icon, title, total }) => {
  return (
    <Card className="w-full inline-block mb-3 md:mr-4 pb-1 px-2">
      {icon}
      <p className="text-sm font-normal text-grey1 mt-2 mb-1">{title}</p>
      <span className="font-medium text-2xl">{total}</span>
    </Card>
  );
};

export default CardRecap;
