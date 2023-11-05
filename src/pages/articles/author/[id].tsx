import { Pagination } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  ArticlesComponent,
  AuthorDetailComponent,
  LandingFooter,
  Spinner
} from '../../../components';
import { usePagination } from '../../../customHooks';
import { Plain } from '../../../layouts';
import { useArticles, useAuthorDetail, useBeranda } from '../../../swr';
import { getWindowLastPath } from '../../../utils';

const AuthorPage = () => {
  const [id, setId] = useState<any>(0);
  const [currentPage, onChangePagination] = usePagination(1);
  const { data: author, isLoading } = useAuthorDetail(true, id);
  const { data } = useBeranda(true);

  useEffect(() => {
    setId(getWindowLastPath());
  }, []);
  return (
    <>
      <Head>
        <title>Author Artikel | PolaPoli</title>
      </Head>
      <main className="bg-light min-h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <AuthorDetailComponent
              name={author?.data?.name}
              picture={author?.data?.picture}
              description={author?.data?.description}
            />
            <ArticlesComponent
              data={
                author?.data?.news?.length > 5
                  ? author?.data?.news?.slice(0, 5)
                  : author?.data?.news
              }
            />

            <Link href="/articles">
              <a className="inline-block w-full text-center text-primary font-bold mt-3 mb-16">
                Lainnya
              </a>
            </Link>
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

AuthorPage.layout = Plain;

export default AuthorPage;
