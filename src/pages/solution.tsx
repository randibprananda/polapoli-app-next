import Head from 'next/head';
import {
  AdvantageComponent,
  ClientComponent,
  CtaComponent,
  LandingFooter,
  Spinner,
  TestimonialsComponent
} from '../components';
import { Plain } from '../layouts';
import { useSolution } from '../swr';

const Solusi = (props: any) => {
  const { data, isLoading } = useSolution(true);
  return (
    <>
      <Head>
        <title>Solusi | PolaPoli</title>
      </Head>
      <main>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
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

Solusi.layout = Plain;

export default Solusi;
