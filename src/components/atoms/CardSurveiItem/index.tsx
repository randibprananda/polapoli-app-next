import Image from 'next/image';
import React from 'react';
import { IlPattern } from '../../../assets';
import Props from './cardSurveiItem.props';

const CardSurveiItem: React.FC<Props> = ({
  title,
  daerah,
  pembukaan,
  penutupan,
  totalResponden,
  onClick = () => {}
}) => {
  return (
    <div
      className="relative rounded-xl bg-primary overflow-hidden cursor-pointer"
      aria-label="card survei"
      onClick={onClick}
    >
      <div className="absolute indent-0 ">
        <Image
          src={IlPattern}
          alt="background"
          width={534}
          height={194}
          className="rounded-xl"
          objectFit="cover"
        />
      </div>
      <div className="py-10 px-6">
        <h3 className="text-white text-4xl font-bold mb-3">{title}</h3>
        <p className="text-xl font-medium text-white mb-3">
          {daerah} | {pembukaan} - {penutupan}
        </p>
        <span className="text-xl font-bold text-rose">
          {totalResponden} Responden
        </span>
      </div>
    </div>
  );
};

export default CardSurveiItem;
