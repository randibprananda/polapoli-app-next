import { message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { fetchWrapper } from '../../../utils';

const VerifyEmail = () => {
  const router = useRouter();
  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search);
    const token = urlSearch.get('token');
    fetchWrapper
      .get(`/api/auth/verify-email?token=${token}`)
      .then(() => {
        message.success('Email berhasil diverifikasi', 2);

        setTimeout(() => {
          router.push('/auth/register/create-team');
        }, 1500);
      })
      .catch(err => {
        message.error('Email gagal diverifikasi');
      });
  }, []);
  return <div>Loading...</div>;
};

export default VerifyEmail;
