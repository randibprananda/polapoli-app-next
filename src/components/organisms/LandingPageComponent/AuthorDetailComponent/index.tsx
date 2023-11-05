import React from 'react';
import { IlDefault } from '../../../../assets/img/landing';
import { checkBaseUrlImageLanding } from '../../../../utils';
import Props from './authorDetail.props';

const AuthorDetailComponent: React.FC<Props> = ({
  name,
  picture,
  description = ''
}) => {
  return (
    <section className="relative px-4 py-8 mx-auto md:px-6 max-w-screen-2xl lg:px-24 text-center mb-14">
      <div className="relative bg-primary rounded-2xl w-full h-52 md:h-64 mb-32 md:mb-36">
        <img
          className="rounded-full w-44 md:w-60 h-44 md:h-60 object-cover mx-auto translate-y-3/4 md:translate-y-1/2"
          src={picture ? checkBaseUrlImageLanding(picture) : IlDefault.src}
          alt={'alter'}
        />
      </div>

      <h1 className="text-primary font-bold text-4xl mb-7">{name}</h1>
      <h2 className="text-primary font-semibold text-xl mb-7">
        Deskripsi Penulis
      </h2>

      <p className=" px-8 sm:px-16 text-lg">{description}</p>
    </section>
  );
};

export default AuthorDetailComponent;
