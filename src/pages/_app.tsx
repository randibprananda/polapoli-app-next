import Head from 'next/head';
import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { UserProvider } from '../context/UserContext';
import '../styles/styles.scss';
import '../styles/template.css';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GTAG_KEY } from '../config';
import { pageView } from '../utils/google-analytics';

const MyApp: React.FC<any> = ({ Component, pageProps }) => {
  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: any) => {
  //     pageView(url)
  //   }

  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  const Layout =
    Component.layout || (({ children }: { children: any }) => <>{children}</>);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-logo.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-logo.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicon-logo.png" />
        <meta name="theme-color" content="#ffffff"></meta>
        <title>PolaPoli</title>
      </Head>
      <UserProvider>
        <Layout>
          <CookiesProvider>
            {/* <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_KEY}`} strategy='afterInteractive' />
            <Script id="google-analytics" strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GTAG_KEY}');
              `}
            </Script> */}
            <Component {...pageProps} />
          </CookiesProvider>
        </Layout>
      </UserProvider>
    </React.Fragment>
  );
};

export default MyApp;
