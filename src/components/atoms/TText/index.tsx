import React from 'react';
import Props from './tText.props';

const TText: React.FC<Props> = ({
  children,
  fontWeight,
  size,
  text,
  color,
  customStyle
}) => {
  const content = text || children;
  const getWeight = () => {
    if (fontWeight === 'normal') return 'font-normal';
    if (fontWeight === 'medium') return 'font-medium';
    if (fontWeight === 'semibold') return 'font-semibold';
  };

  const getSize = () => {
    if (size === 'xs') return 'text-xs';
    if (size === 'sm') return 'text-sm';
    if (size === 'base') return 'text-base';
    if (size === 'lg') return 'text-lg';
    if (size === 'xl') return 'text-xl';
  };

  const getColor = () => {
    if (color === 'black') return 'text-black';
    if (color === 'grey') return 'text-grey1';
    if (color === 'white') return 'text-white';
  };

  return (
    <p className={`${getColor()} ${getSize()} ${getWeight()} ${customStyle}`}>
      {content}
    </p>
  );
};

export default TText;
