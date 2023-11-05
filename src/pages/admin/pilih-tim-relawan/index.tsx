import { Button, Card, Col, Layout, message, Modal, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { TimRelawanInterface } from '../../../@types/DataMaster';
import { IlLogin } from '../../../assets';
import { AdminNavbar, CardTimRelawan, Gap, Spinner } from '../../../components';
import { useProfile, useTimRelawan } from '../../../swr';
import { fetchWrapper } from '../../../utils';

const PilihTimRelawan = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['user', '_r']);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchWrapper
      .get('/api/tim-relawan')
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    axios
      .post('/api/auth/logout', null)
      .then(() => {
        router.push('/auth/login');
      })
      .catch(err => {
        message.error(err.message, 3);
      });
  };

  const handleChooseTeam = (id: number | string) => {
    const form = {
      current_team_id: id
    };
    fetchWrapper
      .post('/api/tim-relawan/current-team', form)
      .then(() => router.push('/admin/dashboard'))
      .catch(() => message.error('Mohon maaf sedang terjadi masalah!', 3));
  };

  return (
    <>
      <Head>
        <title>Pilih Tim Relawan</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout">
          <AdminNavbar
            profileName={cookies.user?.name || ''}
            avatar={cookies.user?.avatar}
            onLogout={() => setIsModalVisible(true)}
          />
          <Content className="p-0 pb-0 bg-light">
            <div className="bg-light py-12 px-16">
              <Row gutter={16}>
                <Col xs={24}>
                  <Title level={2}>Pilih Tim Relawan</Title>
                </Col>
                <Col xs={24}>
                  <Gap height={24} width={12} />
                  <Row gutter={[32, 32]}>
                    {loading ? (
                      <div className="flex justify-center items-center w-full h-96">
                        <Spinner />
                      </div>
                    ) : (
                      data?.data?.tim_relawans.map(
                        (item: TimRelawanInterface) => (
                          <Col key={item.id}>
                            <CardTimRelawan
                              data={item}
                              onClick={() => handleChooseTeam(item.id)}
                            />
                          </Col>
                        )
                      )
                    )}
                  </Row>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        <div className="flex flex-col justify-center items-center">
          <div className=" py-5">
            <Image
              src={IlLogin}
              width={100}
              height={64}
              alt="Logout"
              loading="eager"
            />
          </div>
          <p className="font-semibold text-xl">
            Apakah kamu yakin akan keluar?
          </p>
          <div className=" max-w-max mt-6">
            <Button
              key="ya"
              type="default"
              size="large"
              danger
              onClick={handleLogout}
            >
              Ya
            </Button>
            <Gap width={16} height={10} />
            <Button
              key="batal"
              type="primary"
              size="large"
              onClick={() => setIsModalVisible(false)}
            >
              Batal
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PilihTimRelawan;
