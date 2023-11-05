import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import { IlPattern2 } from '../../../assets';
import { dateFormat, RenderIf } from '../../../utils';
import { BaseCheckIn } from '../../atoms';
import moment from 'moment';

export type CardPresensiProps = {
  checkIn: string;
  checkOut: string;
  onCheckIn: () => void;
  onCheckOut: () => void;
};

const CardPresensi: React.FC<CardPresensiProps> = ({
  checkIn = '-',
  checkOut = '-',
  onCheckIn,
  onCheckOut
}) => {
  return (
    <div
      className={`relative flex flex-col-reverse md:flex-row justify-between items-center rounded-xl bg-white overflow-hidden`}
      aria-label="Banner"
      style={{ maxWidth: 1000 }}
    >
      <div className="hidden md:block absolute top-0 right-0 bottom-0">
        <Image
          src={IlPattern2}
          alt="background"
          width={2034}
          height={494}
          className="rounded-xl"
          objectFit="cover"
        />
      </div>
      <div className="py-10 px-6">
        <Row gutter={[32, 32]}>
          <Col>
            <h5 className="text-primary font-bold text-xl">Presensi</h5>
            <p className="text-primary font-bold text-2xl">
              {dateFormat(moment().format('YYYY-MM-DD'), 'lll')}
            </p>
          </Col>
          <Col>
            <BaseCheckIn type="in" time={checkIn} />
          </Col>
          <Col>
            <BaseCheckIn type="out" time={checkOut} />
          </Col>
          <Col>
            <RenderIf
              isTrue={
                checkIn === '-' || checkOut === '-' || !checkIn || !checkOut
              }
            >
              {!!checkIn && checkIn !== '-' ? (
                <div>
                  <Button onClick={onCheckOut} type="primary" size="large">
                    Check out
                  </Button>
                </div>
              ) : (
                <div>
                  <Button onClick={onCheckIn} type="primary" size="large">
                    Check in
                  </Button>
                </div>
              )}
            </RenderIf>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardPresensi;
