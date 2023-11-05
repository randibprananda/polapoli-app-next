import Image from 'next/image';
import React from 'react';
import Props from './cardImageCaption.props';

const CardImageCaption: React.FC<Props> = ({
  src,
  caption,
  onClick = undefined
}) => {
  return (
    <div
      className="inline-block mx-2"
      tabIndex={0}
      aria-label="card image"
      onClick={onClick}
    >
      <figure className="w-full max-w-sm">
        <Image
          src={src}
          alt={caption}
          width={384}
          height={247}
          objectFit="cover"
          className={`rounded-2xl ${onClick && 'cursor-pointer'}`}
        />
        <figcaption className="mt-6 text-sm text-justify h-14 w-full line-clamp-3">
          {caption}
        </figcaption>
      </figure>
    </div>
  );
};

export default CardImageCaption;
