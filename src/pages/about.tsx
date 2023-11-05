import Head from 'next/head';
import {
  AdvantageComponent,
  BannerComponent,
  ClientComponent,
  CtaComponent,
  LandingFooter,
  Spinner,
  TestimonialsComponent
} from '../components';
import { Plain } from '../layouts';
import { useAboutUs } from '../swr';

const TentangKami = (props: any) => {
  const { data, isLoading } = useAboutUs(true);
  return (
    <>
      <Head>
        <title>Tentang Kami | PolaPoli</title>
      </Head>
      <main>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <BannerComponent
              title={data?.about_detail_title}
              subTitle={data?.about_detail_subtitle}
              imageSrc={data?.about_detail_picture}
            />
            <ClientComponent
              title={data?.solusi_title}
              subTitle={data?.solusi_subtitle}
              solutions={data?.solusi}
              clients={data?.client}
            />
            <AdvantageComponent
              title={data?.layanan_title}
              data={data?.layanan}
            />
            <TestimonialsComponent
              title={data?.testimonial_title}
              data={data?.testimonial}
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

TentangKami.layout = Plain;

export default TentangKami;
