import React from 'react';
import Props from './statisticBadge.props';

const StatisticBadge: React.FC<Props> = ({ variant, title, value }) => {
  const getVariant = () => {
    if (variant === 'primary') return 'bg-primary text-white';
    if (variant === 'secondary') return 'bg-white text-primary';
  };
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-4 px-6 rounded-md shadow-sm w-full max-w-[140px] mb-4 ${getVariant()}`}
    >
      <span className=" text-xs font-medium">{title}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
};

export default StatisticBadge;
