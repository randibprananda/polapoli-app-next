import { Button, Layout, Modal, message } from 'antd';
import Text from 'antd/lib/typography/Text';
import { DraggerProps } from 'antd/lib/upload';
import axios from 'axios';
import cookie from 'cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { IlLogin } from '../../assets';
import { AdminNavbar, Gap, Overlay, Sidebar } from '../../components';
import { PERMISSION } from '../../constant/contract';
import { AdminRoutes } from '../../routes';
import { useCurrentTeam, useProfile, useTimRelawan } from '../../swr';
import { fetchWrapper, responseMessage } from '../../utils';
import { checkPermission, checkPermissionArray } from '../../utils/roles/index';

const { Content } = Layout;

const AdminLayout = (props: any) => {
  const router = useRouter();
  const { data: profileUser } = useProfile(true);
  const [collapsed, setCollapse] = useState(false);
  const [isModalLogout, setIsModalLogout] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openRelawan, setOpenRelawan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(true);

  // service
  const { timRelawan, isLoading } = useTimRelawan(refresh);
  const { data: currentTeam, listPermission } = useCurrentTeam(true);

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    showUploadList: true,
    maxCount: 1
  };

  const onCollapse = () => setCollapse(!collapsed);

  const handleLogout = () => {
    setLoadingLogout(true);
    axios
      .post('/api/auth/logout', null)
      .then(() => {
        router.push('/auth/login');
      })
      .catch(err => {
        message.error(err.message);
      })
      .finally(() => setLoadingLogout(false));
  };

  const onFinish = (values: any) => {
    // ! Cek Permission Buat Tim

    if (
      checkPermissionArray({
        roles: listPermission,
        idRole: PERMISSION.buat_tim_relawan
      })
    ) {
      const formData = new FormData();
      formData.append('nama_tim_relawan', values.name);
      formData.append('photo_tim_relawan', values.image);

      setLoading(true);
      fetchWrapper
        .post_multipart('/api/tim-relawan', formData)
        .then(() => {
          responseMessage({
            type: 'success',
            message: 'Data berhasil ditambahkan',
            onHide: () => {
              setIsModalVisible(false);
              setRefresh(false);
            }
          });
        })
        .catch(err => {
          responseMessage({
            type: 'error',
            message: 'Gagal menambahkan data',
            onHide: () => setRefresh(false)
          });
        })
        .finally(() => {
          setLoading(false);
          setRefresh(true);

          setTimeout(() => {
            router.reload();
          }, 2000);
        });
    } else {
      responseMessage({
        type: 'error',
        message: 'Kamu tidak diizinkan membuat tim',
        onHide: () => setRefresh(false)
      });
      setLoading(false);
      setRefresh(true);
      setIsModalVisible(false);
    }
    // router.push('/dashboard');
  };

  const handleChooseTeam = (id: number | string) => {
    const form = {
      current_team_id: id
    };
    fetchWrapper
      .post('/api/tim-relawan/current-team', form)
      .then(() => router.reload())
      .catch(() => message.error('Mohon maaf sedang terjadi masalah!', 3));
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <AdminNavbar
          profileName={profileUser?.data?.name || ''}
          avatar={profileUser?.data?.profile_photo_path}
          onLogout={() => setIsModalLogout(true)}
          onClickMenu={() => setOpenSidebar(true)}
        />

        <Layout className="site-layout relative">
          <Sidebar
            collapsed={collapsed}
            onCollapse={onCollapse}
            routes={AdminRoutes}
            open={openSidebar}
            openRelawan={openRelawan}
            setOpenRelawan={setOpenRelawan}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            draggerProps={draggerProps}
            timRelawanData={timRelawan?.data?.tim_relawans}
            onFinish={onFinish}
            handleChooseTeam={handleChooseTeam}
            isLoading={isLoading}
            isDisable={loading}
            isLegislatif={currentTeam?.data?.jenis_pencalonan}
          />
          <Layout>
            <Overlay
              open={openSidebar}
              onToggle={() => setOpenSidebar(false)}
            />
            <Content className="bg-light sm:mt-24 sm:ml-64 p-0 pb-0 mt-16">
              <main className="bg-light p-9" style={{ minHeight: 360 }}>
                {props.children}
              </main>
            </Content>
          </Layout>
        </Layout>
      </Layout>

      <Modal
        visible={isModalLogout}
        footer={null}
        onCancel={() => setIsModalLogout(false)}
        centered
      >
        <div className="flex flex-col items-center justify-center">
          <div className=" py-5">
            <Image
              src={IlLogin}
              width={100}
              height={64}
              alt="Logout"
              loading="eager"
            />
          </div>
          <Text className=" text-xl font-semibold">
            Apakah kamu yakin akan keluar?
          </Text>
          <div className="max-w-max mt-6">
            <Button
              key="ya"
              type="default"
              size="large"
              danger
              onClick={handleLogout}
              loading={loadingLogout}
              disabled={loadingLogout}
            >
              Ya
            </Button>
            <Gap width={16} height={10} />
            <Button
              key="batal"
              type="primary"
              size="large"
              onClick={() => setIsModalLogout(false)}
            >
              Batal
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AdminLayout;
