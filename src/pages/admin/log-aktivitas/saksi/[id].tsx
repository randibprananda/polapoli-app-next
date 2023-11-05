import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Alert, Col, Row, Table } from 'antd';

import { HeaderPage, Spinner } from '../../../../components';
import { Admin } from '../../../../layouts';
import { useLogSaksi, useProfile } from '../../../../swr';
import { getWindowLastPath } from '../../../../utils';
import { useColumnSearch, usePagination } from '../../../../customHooks';

const LogAktivitasPage = () => {
  const [id, setId] = useState<any>(null);
  const [currentPage, onChangePagination] = usePagination(1);
  const { getColumnSearchProps } = useColumnSearch();

  const { data: logAktivitas, isLoading } = useLogSaksi(true, id, currentPage);
  const { data: userData, role: userRole } = useProfile(true);

  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'date',
      ...getColumnSearchProps('date')
    },
    {
      title: 'Check In',
      dataIndex: 'checkin_at'
    },
    {
      title: 'Check Out',
      dataIndex: 'checkout_at'
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
        <title>Log Aktivitas</title>
      </Head>
      <HeaderPage title="Log Aktivitas" withArrowBack />
      <Row className="mt-7">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={logAktivitas?.data?.data}
                columns={columns}
                scroll={{ x: 500 }}
                pagination={{
                  total: logAktivitas?.data?.total,
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

LogAktivitasPage.layout = Admin;

export default LogAktivitasPage;
