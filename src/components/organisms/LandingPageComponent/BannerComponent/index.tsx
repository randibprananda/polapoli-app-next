import React from 'react';
import { IlDefault } from '../../../../assets/img/landing';
import { checkBaseUrlImageLanding } from '../../../../utils';
import { TText, TTitle } from '../../../atoms';

export type BannerProps = {
  title: string;
  subTitle: string;
  imageSrc: string;
  reverse?: boolean;
  titleColor?: 'black' | 'primary' | 'white' | 'rose';
};

const BannerComponent: React.FC<BannerProps> = ({
  title,
  subTitle,
  imageSrc,
  reverse = false,
  titleColor = 'black'
}) => {
  return (
    <section className="bg-white">
      <main className="flex flex-col gap-12 px-4 py-20 mx-auto md:px-6 max-w-screen-2xl lg:px-24">
        <div className="grid items-center gap-20 md:grid-cols-12 lg:gap-0">
          {!reverse ? (
            <>
              <div className="md:col-span-10 lg:col-span-6">
                <img
                  className="mx-auto"
                  src={checkBaseUrlImageLanding(imageSrc) || IlDefault.src}
                  width="80%"
                  alt={title}
                />
              </div>
              <div className="lg:col-span-6 md:col-span-10 lg:pr-16">
                <div className="flex flex-col gap-5">
                  <TTitle size="3xl" text={title} color={titleColor} />
                  <TText
                    color="grey"
                    size="sm"
                    fontWeight="medium"
                    customStyle="leading-8"
                  >
                    {subTitle}
                  </TText>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-10 lg:col-span-6">
                <div className="flex flex-col gap-5">
                  <TTitle size="3xl" text={title} color={titleColor} />
                  <TText
                    color="grey"
                    size="sm"
                    fontWeight="medium"
                    customStyle="leading-8"
                  >
                    {subTitle}
                  </TText>
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-10 lg:pr-16">
                <img
                  className="mx-auto"
                  src={imageSrc}
                  // src={checkBaseUrlImageLanding(imageSrc) || IlDefault.src}
                  width="80%"
                  alt={title}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </section>
  );
};

export default BannerComponent;
