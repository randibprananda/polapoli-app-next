import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { IlDonate } from '../../../../assets';
import { currencyFormat } from '../../../../utils';
import { CardBanner } from '../../../atoms';

export type TotalDonasiProps = {
  donasi: number;
};

const TotalDonasiSection: React.FC<TotalDonasiProps> = ({ donasi }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Title level={3}>Total Donasi</Title>
      </Col>
      <Col xs={24}>
        <CardBanner
          image={IlDonate}
          content={
            <>
              <h3 className="text-white text-xl font-semibold mb-3">
                Total Donasi Masuk
              </h3>
              <p className="text-4xl font-bold text-white mb-3">
                {currencyFormat(donasi)}
              </p>
            </>
          }
          background="bg-rose"
          maxWidth={763}
        />
      </Col>
    </Row>
  );
};

export default TotalDonasiSection;
