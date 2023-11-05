import { Image } from 'antd';
import React from 'react';

export type TFeatureItemProps = {
  checked: Boolean;
  feature: string;
  color?: 'white' | 'black';
};

const TFeatureItem: React.FC<TFeatureItemProps> = ({
  checked,
  feature,
  color = 'black'
}) => {
  const getColor = () => {
    if (color === 'white') return 'text-white';
    if (color === 'black') return 'text-black';
  };
  return (
    <p
      className={`flex tracking-wide items-center text-sm mb-7 check-3-7 ${getColor()}`}
    >
      <span className="inline-flex items-center justify-center flex-shrink-0 w-4 h-4 mr-3">
        {checked === true ? (
          <Image src="/checked.png" alt="me" width="20" height="20" />
        ) : (
          <Image src="/unchecked.png" alt="me" width="20" height="20" />
        )}
      </span>
      {feature}
    </p>
  );
};

export default TFeatureItem;
