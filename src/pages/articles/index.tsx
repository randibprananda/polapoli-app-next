import Head from 'next/head';
import {
  ArticlesComponent,
  LandingFooter,
  Spinner,
  TArticleTabs
} from '../../components';
import { Plain } from '../../layouts';
import { useArticleCategories, useArticles, useBeranda } from '../../swr';
import { usePagination } from '../../customHooks';
import { Pagination } from 'antd';
import { useState } from 'react';

const Artikel = () => {
  const [currentPage, onChangePagination] = usePagination(1);
  const { data: categories } = useArticleCategories(true);
  const { data } = useBeranda(true);
  const [activeTab, setActiceTab] = useState<string | number>('');
  const { data: articles, isLoading } = useArticles(
    true,
    activeTab,
    currentPage
  );

  const handleActiveTab = (val: any) => setActiceTab(val);

  return (
    <>
      <Head>
        <title>Artikel | PolaPoli</title>
      </Head>
      <main>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <TArticleTabs
              active={activeTab}
              data={categories?.data}
              onClick={handleActiveTab}
            />
            <ArticlesComponent data={articles?.data?.data} />
            <div className="articles-pagination flex justify-center items-center bg-light pt-6 pb-16">
              <Pagination
                total={articles?.data?.total}
                onChange={onChangePagination}
                current={currentPage}
              />
            </div>
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

Artikel.layout = Plain;

export default Artikel;
