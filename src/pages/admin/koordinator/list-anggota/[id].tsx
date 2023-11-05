import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { useForm } from 'antd/lib/form/Form';
import { Alert, Button, Col, Form, Row, Select, Table, Tabs } from 'antd';

import { HeaderPage, Spinner } from '../../../../components';
import { Admin } from '../../../../layouts';
import { colors } from '../../../../theme';
import { useRouter } from 'next/router';
import { useDetailKoordinator, useProfile } from '../../../../swr';
import { UserInterface } from '../../../../@types/User';

const { TabPane } = Tabs;
const KoordinatorPage = () => {
  const router = useRouter();
  const [id, setId] = useState<any>(null);
  const [refresh, setRefresh] = useState(true);
  const [dataRelawan, setDataRelawan] = useState<any>([]);
  const [dataSaksi, setDataSaksi] = useState<any>([]);
  const { data: detailData, isLoading } = useDetailKoordinator(refresh, id);
  const { data: userData, role: userRole } = useProfile(true);

  const splitRoles = (data: any[]) => {
    const relawans = data?.filter(
      (item: any) => item.user.user_role_tim[0].role.id === 4
    );
    const saksis = data?.filter(
      (item: any) => item.user.user_role_tim[0].role.id === 5
    );

    return {
      relawans,
      saksis
    };
  };

  const columnsRelawan = [
    {
      title: 'Nama',
      dataIndex: 'user.name',
      render: (text: any, record: any) => <span>{record.user.name}</span>
    },
    {
      title: 'Email',
      dataIndex: 'user.email',
      render: (text: any, record: any) => <span>{record.user.email}</span>
    },
    {
      title: 'No HP',
      dataIndex: 'user.no_hp',
      render: (text: any, record: any) => (
        <span>{record.user.phonenumber || '-'}</span>
      )
    },
    {
      title: 'Aksi',
      width: 200,
      render: (text: string, record: any) => {
        return (
          <div>
            <Button danger onClick={() => {}}>
              Hapus
            </Button>
          </div>
        );
      }
    }
  ];
  const columnsSaksi = [
    {
      title: 'Nama',
      dataIndex: 'user.name',
      render: (text: any, record: any) => <span>{record.user.name}</span>
    },
    {
      title: 'Email',
      dataIndex: 'user.email',
      render: (text: any, record: any) => <span>{record.user.email}</span>
    },
    {
      title: 'No HP',
      dataIndex: 'user.no_hp',
      render: (text: any, record: any) => (
        <span>{record.user.phonenumber || '-'}</span>
      )
    },
    {
      title: 'Aksi',
      width: 200,
      render: (text: string, record: any) => {
        return (
          <div>
            <Button danger onClick={() => {}}>
              Hapus
            </Button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);

      const { relawans, saksis } = splitRoles(
        detailData?.data.detail_user.daftar_anggota
      );

      setDataRelawan(relawans);
      setDataSaksi(saksis);
    }
  }, [router, detailData]);

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
        <title>List Anggota | Koordinator</title>
      </Head>
      <HeaderPage
        title={`List Anggota (${
          (dataRelawan?.length || 0) + (dataSaksi?.length || 0)
        })`}
        withArrowBack
      />
      <Row className="mt-7">
        {false ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Tabs color={colors.primary}>
                <TabPane tab="Relawan" key="1">
                  <Table dataSource={dataRelawan} columns={columnsRelawan} />
                </TabPane>
                <TabPane tab="Saksi" key="2">
                  <Table dataSource={dataSaksi} columns={columnsSaksi} />
                </TabPane>
              </Tabs>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

KoordinatorPage.layout = Admin;

export default KoordinatorPage;
