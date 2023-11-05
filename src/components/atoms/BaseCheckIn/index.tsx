import React from 'react';
import { TimeCircle } from 'react-iconly';

export type BaseCheckInProps = {
  type?: 'in' | 'out';
  time?: string;
};

const BaseCheckIn: React.FC<BaseCheckInProps> = ({
  type = 'in',
  time = '-'
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-start">
        <TimeCircle size={24} set="light" />
        <span className="text-primary font-bold text-base pl-3">
          {type === 'in' ? 'Check In' : 'Check Out'}
        </span>
      </div>
      <span className="text-primary font-bold text-lg mt-3">{time}</span>
    </div>
  );
};

export default BaseCheckIn;
