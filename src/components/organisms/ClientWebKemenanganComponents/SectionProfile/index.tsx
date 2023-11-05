import { Col, Row } from 'antd';
import React from 'react';
import Image from 'next/image';
import { IlBgDummy } from '../../../../assets';
import { CardProfileKemenangan } from '../../../moleculs/KemenanganComponents';
import Props from './sectionProfile.props';

const SectionProfile: React.FC<Props> = ({
  color,
  background,
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
    <section
      id="profile"
      className="w-full max-h-max relative -mb-96 lg:-mb-40"
    >
      <Row>
        <Col
          xs={24}
          style={{
            minHeight: 500
          }}
        >
          <Image
            src={background || IlBgDummy}
            alt="background"
            objectFit="cover"
            layout="fill"
          />
        </Col>
        <Col xs={24}>
          <div className="-translate-y-1/2 px-4 sm:px-6 md:px-20 xl:px-36 pt-52 lg:pt-0 -mb-40 lg:-mb-28">
            <CardProfileKemenangan
              color={color}
              jenis_pencalonan={jenis_pencalonan}
              nama_paslon={nama_paslon}
              nama_wakil_paslon={nama_wakil_paslon}
              nomor_urut={nomor_urut}
              paslon_profile_photo={paslon_profile_photo}
              motto={motto}
              slogan={slogan}
              parpol={parpol}
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default SectionProfile;
