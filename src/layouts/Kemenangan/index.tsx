import Head from 'next/head';
import { KemenanganNavbar } from '../../components';

const KemenanganLayout = (props: any) => {
  return (
    <>
      <Head>
        <title>Web Kemenangan</title>
      </Head>
      <KemenanganNavbar />
      <main>{props.children}</main>
    </>
  );
};

export default KemenanganLayout;
