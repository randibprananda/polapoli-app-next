import Head from 'next/head';
import {
  AdvantageComponent,
  ClientComponent,
  CtaComponent,
  HeroComponent,
  LandingFooter,
  PacketComponent,
  Spinner,
  TestimonialsComponent,
  UspComponent
} from '../components';
import { Plain } from '../layouts';
import { useBeranda } from '../swr';
import PricingComponent from '../components/organisms/LandingPageComponent/PricingComponent';

const Index = () => {
  const { data, isLoading } = useBeranda(true);
  return (
    <>
      <Head>
        <title>Beranda | PolaPoli</title>
      </Head>
      <main>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <HeroComponent
              title={data?.hero_title}
              subTitle={data?.hero_subtitle}
              hero={data?.hero_picture}
            />
            <ClientComponent
              title={data?.solusi_title}
              subTitle={data?.solusi_subtitle}
              solutions={data?.solusi}
              clients={data?.client}
            />
            <UspComponent data={data?.usp} />
            <AdvantageComponent
              title={data?.layanan_title}
              data={data?.layanan}
            />
            <TestimonialsComponent
              title={data?.testimonial_title}
              data={data?.testimonial}
            />

            <PricingComponent
              title="Daftar Paket Harga"
              subTitle="Perbedaan harga di bawah ini bergantung kepada jenis paket dan lamanya durasi yang anda pilih"
            />
            {/* <PacketComponent
              title={data?.pricing_title}
              subTitle={data?.pricing_subtitle}
              data={data?.pricing}
            /> */}
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

Index.layout = Plain;

export default Index;
