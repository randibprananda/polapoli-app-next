import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Alert, Button, Col, Row, Table } from 'antd';

import { HeaderPage, Spinner } from '../../../../components';
import { Admin } from '../../../../layouts';
import { colors } from '../../../../theme';
import { useRouter } from 'next/router';
import { useFeedShareDetail, useProfile } from '../../../../swr';
import { usePagination } from '../../../../customHooks';
import { getWindowLastPath } from '../../../../utils';
import { FeedShareDetailInterface } from '../../../../@types/Feed';

const FeedDetailPage = () => {
  const router = useRouter();
  const [id, setId] = useState<any>(null);

  const [currentPage, onChangePagination] = usePagination(1);

  const { data: feedDetailData, isLoading } = useFeedShareDetail({
    mounted: true,
    id,
    page: currentPage
  });
  const { data: userData, role: userRole } = useProfile(true);

  const columns = [
    {
      title: 'Nama',
      render: (_: any, record: FeedShareDetailInterface) => (
        <span>{record?.user?.name}</span>
      )
    },
    {
      title: 'Jumlah Share',
      width: 300,
      render: (_: any, record: FeedShareDetailInterface) => (
        <span>{record?.jml} Kali</span>
      )
    }
  ];

  useEffect(() => {
    setId(getWindowLastPath());
  }, []);

  if (!userData?.currentTeam) {
    return (
      <div>
        <Alert
          message="Anda harus memilih tim terlebih dahulu untuk melihat informasi pada halaman ini"
          type="info"
          showIcon
          className="mb-6"
        />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Detail | Feed</title>
      </Head>
      <HeaderPage title={'Data Jumlah Share'} withArrowBack />
      <Row className="mt-7">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={feedDetailData?.data?.data}
                columns={columns}
                scroll={{ x: 1000 }}
                pagination={{
                  total: feedDetailData?.data?.total,
                  current: currentPage,
                  onChange: onChangePagination
                }}
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

FeedDetailPage.layout = Admin;

export default FeedDetailPage;
