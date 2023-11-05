import Image from 'next/image';
import React from 'react';
import { IlPaslonDummy } from '../../../assets';
import Props from './cardPaslon.props';

const CardPaslon: React.FC<Props> = ({
  number = 0,
  image = IlPaslonDummy,
  name = 'name',
  type = 'jenis pencalonan'
}) => {
  return (
    <div className="card-paslon w-full inline-block bg-white rounded-xl p-6 sm:mr-4 mb-4">
      <span className="card-paslon__header inline-block w-full text-center font-medium text-4xl pb-2 border-b border-b-grey2 mb-3">
        {number}
      </span>
      <div className="pt-3 w-full h-80 relative object-cover overflow-hidden rounded-xl">
        <Image src={image} layout="fill" alt="Paslon" objectFit="cover" />
      </div>
      <div className="text-center pt-3">
        <span className="text-grey1 text-sm">{type}</span>
        <p className="text-2xl font-semibold mt-1">{name}</p>
      </div>
    </div>
  );
};

export default CardPaslon;
