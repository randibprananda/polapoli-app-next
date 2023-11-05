import React from 'react';

type TTitleProps = {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text?: string;
  children?: React.ReactNode;
  color?: 'black' | 'primary' | 'white' | 'rose';
  size?: '3xl' | '4xl' | '2xl' | 'xl';
  customStyle?: string;
  weight?: 'bold' | 'semibold';
};

export default TTitleProps;
