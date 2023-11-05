import React, { useEffect, useState } from 'react';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Head from 'next/head';
import Image from 'next/image';
import { IlMailSent } from '../../../assets';
import { Button, Col, message, Row } from 'antd';
import { fetchWrapper, formatTime } from '../../../utils';
import { Auth } from '../../../layouts';

const EmailVerification = () => {
  const [time, setTime] = useState<any>(null);

  const handleSendAgain = () => {
    fetchWrapper
      .post('/api/auth/email-verification', null)
      .then(() => {
        localStorage.setItem('time', 60 * 5 + '');
        setTime(60 * 5);
      })
      .catch(() => {
        message.error('Gagal mengirim email!!');
      });
  };

  useEffect(() => {
    let cd: any = null;
    const isExist = localStorage.getItem('time');

    if (!isExist) {
      localStorage.setItem('time', 60 * 5 + '');
      setTime(60 * 5);
    } else {
      setTime(+isExist);
      cd = setTimeout(() => {
        if (+isExist === 0) {
          localStorage.removeItem('time');
        }
        if (+isExist !== 0 && setTime) {
          setTime(+isExist - 1);
          localStorage.setItem('time', +isExist - 1 + '');
        }
      }, 1000);
    }

    return () => {
      clearTimeout(cd);
    };
  });

  useEffect(() => {
    return () => localStorage.removeItem('time');
  }, []);

  return (
    <>
      <Head>
        <title>Email Verification</title>
      </Head>
      <Row justify="center" align="middle" className="h-screen bg-light">
        <Col xs={24} md={22} lg={20} xl={18} xxl={14}>
          <div className="flex flex-col justify-center items-center w-full max-w-lg mx-auto text-center px-4">
            <Image
              src={IlMailSent}
              objectFit="contain"
              width={237}
              height={222}
              alt="Campaign"
            />
            <Title level={2} className="font-bold mt-10 text-3xl sm:text-4xl">
              Pendaftaran Berhasil
            </Title>
            <Text className="max-w-lg text-xl sm:text-2xl text-center mx-auto text-grey1">
              Untuk memulai{' '}
              <span className="text-primary font-semibold">PolaPoli</span>,
              emailmu perlu diverifikasi
            </Text>

            <Text
              className={`${
                time === 0 ? 'text-light' : 'text-grey1'
              } mb-10 mt-3 text-xl`}
            >
              Tunggu Sebentar{' '}
              <span
                className={`${
                  time === 0 ? 'text-light' : 'text-primary'
                } font-semibold`}
              >
                ({formatTime(time)})
              </span>
            </Text>
            <Button
              type={time !== 0 ? 'primary' : 'default'}
              size="large"
              disabled={time !== 0}
              onClick={handleSendAgain}
            >
              Kirim Lagi
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

EmailVerification.layout = Auth;
export default EmailVerification;
