import React from 'react';
import { currencyFormat } from '../../../utils';
import CardPacketProps from './cardPacket.props';

const CardPacket: React.FC<CardPacketProps> = ({
  title = 'Title',
  price = 1000
}) => {
  return (
    <div className="p-4 border border-grey3 bg-white">
      <h3 className="text-black text-xl font-bold mb-2">{title}</h3>
      <div>
        <p className="text-base font-semibold text-grey2">Harga</p>
        <span className="text-base font-bold text-rose">
          {currencyFormat(+price)}
        </span>
      </div>
    </div>
  );
};

export default CardPacket;
