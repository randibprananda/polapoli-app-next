import React from 'react';
import { Button, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Head from 'next/head';
import Image from 'next/image';
import { IlError } from '../assets';
import { Gap } from '../components';
import { useRouter } from 'next/router';

const LinkExpired = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <Row justify="center" align="middle" className="h-screen bg-light">
        <Col xs={24} md={22} lg={20} xl={18} xxl={14}>
          <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto text-center px-4">
            <Image
              src={IlError}
              objectFit="contain"
              width={237}
              height={222}
              alt="error"
            />
            <Title level={2} className="font-bold mt-10 text-3xl sm:text-4xl">
              505 Tidak Tersedia
            </Title>
            <Text className="max-w-sm text-xl sm:text-2xl text-center mx-auto text-grey1">
              Wah sepertinya sementara layanan ini tidak tersedia
            </Text>

            <Gap height={70} width={20} />
            <Button
              type="primary"
              size="large"
              onClick={() => router.push('/')}
            >
              Kembali ke Beranda
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LinkExpired;
