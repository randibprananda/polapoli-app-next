import Head from 'next/head';
import {
  BannerComponent,
  CtaComponent,
  LandingFooter,
  PacketComponent,
  Spinner,
  TestimonialsComponent
} from '../components';
import { Plain } from '../layouts';
import { usePricing } from '../swr';
import PricingComponent from '../components/organisms/LandingPageComponent/PricingComponent';

const Harga = (props: any) => {
  const { data, isLoading } = usePricing(true);
  return (
    <>
      <Head>
        <title>Harga | PolaPoli</title>
      </Head>
      <main>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <BannerComponent
              title={data?.pricing_detail_title}
              subTitle={data?.pricing_detail_subtitle}
              imageSrc={data?.pricing_detail_picture}
            />
            <TestimonialsComponent
              title={data?.testimonial_title}
              data={data?.testimonial}
            />
            {/* <PacketComponent
              title={data?.pricing_title}
              subTitle={data?.pricing_subtitle}
              data={data?.pricing}
            /> */}
            <PricingComponent
              title="Daftar Paket Harga"
              subTitle="Perbedaan harga di bawah ini bergantung kepada jenis paket dan lamanya durasi yang anda pilih"
            />
            <CtaComponent
              title={data?.cta_title}
              subTitle={data?.cta_subtitle}
            />
            <LandingFooter
              description={data?.footer_desc}
              socialMedia={data?.social_media}
              contacts={data?.contact}
            />
          </>
        )}
      </main>
    </>
  );
};

Harga.layout = Plain;

export default Harga;
