import React from 'react';
import Props from './tCardClient.props';

const TCardSolution: React.FC<Props> = ({ icon, description, title }) => {
  return (
    <div className="flex flex-col items-center item-size md:items-baseline w-full max-w-xs mx-auto">
      {icon}
      <div className="mt-6 mb-2 text-lg font-semibold text-dark-1">{title}</div>
      <p className="text-base font-medium text-center break-words md:text-left text-nogrey">
        {description}
      </p>
    </div>
  );
};

export default TCardSolution;
