import React from 'react';
import Props from './tTitle.props';

const TTitle: React.FC<Props> = ({
  tag = 'h1',
  text,
  children,
  color = 'black',
  size = '3xl',
  customStyle = '',
  weight = 'bold'
}) => {
  const content = text || children;
  const Tag = tag;

  const getColor = () => {
    if (color === 'black') return 'text-black';
    if (color === 'primary') return 'text-primary';
    if (color === 'white') return 'text-white';
    if (color === 'rose') return 'text-rose';
  };
  const getSize = () => {
    if (size === '3xl') return 'text-3xl lg:text-4xl';
    if (size === '4xl') return 'text-4xl';
    if (size === '2xl') return 'text-2xl';
    if (size === 'xl') return 'text-xl';
  };

  const getWeight = () => {
    if (weight === 'bold') return 'font-bold';
    if (weight === 'semibold') return 'font-semibold';
  };

  return (
    <Tag className={`${getColor()} ${getSize()} ${getWeight()} ${customStyle}`}>
      {content}
    </Tag>
  );
};

export default TTitle;
