import { Row, Col, Typography, UploadProps, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Biodata, ChangePassword } from '../../../components';
import { PERMISSION } from '../../../constant/contract';
import { Admin } from '../../../layouts';
import { useCurrentTeam, useProfile } from '../../../swr';
import {
  checkPermissionArray,
  fetchWrapper,
  RenderIf,
  responseMessage
} from '../../../utils';

const { Title } = Typography;

const Profile = () => {
  const [refresh, setRefresh] = useState(true);
  const { data: userData } = useProfile(refresh);
  const [form] = useForm();
  const [resetForm] = useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { listPermission } = useCurrentTeam(true);

  const updateAvatar = (e: any) => {
    if (userData) {
      const formData = new FormData();
      formData.append('profile_photo_path', e.file);
      fetchWrapper
        .post_multipart('/api/profile/profile-photo', formData)
        .then(() => {
          responseMessage({
            type: 'success',
            message: 'Foto berhasil diubah',
            onHide: () => setRefresh(false)
          });
        })
        .catch(err => {
          responseMessage({
            type: 'error',
            message: 'Gagal mengubah foto',
            onHide: () => {}
          });
        })
        .finally(() => {
          setRefresh(true);
        });
    }
  };
  const uploadProps: UploadProps = {
    name: 'profile_photo_path',
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

  const onUpdateProfile = (values: any) => {
    if (userData) {
      setLoading(true);
      fetchWrapper
        .post('/api/profile', values)
        .then(() => {
          responseMessage({
            type: 'success',
            message: 'Data berhasil diubah',
            onHide: () => setRefresh(false)
          });
        })
        .catch(err => {
          responseMessage({
            type: 'error',
            message: 'Gagal mengubah data',
            onHide: () => {}
          });
        })
        .finally(() => {
          setLoading(false);
          setRefresh(true);
        });
    }
  };

  const onResetPassword = (values: any) => {
    if (values.password !== values.password_confirmation) {
      message.error(
        'Konfirmasi kata sandi baru tidak sesuai dengan kata sandi baru',
        2
      );
      return;
    }

    setPasswordLoading(true);
    fetchWrapper
      .post('/api/profile/reset-password', values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Kata sandi berhasil diubah',
          onHide: () => {
            setRefresh(false);
            resetForm.setFieldsValue({
              current_password: '',
              password: '',
              password_confirmation: ''
            });
          }
        });
      })
      .catch(err => {
        if (err.data.message.toLowerCase().includes('current password')) {
          responseMessage({
            type: 'error',
            message: 'Kata sandi lama tidak sesuai',
            onHide: () => {}
          });
          return;
        }
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah kata sandi',
          onHide: () => {}
        });
      })
      .finally(() => {
        setPasswordLoading(false);
        setRefresh(true);
      });
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData?.data.name,
        phonenumber: userData?.data.phonenumber
      });
    }
  }, [userData]);

  return (
    <>
      <Head>
        <title>Profil Saya</title>
      </Head>
      <Row gutter={24}>
        <Col xs={24}>
          <Title level={2}>Profil Saya</Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <RenderIf
          isTrue={checkPermissionArray({
            roles: listPermission,
            idRole: PERMISSION.ubah_profil
          })}
        >
          <Col xs={24} md={12} xl={12} xxl={8}>
            <Biodata
              avatar={userData?.data?.profile_photo_path}
              form={form}
              uploadProps={uploadProps}
              onFinish={onUpdateProfile}
              loading={loading}
            />
          </Col>
        </RenderIf>
        <RenderIf
          isTrue={checkPermissionArray({
            roles: listPermission,
            idRole: PERMISSION.ubah_password
          })}
        >
          <Col xs={24} md={12} xl={12} xxl={8}>
            <ChangePassword
              form={resetForm}
              onFinish={onResetPassword}
              loading={passwordLoading}
            />
          </Col>
        </RenderIf>
      </Row>
    </>
  );
};

Profile.layout = Admin;

export default Profile;
