import React from 'react';
import { Button, Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Head from 'next/head';
import Image from 'next/image';
import { IlExpired } from '../../../assets';
import { Gap } from '../../../components';
import { useRouter } from 'next/router';
import { Auth } from '../../../layouts';

const LinkExpired = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Link Expired</title>
      </Head>
      <Row justify="center" align="middle" className="h-screen bg-light">
        <Col xs={24} md={22} lg={20} xl={18} xxl={14}>
          <div className="flex flex-col justify-center items-center w-full max-w-sm mx-auto text-center px-4">
            <Image
              src={IlExpired}
              objectFit="contain"
              width={237}
              height={222}
              alt="expired"
            />
            <Title level={2} className="font-bold mt-10 text-3xl sm:text-4xl">
              Link Telah Expired
            </Title>
            <Text className="max-w-sm text-xl sm:text-2xl text-center mx-auto text-grey1">
              Link expired setelah 6 jam.
              <br /> Silahkan request link untuk verifikasi emailmu.
            </Text>

            <Gap height={36} width={20} />
            <Button
              type="primary"
              size="large"
              onClick={() => router.push('/auth/login')}
            >
              Masuk
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

LinkExpired.layout = Auth;
export default LinkExpired;
