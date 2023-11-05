import { Alert, Col, Row, Typography } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Location, People, TwoUsers, User, Wallet } from 'react-iconly';

import { IlHeaderSoal } from '../../../assets';
import { CardPresensi, ModalConfirmation, Spinner } from '../../../components';
import {
  CountSection,
  FreeTrialSection,
  InfoSection,
  PaslonSection,
  TotalDonasiSection
} from '../../../components/organisms/DashboardComponents';
import { BASE_URL } from '../../../config/index';
import { ROLE } from '../../../constant/contract';
import { Admin } from '../../../layouts';
import { useDashboard, usePresensi, useProfile } from '../../../swr';
import { colors } from '../../../theme';
import {
  RenderIf,
  checkPermission,
  checkPermissionArray,
  currencyFormat,
  fetchWrapper,
  responseMessage
} from '../../../utils';

const { Title } = Typography;

const Dashboard = () => {
  // state
  const [openConfirmCheckOut, setOpenConfirmCheckOut] = useState(false);
  const [refresh, setRefresh] = useState(true);

  // swr
  const { data: dasboardData, isLoading } = useDashboard(true);
  const detailDashboard = dasboardData?.data;
  const { data: presensiData } = usePresensi(refresh);
  const { data: userData, role: userRole } = useProfile(true);

  console.log('user data', userData?.currentTeam?.id);

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

  const hideModal = () => {
    setOpenConfirmCheckOut(false);
    setRefresh(false);
  };

  const hideLoading = () => {
    setRefresh(true);
  };

  const handleCheckIn = () => {
    fetchWrapper
      .post('/api/dashboard/check-in', {})
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Check in berhasil',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal melakukan check in',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const handleCheckOut = () => {
    fetchWrapper
      .post('/api/dashboard/check-out', {})
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Check out berhasil',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal melakukan check out',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const generateInfo = (role: number): any => {
    if (
      checkPermissionArray({
        roles: [ROLE.Konsultan, ROLE.ProjectManager],
        idRole: role
      })
    ) {
      return [
        {
          title: 'Jumlah DPT',
          total: detailDashboard?.jumlahDPT[0]?.total_jumlah_dpt || 0,
          icon: <People primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Jumlah TPS',
          total: detailDashboard?.totalTPS[0]?.total_tps || 0,
          icon: <Location primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Jumlah Relawan',
          total: detailDashboard?.relawans,
          icon: <People primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Jumlah Pendukung',
          total: detailDashboard?.pendukungs,
          icon: <People primaryColor={colors.primary} size={42} set="bulk" />
        }
      ];
    }

    if (
      checkPermission({
        role: ROLE.Koordinator,
        idRole: role
      })
    ) {
      return [
        {
          title: 'Jumlah Relawan',
          total: detailDashboard?.jumlah_relawans,
          icon: <People primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Jumlah Saksi',
          total: detailDashboard?.jumlah_saksis,
          icon: <User primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Gaji',
          total: currencyFormat(detailDashboard?.gaji[0]?.gaji || 0),
          icon: <Wallet primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Jumlah Survei',
          total: detailDashboard?.jumlah_surveis,
          icon: <People primaryColor={colors.primary} size={42} set="bulk" />
        }
      ];
    }

    if (
      checkPermission({
        role: ROLE.Saksi,
        idRole: role
      })
    ) {
      return [
        {
          title: 'Gaji',
          total: currencyFormat(detailDashboard?.gaji[0]?.gaji || 0),
          icon: <Wallet primaryColor={colors.primary} size={42} set="bulk" />
        }
      ];
    }

    if (
      checkPermission({
        role: ROLE.Relawan,
        idRole: role
      })
    ) {
      return [
        {
          title: 'Kunjungan Hari ini',
          total: detailDashboard?.total_kunjungan_hari_ini,
          icon: <TwoUsers primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Total Kunjungan',
          total: detailDashboard?.total_kunjungan,
          icon: <People primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Gaji',
          total: currencyFormat(detailDashboard?.gaji[0]?.gaji || 0),
          icon: <Wallet primaryColor={colors.primary} size={42} set="bulk" />
        },
        {
          title: 'Jumlah Survei',
          total: detailDashboard?.jumlah_surveis,
          icon: <People primaryColor={colors.primary} size={42} set="bulk" />
        }
      ];
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {isLoading ? (
        <div className="h-96 flex items-center justify-center w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <Row gutter={[36, 36]}>
            <RenderIf
              isTrue={
                checkPermission({
                  role: ROLE.ProjectManager,
                  idRole: userRole?.id
                }) && userData?.currentTeam?.is_premium === 0
              }
            >
              <Col xs={24}>
                <FreeTrialSection name={userData?.data.name} />
              </Col>
            </RenderIf>
            <RenderIf
              isTrue={checkPermissionArray({
                roles: [ROLE.Koordinator, ROLE.Relawan, ROLE.Saksi],
                idRole: userRole?.id
              })}
            >
              <Col xs={24}>
                <CardPresensi
                  checkIn={presensiData?.data?.checkin_at || '-'}
                  checkOut={presensiData?.data?.checkout_at || '-'}
                  onCheckIn={handleCheckIn}
                  onCheckOut={() => setOpenConfirmCheckOut(true)}
                />
              </Col>
            </RenderIf>
            <Col xs={24}>
              <InfoSection
                date={detailDashboard?.tanggalpemilihan[0]?.tanggal_pemilihan}
                data={generateInfo(userRole?.id)}
              />
            </Col>
            {/* <RenderIf
              isTrue={
                BASE_URL === 'https://polapoli.id/' &&
                userData?.currentTeam?.id === 37
              }
            >
              <Col>
                <a
                  href="https://asuransi.partaiperindo.com/"
                  className="flex gap-x-[10px] text-[24px] items-center font-[600] text-primary hover:text-rose group"
                >
                  Aktivasi Asuransi Partai Perindo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M17.6895 11.75H3.75C3.55109 11.75 3.36032 11.829 3.21967 11.9696C3.07902 12.1103 3 12.3011 3 12.5C3 12.6989 3.07902 12.8896 3.21967 13.0303C3.36032 13.171 3.55109 13.25 3.75 13.25H17.6895L12.219 18.719C12.0782 18.8598 11.9991 19.0508 11.9991 19.25C11.9991 19.4491 12.0782 19.6401 12.219 19.781C12.3598 19.9218 12.5508 20.0009 12.75 20.0009C12.9492 20.0009 13.1402 19.9218 13.281 19.781L20.031 13.031C20.1008 12.9613 20.1563 12.8785 20.1941 12.7874C20.2319 12.6963 20.2513 12.5986 20.2513 12.5C20.2513 12.4013 20.2319 12.3036 20.1941 12.2125C20.1563 12.1214 20.1008 12.0386 20.031 11.969L13.281 5.21897C13.1402 5.07814 12.9492 4.99902 12.75 4.99902C12.5508 4.99902 12.3598 5.07814 12.219 5.21897C12.0782 5.3598 11.9991 5.55081 11.9991 5.74997C11.9991 5.94913 12.0782 6.14014 12.219 6.28097L17.6895 11.75Z"
                      fill="#393885"
                      className="group-hover:fill-rose transition-all duration-300"
                    />
                  </svg>
                </a>
              </Col>
            </RenderIf> */}
            <Col>
              <Link href="/asuransi" passHref>
                <div className="flex gap-x-[10px] text-[24px] items-center font-[600] text-primary hover:text-rose group cursor-pointer">
                  Aktivasi Asuransi
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M17.6895 11.75H3.75C3.55109 11.75 3.36032 11.829 3.21967 11.9696C3.07902 12.1103 3 12.3011 3 12.5C3 12.6989 3.07902 12.8896 3.21967 13.0303C3.36032 13.171 3.55109 13.25 3.75 13.25H17.6895L12.219 18.719C12.0782 18.8598 11.9991 19.0508 11.9991 19.25C11.9991 19.4491 12.0782 19.6401 12.219 19.781C12.3598 19.9218 12.5508 20.0009 12.75 20.0009C12.9492 20.0009 13.1402 19.9218 13.281 19.781L20.031 13.031C20.1008 12.9613 20.1563 12.8785 20.1941 12.7874C20.2319 12.6963 20.2513 12.5986 20.2513 12.5C20.2513 12.4013 20.2319 12.3036 20.1941 12.2125C20.1563 12.1214 20.1008 12.0386 20.031 11.969L13.281 5.21897C13.1402 5.07814 12.9492 4.99902 12.75 4.99902C12.5508 4.99902 12.3598 5.07814 12.219 5.21897C12.0782 5.3598 11.9991 5.55081 11.9991 5.74997C11.9991 5.94913 12.0782 6.14014 12.219 6.28097L17.6895 11.75Z"
                      fill="#393885"
                      className="group-hover:fill-rose transition-all duration-300"
                    />
                  </svg>
                </div>
              </Link>
            </Col>
            <RenderIf
              isTrue={checkPermissionArray({
                roles: [ROLE.ProjectManager, ROLE.Konsultan],
                idRole: userRole?.id
              })}
            >
              <>
                <Col xs={24}>
                  <PaslonSection data={detailDashboard?.paslons} />
                </Col>
                <Col xs={24}>
                  <TotalDonasiSection
                    donasi={
                      detailDashboard?.totalDonasi
                        ? detailDashboard?.totalDonasi[0]?.total_donasi
                        : 0
                    }
                  />
                </Col>
              </>
            </RenderIf>
            <Col xs={24}>
              <CountSection
                realCount={detailDashboard?.realCount}
                quickCount={detailDashboard?.quickCount}
              />
            </Col>
          </Row>

          <ModalConfirmation
            visible={openConfirmCheckOut}
            onCancel={() => setOpenConfirmCheckOut(false)}
            onOk={() => handleCheckOut()}
            image={IlHeaderSoal}
            text="Apakah anda yakin melakukan check out?"
          />
        </>
      )}
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
