import React from 'react';

type TTextProps = {
  text?: string;
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  fontWeight?: 'normal' | 'medium' | 'semibold';
  color: 'black' | 'grey' | 'white';
  customStyle?: string;
};

export default TTextProps;
