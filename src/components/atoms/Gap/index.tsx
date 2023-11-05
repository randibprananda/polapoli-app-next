import React from 'react';

const Gap = ({ width, height }: { width: number; height: number }) => {
  return <div style={{ width, height, display: 'inline-block' }} />;
};

export default Gap;
