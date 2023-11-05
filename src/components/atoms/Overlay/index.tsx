import React from 'react';
import Props from './overlay.props';

const Overlay: React.FC<Props> = ({ open, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      aria-label="overlay"
      className={`${
        open ? 'block' : 'hidden'
      } sm:hidden fixed inset-0 bg-black opacity-40 z-40`}
    />
  );
};

export default Overlay;
