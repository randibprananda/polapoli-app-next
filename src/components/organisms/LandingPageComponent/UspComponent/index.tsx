import React from 'react';
import { UspInterface } from '../../../../@types/Landing';
import BannerComponent from '../BannerComponent';

export type UspItemProps = {
  data: any[];
};

const UspComponent: React.FC<UspItemProps> = ({ data }) => {
  return (
    <section className="bg-white">
      {data?.map((item: UspInterface, index: number) => (
        <BannerComponent
          key={item.id}
          title={item?.title}
          imageSrc={item?.picture}
          subTitle={item?.description}
          reverse={index === 1 || index % 2 !== 0}
          titleColor="rose"
        />
      ))}
    </section>
  );
};

export default UspComponent;
