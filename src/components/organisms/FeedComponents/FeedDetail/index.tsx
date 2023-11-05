import Image from 'next/image';
import React from 'react';
import { FeedInterface } from '../../../../@types/Feed';
import { dateFormat } from '../../../../utils';

const FeedDetail: React.FC<{ data: FeedInterface }> = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-lg">
      <div className="rounded-t-lg w-full h-96 object-cover relative">
        <Image
          src={data?.foto_feed}
          alt={data?.judul_feed}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="p-4 md:p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
          {data?.judul_feed}
        </h5>
        <span className="font-medium text-gray-1 mt-4">
          {dateFormat(data?.created_at, 'lll')}
        </span>
        <p className="mb-3 font-normal text-gray-1 leading-8 mt-4">
          {data?.isi}
        </p>
      </div>
    </div>
  );
};

export default FeedDetail;
