import Image from 'next/image';
import React from 'react';
import { IcNull } from '../../../assets';

const NotFound = () => {
  return (
    <div className="w-full h-96 flex justify-center items-center">
      <Image src={IcNull} alt="Not found" />
    </div>
  );
};

export default NotFound;
