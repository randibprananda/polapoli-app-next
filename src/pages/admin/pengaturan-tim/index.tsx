import { Alert, Col, message, Row, UploadProps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormTimRelawan, HeaderPage, Spinner } from '../../../components';
import { PERMISSION } from '../../../constant/contract';
import { Admin } from '../../../layouts';
import { useCurrentTeam, useProfile } from '../../../swr';
import axios from 'axios';
import {
  checkBaseUrlImage,
  checkPermissionArray,
  fetchWrapper,
  responseMessage
} from '../../../utils';

const PengaturanTimPage = () => {
  const router = useRouter();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const {
    data: currentTeam,
    listPermission,
    isLoading
  } = useCurrentTeam(refresh);
  const { data: userData, role: userRole } = useProfile(true);

  const updateAvatar = async (e: any) => {
    if (currentTeam?.data) {
      const formData = new FormData();
      formData.append('photo_tim_relawan', e.file);
      formData.append('nama_tim_relawan', currentTeam?.data.nama_tim_relawan);
      formData.append('tanggal_pemilihan', currentTeam?.data.tanggal_pemilihan);
      formData.append('link_video', currentTeam?.data.link_video);

      await axios
        .post(
          `/api/tim-relawan/update-team?avatar=true&id=${currentTeam?.data?.id}`,
          formData
        )
        .then(() => {
          responseMessage({
            type: 'success',
            message: 'Foto berhasil diubah',
            onHide: () => setRefresh(false)
          });
        })
        .catch(err => {
          if (err.response && err.response.status === 400) {
            const validationErrors = err.response.data.data.error;
            const errorMessages = Object.keys(validationErrors).map(key => {
              return `${validationErrors[key]}`;
            });

            errorMessages.forEach(errorMessage => {
              responseMessage({
                type: 'error',
                message: `${errorMessage}`,
                onHide: hideModal
              });
            });
          } else {
            responseMessage({
              type: 'error',
              message: err.response,
              onHide: hideModal
            });
          }
        })
        .finally(() => {
          setRefresh(true);
        });
    }
  };

  const uploadProps: UploadProps = {
    name: 'photo_tim_relawan',
    showUploadList: false,
    beforeUpload: file => {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isPNG) {
        message.error('Format tidak didukung! Masukan file .png atau .jpg', 3);
      }
      return isPNG;
    },
    maxCount: 1,
    customRequest: updateAvatar
  };

  const hideModal = () => {
    setRefresh(false);
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onUpdateProfile = async (values: any) => {
    values.tanggal_pemilihan = values.tanggal_pemilihan.format(
      'YYYY-MM-DD HH:mm:ss'
    );
    values.jenis_pencalonan = values.jenis_pencalonan ? 1 : 0;

    setLoading(true);
    await axios
      .post(`/api/tim-relawan/update-team?id=${currentTeam?.data?.id}`, values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => {
            hideModal();
            currentTeam?.data?.jenis_pencalonan !== values.jenis_pencalonan &&
              router.reload();
          }
        });
      })
      .catch(err => {
        // console.log(err.response);
        if (err.response && err.response.status === 400) {
          const validationErrors = err.response.data.data.error;

          const errorMessages = Object.keys(validationErrors).map(key => {
            return `${validationErrors[key]}`;
          });

          errorMessages.forEach(errorMessage => {
            responseMessage({
              type: 'error',
              message: `${errorMessage}`,
              onHide: hideModal
            });
          });
        } else {
          responseMessage({
            type: 'error',
            message: err.response.data.data.message,
            onHide: hideModal
          });
        }
      })
      .finally(() => hideLoading());
  };

  useEffect(() => {
    if (currentTeam?.data) {
      const {
        nama_tim_relawan,
        tanggal_pemilihan,
        link_video,
        jenis_pencalonan
      } = currentTeam?.data;

      form.setFieldsValue({
        nama_tim_relawan,
        tanggal_pemilihan: moment(tanggal_pemilihan || moment()),
        link_video,
        jenis_pencalonan: jenis_pencalonan === 1
      });
    }
  }, [currentTeam]);

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
        <title>Pengaturan Tim</title>
      </Head>
      <HeaderPage title="Pengaturan Tim Relawan" />
      <Row>
        <Col md={12} xl={8} xxl={6}>
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-96">
              <Spinner />
            </div>
          ) : (
            <FormTimRelawan
              avatar={checkBaseUrlImage(currentTeam?.data.photo_tim_relawan)}
              form={form}
              uploadProps={uploadProps}
              onFinish={onUpdateProfile}
              loading={loading}
              withAvatar={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.ubah_foto
              })}
              withName={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.ubah_nama_tim
              })}
              withDate={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.timeline_pilkada
              })}
              withYoutube={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.link_youtube_sambutan_paslon
              })}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

PengaturanTimPage.layout = Admin;

export default PengaturanTimPage;
