import Head from 'next/head';
import { FAQComponent, LandingFooter, Spinner } from '../components';
import { Plain } from '../layouts';
import { useHelp } from '../swr';

const Bantuan = (props: any) => {
  const { data, isLoading } = useHelp(true);
  return (
    <>
      <Head>
        <title>Bantuan | PolaPoli</title>
      </Head>
      <main>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <FAQComponent data={data?.faq} />
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

Bantuan.layout = Plain;

export default Bantuan;
