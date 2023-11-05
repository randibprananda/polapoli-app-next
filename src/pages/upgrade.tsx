import Head from 'next/head';
import { PacketComponent, Spinner } from '../components';
import { Plain } from '../layouts';
import { usePricing } from '../swr';

const Upgrade = (props: any) => {
  const { data, isLoading } = usePricing(true);
  return (
    <>
      <Head>
        <title>Harga | PolaPoli</title>
      </Head>
      <main>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <PacketComponent
              title={data?.pricing_title}
              subTitle={data?.pricing_subtitle}
              data={data?.pricing}
            />
          </>
        )}
      </main>
    </>
  );
};

Upgrade.layout = Plain;

export default Upgrade;
