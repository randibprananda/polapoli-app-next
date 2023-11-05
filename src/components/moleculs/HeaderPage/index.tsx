import { Button, Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { IcArrowLeft } from '../../../assets';
import { useCurrentTeam } from '../../../swr';
import { checkIsPremium } from '../../../utils';
import Props from './headerPage.props';

const HeaderPage: React.FC<Props> = ({
  title,
  action,
  withArrowBack = false,
  subTitle
}) => {
  const router = useRouter();
  const { data: timRelawanData } = useCurrentTeam(true);
  return (
    <Row gutter={16} className="p-6 bg-white shadow -m-9 mb-9">
      {withArrowBack && (
        <button className="mr-3" onClick={() => router.back()}>
          <Image
            src={IcArrowLeft}
            width={32}
            height={32}
            objectFit="contain"
            loading="eager"
            alt="Back"
          />
        </button>
      )}
      <Col xs={24} md={10}>
        <div className="flex items-center justify-start">
          <Title
            level={1}
            className="text-sm font-semibold md:mb-0 md:text-2xl"
          >
            {title}
          </Title>
          {subTitle}
        </div>
      </Col>
      <Col
        xs={24}
        md={withArrowBack ? 12 : 14}
        className="flex items-center justify-start md:justify-end"
      >
        {checkIsPremium(timRelawanData?.data.is_premium) ? (
          <>{action}</>
        ) : (
          <Button
            type="primary"
            size="middle"
            onClick={() => router.push('/pricing')}
          >
            Upgrade Sekarang
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default React.memo(HeaderPage);
