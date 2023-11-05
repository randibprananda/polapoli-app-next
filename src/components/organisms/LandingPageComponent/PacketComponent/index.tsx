import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';
import { PricingInterface } from '../../../../@types/Landing';
import { useProfile } from '../../../../swr';
import { currencyFormat } from '../../../../utils';
import { TCardPacket, TText, TTitle } from '../../../atoms';

export type PacketProps = {
  data: PricingInterface[];
  title: string;
  subTitle: string;
};

const PacketComponent: React.FC<PacketProps> = ({ data, title, subTitle }) => {
  const router = useRouter();
  const [cookies] = useCookies(['user']);

  return (
    <section className="h-full w-full border-box xl:px-36 lg:px-30 md:px-14 sm:px-8 px-8 pt-20 pb-28 transition-all duration-500 linear bg-light">
      <div className="content-3-7 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col text-center w-full mb-9">
            <TTitle size="3xl" text={title} customStyle="mb-4" />
            <TText
              color="grey"
              size="base"
              customStyle="mx-auto tracking-wide caption max-w-3xl mx-auto"
            >
              {subTitle}
            </TText>
          </div>
          <div className="flex flex-wrap">
            {data?.map((item: PricingInterface) => (
              <TCardPacket
                key={item.id}
                type={item.id === 2 ? 'primary' : 'white'}
                title={item.title}
                price={currencyFormat(item.price)}
                time={`${item.duration} bulan`}
                features={[item.feature]}
                onBuy={() =>
                  router.push(
                    cookies.user ? `/checkout/${item.id}` : `/auth/login`
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PacketComponent;
