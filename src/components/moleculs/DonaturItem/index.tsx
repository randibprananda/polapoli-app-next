import Image from 'next/image';
import React from 'react';
import { IcUserDefault } from '../../../assets';
import { RenderIf } from '../../../utils';

export type DonaturItemProps = {
  name: string;
  date?: string;
  amount: string;
  message?: string;
};

const DonaturItem: React.FC<DonaturItemProps> = ({
  name,
  date,
  amount,
  message
}) => {
  return (
    <div className="bg-white mb-4 md:mb-6 rounded-lg p-4 max-w-2xl mx-auto flex justify-between">
      <div className="content">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-black">{name}</h3>
          <span className="text-xs text-grey1 font-medium">{date}</span>
        </div>
        <span className="text-base text-primary font-bold my-1">{amount}</span>
        <RenderIf isTrue={!!message}>
          <p className="text-grey1 text-xs font-medium text-justify">
            {message}
          </p>
        </RenderIf>
      </div>
    </div>
  );
};

export default DonaturItem;
