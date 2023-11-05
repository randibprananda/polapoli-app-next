import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import useGetDivisionList from '../../../../swr/pricing/useGetDivisionList/index';
import useGetListPricing from '../../../../swr/pricing/useGetPricingList/index';
import { currencyFormat } from '../../../../utils';
import { Spinner, TText, TTitle } from '../../../atoms';
import TCardPricing from '../../../atoms/TCardPricing';

export type PacketProps = {
  title: string;
  subTitle: string;
};

export interface DivisonInterface {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PricingInterface {
  id: number;
  price: number;
  duration: string;
  title: string;
  package_type: number;
  features: {
    title: string;
    status: number;
  }[];
}

const PricingComponent: React.FC<PacketProps> = ({ title, subTitle }) => {
  const router = useRouter();
  const [cookies] = useCookies(['user']);
  const [tabPrice, setTabPrice] = useState(1);

  const getColor = (color: string) => {
    if (color === 'selected')
      return 'text-primary font-bold lg:border-r-4 lg:border-r-primary lg:border-b-0 lg:border-b-primary border-b-4 border-b-primary';
    if (color === 'unselected') return '';
  };

  const { data: divisionList, isLoading: isLoadingDivisionList } =
    useGetDivisionList(true);
  const { data: listPricing, isLoading: isLoadingListPricing } =
    useGetListPricing(true, tabPrice);

  return (
    <>
      <section className="w-full h-full px-8 pt-20 transition-all duration-500 bg-white border-box xl:px-36 lg:px-30 md:px-14 sm:px-8 pb-28 linear">
        <div className="overflow-hidden content-3-7">
          <div className="container mx-auto">
            <div className="flex flex-col w-full text-center justify-items-center mb-9">
              <TTitle size="3xl" text={title} customStyle="mb-4" />
              <TText
                color="grey"
                size="base"
                customStyle="mx-auto tracking-wide caption max-w-3xl mx-auto"
              >
                {subTitle}
              </TText>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:pr-10 lg:border-r-2 lg:border-r-logan ">
                <div className="flex flex-wrap items-center justify-center w-full gap-2 py-10 bg-flashWhite lg:flex-col lg:items-stretch lg:justify-between px-9 lg:space-y-6">
                  {!isLoadingDivisionList &&
                    divisionList.map((division: DivisonInterface) => (
                      <button
                        key={division.id}
                        onClick={() => setTabPrice(division.id)}
                        className={`lg:text-left text-center ${
                          tabPrice === division.id
                            ? getColor('selected')
                            : getColor('unselected')
                        }`}
                      >
                        {division.name}
                      </button>
                    ))}
                </div>
              </div>
              <div className="flex flex-col w-full col-span-6 px-8 md:flex-row gap-x-10">
                {isLoadingListPricing && <Spinner />}
                {!isLoadingListPricing &&
                  listPricing.map((pricing: PricingInterface) => {
                    const features: string[] = [];
                    const checked: number[] = [];

                    pricing.features.forEach(data => {
                      features.push(data.title);
                    });

                    pricing.features.forEach(data => {
                      checked.push(data.status);
                    });

                    return (
                      <TCardPricing
                        key={pricing.id}
                        type={pricing.package_type === 1 ? 'white' : 'primary'}
                        title={pricing.title}
                        packet={pricing.package_type}
                        checked={checked}
                        price={
                          pricing.price === 0
                            ? 'Diskusi Lebih Lanjut'
                            : currencyFormat(pricing.price)
                        }
                        time={
                          pricing.price === 0
                            ? ''
                            : pricing.duration?.toString() + ' Bulan'
                        }
                        features={features}
                        onBuy={() => {
                          window.open(
                            'https://api.whatsapp.com/send/?phone=6282220227464&text=Hallo, saya tertarik untuk pembelian paket Pola Poli ' +
                              pricing.title,
                            '_blank'
                          );
                          // router.push(cookies.user ? `/checkout/2` : `/auth/login`);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingComponent;
