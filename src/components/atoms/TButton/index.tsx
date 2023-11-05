import React from 'react';
import Props from './tButton.props';

const TButton: React.FC<Props> = ({
  type = 'primary',
  fontWeight = 'normal',
  textSize = 'base',
  text,
  customStyle,
  block = false,
  onClick = () => {},
  ...props
}) => {
  const baseCss =
    'items-center py-3 px-8 focus:outline-none rounded-xl transition-all duration-150';

  const getColor = () => {
    if (type === 'primary') return 'border-0 bg-primary text-white';
    if (type === 'rose') return 'border-0 bg-rose text-white';
    if (type === 'secondary')
      return 'bg-white text-primary border border-primary hover:bg-primary hover:text-white';
    if (type === 'grey') return 'border-0 bg-grey3 text-black';
    if (type === 'white') return 'border-0 bg-white text-primary';
  };

  const getWeight = () => {
    if (fontWeight === 'normal') return 'font-normal';
    if (fontWeight === 'medium') return 'font-medium';
    if (fontWeight === 'semibold') return 'font-semibold';
  };

  const getSize = () => {
    if (textSize === 'xs') return 'text-xs';
    if (textSize === 'sm') return 'text-sm';
    if (textSize === 'base') return 'text-base';
    if (textSize === 'lg') return 'text-lg';
    if (textSize === 'xl') return 'text-xl';
  };

  const getBlock = () => (block ? 'w-full' : '');
  return (
    <button
      className={`${baseCss} ${getSize()} ${getWeight()} ${getBlock()} ${getColor()} ${customStyle}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default TButton;
