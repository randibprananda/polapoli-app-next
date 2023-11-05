import Title from 'antd/lib/typography/Title';
import React from 'react';
import Gap from '../Gap';
import Props from './cardKemenangan.props';

const CardKemenangan: React.FC<Props> = ({ action, content, title }) => {
  return (
    <div className="flex flex-col bg-white p-4 sm:px-6 sm:py-7 rounded-xl">
      <div
        className={`flex flex-col sm:flex-row justify-start ${
          action && 'sm:justify-between'
        } items-start sm:items-center`}
      >
        <Title level={3} className="text-base mb-0 font-bold">
          {title}
        </Title>
        {action}
      </div>
      <Gap height={16} width={20} />
      <div>{content}</div>
    </div>
  );
};

export default CardKemenangan;
