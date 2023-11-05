import Image from 'next/image';
import React from 'react';
import { API_BACKEND_HOST } from '../../../config';
import { checkBaseUrlImage } from '../../../utils';
import Props from './cardTimRelawan.props';

const CardTimRelawan: React.FC<Props> = ({ data, ...props }) => {
  return (
    <button
      className="inline-block rounded-3xl shadow-sm relative w-full max-w-xs cursor-pointer transform hover:-translate-y-2 duration-200 transition-all"
      {...props}
    >
      <Image
        src={checkBaseUrlImage(data.photo_tim_relawan)}
        alt={data.nama_tim_relawan}
        objectFit="cover"
        width={300}
        height={200}
        className="rounded-t-xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.05) 100%)'
        }}
      />
      <div className="px-6 py-3 bg-white rounded-b-3xl text-left">
        {/* <span className="font-medium text-xs text-grey1">500 anggota</span> */}
        <p className="font-bold text-lg">{data.nama_tim_relawan}</p>
      </div>
    </button>
  );
};

export default React.memo(CardTimRelawan);
