import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Plain } from '../../layouts';
import { FeedDetail, LandingFooter, Spinner } from '../../components';
import { getWindowLastPath } from '../../utils';
import { useBeranda, useFeedDetail } from '../../swr';
import { Col, Row } from 'antd';

const FeedDetailPage = () => {
  const [id, setId] = useState<any>(0);

  const { data: feed, isLoading } = useFeedDetail(true, id);
  const { data } = useBeranda(true);

  useEffect(() => {
    setId(getWindowLastPath());
  }, []);

  return (
    <>
      <Head>
        <title>Feed | PolaPoli</title>
      </Head>
      <section className="bg-light">
        <main className="flex flex-col gap-12 px-4 py-8 mx-auto md:px-6 max-w-screen-2xl lg:px-24">
          <Row gutter={[35, 24]}>
            {isLoading ? (
              <div className="flex justify-center items-center w-full h-96">
                <Spinner />
              </div>
            ) : (
              <>
                <Col xs={24} lg={16} xl={17}>
                  <FeedDetail data={feed?.data} />
                </Col>
              </>
            )}
          </Row>
        </main>
      </section>
      <LandingFooter
        description={data?.footer_desc}
        socialMedia={data?.social_media}
        contacts={data?.contact}
      />
    </>
  );
};

FeedDetailPage.layout = Plain;

export default FeedDetailPage;
