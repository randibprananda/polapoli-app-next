import React from 'react';
import Props from './label.props';

const Label: React.FC<Props> = ({ text, type }) => {
  const getColor = () => {
    if (type === 'danger') {
      return 'text-danger';
    }

    if (type === 'info') {
      return 'text-black';
    }
  };

  const getBgColor = () => {
    if (type === 'danger') {
      return 'bg-danger-25';
    }

    if (type === 'info') {
      return 'bg-info-25';
    }
  };

  return (
    <div
      className={`rounded-lg flex justify-center items-center p-3 ${getBgColor()}`}
    >
      <p className={`font-medium text-xs ${getColor()}`}>{text}</p>
    </div>
  );
};

export default Label;
