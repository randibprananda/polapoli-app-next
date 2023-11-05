import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { PaslonInterface } from '../../../../@types/DataMaster';
import { IlPaslonDummy } from '../../../../assets';
import { CardPaslon } from '../../../atoms';

export type PaslonProps = {
  data: PaslonInterface[];
};

const PaslonSection: React.FC<PaslonProps> = ({ data }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Title level={3}>Pasangan Calon</Title>
      </Col>
      {data?.map((item: PaslonInterface, index: number) => (
        <Col xs={24} lg={8} key={index}>
          <CardPaslon
            number={item.nomor_urut}
            image={item.paslon_profile_photo}
            type={item.jenis_pencalonan}
            name={
              item.nama_wakil_paslon
                ? `${item.nama_paslon} & ${item.nama_wakil_paslon}`
                : `${item.nama_paslon}`
            }
          />
        </Col>
      ))}
    </Row>
  );
};

export default PaslonSection;
