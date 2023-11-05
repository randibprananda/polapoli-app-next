import { Row, Col } from 'antd';
import React from 'react';
import { IlHeaderSoal } from '../../../../assets';
import { dateFormat } from '../../../../utils';
import { CardBanner, CardRecap, Countdown } from '../../../atoms';

export type InfoSectionProps = {
  date: string;
  data: any[];
};

const InfoSection: React.FC<InfoSectionProps> = ({ date = '', data }) => {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <CardBanner
            image={IlHeaderSoal}
            content={
              <>
                <h3 className="text-white text-xl font-semibold mb-3">
                  Tanggal Pemilihan
                </h3>
                <p className="text-4xl font-bold text-white mb-3">
                  {date ? dateFormat(date, 'll') : '-'}
                </p>
              </>
            }
          />
        </Col>
        <Col xs={24} lg={8}>
          <Countdown deadline={date} />
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="mt-8">
        {data?.map((item, index) => (
          <Col lg={6} md={12} xs={24} key={index}>
            <CardRecap
              icon={item?.icon}
              title={item?.title}
              total={item?.total}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default InfoSection;
