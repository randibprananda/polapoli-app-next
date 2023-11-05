import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { IlChart, IlHero } from '../../../../assets/img/landing';
import { checkBaseUrlImageLanding } from '../../../../utils';
import { TButton, TText, TTitle } from '../../../atoms';

export type HeroProps = {
  title: string;
  subTitle: string;
  hero: string;
};

const HeroComponent: React.FC<HeroProps> = ({ title, subTitle, hero }) => {
  const router = useRouter();
  return (
    <section className="h-full w-full border-box transition-all duration-500 linear bg-light">
      <div className="header-6-1 sticky">
        <div className="">
          <div className="mx-auto flex pt-7 pb-16 lg:pb-20 xl:px-36 lg:px-28 md:px-16 sm:px-8 px-8 relative lg:flex-row flex-col">
            <div className="lg:flex-grow lg:w-1/2 flex flex-col lg:items-start lg:justify-center lg:text-left mb-3 md:mb-12 lg:mb-0 items-center text-center z-40 text">
              <TTitle customStyle="pt-14">{title}</TTitle>
              <TText
                color="grey"
                size="sm"
                fontWeight="medium"
                customStyle="leading-7 my-8"
              >
                {subTitle}
              </TText>
              <TButton
                text="Daftar Sekarang"
                type="primary"
                textSize="sm"
                fontWeight="semibold"
                customStyle="py-4 px-10"
                onClick={() => router.push('/auth/register')}
              />
            </div>

            <div className="w-full lg:w-1/2 text-center lg:justify-start justify-center flex">
              <img
                className="lg:absolute relative lg:right-0 img-hero"
                id="hero-header-4-1"
                src={checkBaseUrlImageLanding(hero) || IlHero.src}
                alt=""
              />
              <div
                className="container absolute lg:left-0 left-28 lg:relative md:flex hidden flex-wrap items-start justify-start"
                style={{ width: 212 }}
              >
                <div className="card-header rounded-3xl flex flex-col md:ml-auto w-full mt-10 md:mt-0 pt-4 px-7 pb-5 bg-white">
                  <p className="pb-7 font-semibold text-black text-center">
                    Perhitungan Suara
                  </p>
                  <Image
                    className=""
                    src={IlChart.src}
                    alt="icon chart"
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
