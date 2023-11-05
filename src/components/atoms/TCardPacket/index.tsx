import React from 'react';
import TButton from '../TButton';
import TFeatureItem from '../TFeatureItem';
import TTitle from '../TTitle';
import Props from './tCardPacket.props';

const TCardPacket: React.FC<Props> = ({
  title,
  price,
  time,
  features,
  type = 'white',
  onBuy
}) => {
  if (type === 'primary') {
    return (
      <div className="sm:p-4 px-0 py-4 lg:w-1/3 mx-auto card">
        <div className="h-full py-8 px-11 rounded-2xl bg-primary card-outline flex flex-col justify-between relative overflow-hidden">
          <div>
            <TTitle
              color="white"
              size="2xl"
              weight="semibold"
              text={title}
              customStyle="tracking-wide mb-3"
            />
            <p className="text-2xl tracking-wide flex items-center font-semibold text-medium-black mb-10 text-white">
              <span>{price}</span>
              <span className="text-base ml-2.5 font-normal price-month price-month">
                /{time}
              </span>
            </p>
            <div className="price-list-3-7">
              {features.map((feature: string, index: number) => (
                <TFeatureItem
                  checked={true}
                  feature={feature}
                  key={index}
                  color="white"
                />
              ))}
            </div>
          </div>
          <TButton type="rose" block text="Beli Paket" onClick={onBuy} />
        </div>
      </div>
    );
  }
  return (
    <div className="sm:p-4 px-0 py-4 lg:w-1/3 mx-auto card">
      <div className="h-full py-8 px-11 rounded-2xl bg-white card-outline flex flex-col justify-between relative overflow-hidden">
        <div>
          <TTitle
            size="2xl"
            weight="semibold"
            text={title}
            customStyle="tracking-wide mb-3"
          />
          <p className="text-2xl tracking-wide flex items-center font-semibold text-medium-black mb-10">
            <span>{price}</span>
            <span className="text-base ml-2.5 font-normal price-month price-month">
              /{time}
            </span>
          </p>
          <div className="price-list-3-7">
            {features.map((feature: string, index: number) => (
              <TFeatureItem checked={true} feature={feature} key={index} />
            ))}
          </div>
        </div>
        <TButton block text="Beli Paket" onClick={onBuy} />
      </div>
    </div>
  );
};

export default TCardPacket;
