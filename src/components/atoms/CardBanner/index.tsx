import Image from 'next/image';
import React from 'react';
import { IlHeaderSoal, IlPattern } from '../../../assets';
import Props from './cardBanner.props';

const CardBanner: React.FC<Props> = ({
  background = 'bg-primary',
  content = <div>Content</div>,
  image,
  maxWidth = '100%'
}) => {
  return (
    <div
      className={`relative flex flex-col-reverse md:flex-row justify-between items-center rounded-xl ${background} overflow-hidden`}
      aria-label="Banner"
      style={{ maxWidth }}
    >
      <div className="md:block absolute top-0 bottom-0 right-0 hidden">
        <Image
          src={IlPattern}
          alt="background"
          width={1234}
          height={494}
          className="rounded-xl"
          objectFit="cover"
        />
      </div>
      <div className="px-6 py-10">{content}</div>
      <div className="px-6 py-0">
        <Image src={image} alt="Illustration" width={215} height={124} />
      </div>
    </div>
  );
};

export default CardBanner;
