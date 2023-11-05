import Image from 'next/image';
import React from 'react';
import { RenderIf } from '../../../utils';
import { TRating, TText, TTitle } from '../../atoms';
import Props from './tCardTestimonial.props';

const TCardTestimonial: React.FC<Props> = ({
  img,
  name,
  profession,
  rating = null,
  testimonial
}) => {
  return (
    <div className="relative inline-flex flex-col items-center py-16 bg-white mr-7 px-14 rounded-3xl w-max md:mx-4">
      <div className="absolute top-0 z-10 -mt-5 left-14">
        <svg
          width="71"
          height="44"
          viewBox="0 0 71 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7462 0.899991H34.0662L15.1662 43.74H0.766249L11.7462 0.899991Z"
            fill="#FB3B6F"
          />
          <path
            d="M48.14 0.899991H70.46L51.56 43.74H37.16L48.14 0.899991Z"
            fill="#FB3B6F"
            fillOpacity="0.5"
          />
        </svg>
      </div>
      <div className="mb-7">
        <Image
          src={img}
          alt={`testi ${name}`}
          className="object-cover rounded-full"
          width="168"
          height="168"
        />{' '}
      </div>
      <TTitle
        text={name}
        size="xl"
        weight="semibold"
        color="black"
        customStyle="text-dark-1"
      />
      <TText
        text={profession}
        size="base"
        color="black"
        fontWeight="medium"
        customStyle="w-64 text-center"
      />
      <RenderIf isTrue={!!rating}>
        <TRating total={rating || 0} />
      </RenderIf>
      <TText
        text={testimonial}
        size="base"
        color="black"
        fontWeight="medium"
        customStyle="w-64 text-center"
      />
    </div>
  );
};

export default TCardTestimonial;
