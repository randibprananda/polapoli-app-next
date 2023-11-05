import Image from 'next/image';
import React from 'react';
import { IlCampaign } from '../../../assets';
import { API_BACKEND_HOST } from '../../../config';
import { checkBaseUrlImage, relawanNameParse } from '../../../utils';
import Props from './relawanItem.props';

const RelawanItem: React.FC<Props> = ({ image, name, ...props }) => {
  return (
    <button className="flex items-center  mb-4" {...props}>
      {image ? (
        <div
          className="flex justify-center items-center rounded-lg mr-3 border-black"
          style={{
            borderWidth: 0.1
          }}
        >
          <Image
            src={checkBaseUrlImage(image)}
            height={44}
            width={44}
            alt={`image of ${name}`}
            quality={85}
            objectFit="cover"
            className=" rounded-lg border"
          />
        </div>
      ) : (
        <div className="mr-3 bg-rose flex justify-center items-center text-white rounded-lg w-11 h-11 font-medium ">
          {relawanNameParse(name)}
        </div>
      )}
      <p className="font-semibold text-sm">{name}</p>
    </button>
  );
};

export default RelawanItem;
