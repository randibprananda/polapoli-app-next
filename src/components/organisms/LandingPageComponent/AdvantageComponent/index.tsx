import React from 'react';
import { ServiceInterface } from '../../../../@types/Landing';
import { IlDefault } from '../../../../assets/img/landing';
import { checkBaseUrlImageLanding } from '../../../../utils';
import { TCardAdvantage, TTitle } from '../../../atoms';

export type AdvantageProps = {
  data: any[];
  title: string;
};

const AdvantageComponent: React.FC<AdvantageProps> = ({ data, title }) => {
  return (
    <section className="h-full w-full border-box py-20 lg:px-32 px-8 bg-white">
      <div className="content-7-2">
        <div className="text-center lg:mb-20 mb-12">
          <TTitle
            tag="h3"
            color="primary"
            size="4xl"
            customStyle="mb-3 title-text max-w-3xl mx-auto"
          >
            {title}
          </TTitle>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-none xl:gap-24 lg:gap-12 gap-8 flex justify-center">
          {data?.map((item: ServiceInterface) => (
            <TCardAdvantage
              key={item.id}
              img={checkBaseUrlImageLanding(item.picture)}
              alt={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantageComponent;
