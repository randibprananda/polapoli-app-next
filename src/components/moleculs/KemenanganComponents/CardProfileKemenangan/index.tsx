import React from 'react';
import { Col, Row } from 'antd';
import Image from 'next/image';
import { IcImageDefault, IlBgDummy, IlPaslonDummy } from '../../../../assets';
import { Gap } from '../../../atoms';
import Title from 'antd/lib/typography/Title';
import Props from './cardProfileKemenangan.props';
import { ParpolInterface } from '../../../../@types/Kemenangan';

const CardProfileKemenangan: React.FC<Props> = ({
  color,
  jenis_pencalonan,
  nama_paslon,
  nama_wakil_paslon,
  nomor_urut,
  paslon_profile_photo,
  motto,
  slogan,
  parpol
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-md relative max-w-md lg:max-w-1200 mx-auto">
      <Row gutter={[24, 24]} className="relative p-2 sm:p-6 lg:p-8">
        <Col xs={24} lg={10} xl={8} className="text-center">
          <Image
            src={paslon_profile_photo || IlPaslonDummy}
            alt="foto paslon"
            objectFit="cover"
            height={1900}
            width={1450}
            layout="responsive"
            className="rounded-3xl"
          />
          <div
            className="w-full h-full"
            style={{
              maxWidth: 500,
              maxHeight: 550
            }}
          ></div>
          <div></div>
        </Col>
        <Col xs={24} lg={14} xl={16}>
          <div className="px-6">
            <div className="text-center mb-4 md:mb-6">
              {parpol?.map((item: ParpolInterface) => (
                <Image
                  key={item.id}
                  src={item.foto_parpol || IcImageDefault}
                  width={54}
                  height={54}
                  alt={item.nama_parpol || ''}
                  className="mx-1"
                />
              ))}
            </div>

            <p className=" font-bold text-lg lg:text-2xl text-center mb-4 md:mb-6">
              {jenis_pencalonan || ''}
            </p>

            <p className=" font-bold text-lg md:text-2xl text-center mb-4 md:mb-6">
              No Urut <span className="text-4xl">{nomor_urut || '0'}</span>
            </p>
            <p
              className=" font-bold text-3xl md:text-4xl text-center  mb-4 md:mb-6"
              style={{
                color
              }}
            >
              {slogan || ''}
            </p>
            <Title
              level={1}
              className="font-bold text-2xl md:text-3xl text-center  mb-4 md:mb-6"
            >
              {`${nama_paslon || ''} ${
                nama_wakil_paslon ? `& ${nama_wakil_paslon}` : ''
              }`}
            </Title>
            <Gap height={24} width={10} />
            <p
              className="italic font-medium md:font-bold text-lg md:text-xl lg:text-2xl text-center mb-0"
              style={{
                color
              }}
            >
              {motto || ''}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardProfileKemenangan;
