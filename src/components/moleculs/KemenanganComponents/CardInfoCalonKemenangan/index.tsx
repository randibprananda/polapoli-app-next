import { Button, Col, Row } from 'antd';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import { CardKemenangan } from '../../../atoms';
import Props from './cardInfoCalonKemenangan.props';
import { TextWithLabel } from '../../../atoms';

const CardInfoCalonKemenangan: React.FC<Props> = ({
  onClickEdit = () => {},
  paslon_name,
  paslon_number,
  motto,
  slogan,
  jenis_pencalonan,
  isDisable = false
}) => {
  return (
    <CardKemenangan
      title="Info Calon"
      action={
        <Button
          className="ant-btn-success"
          size="middle"
          onClick={onClickEdit}
          disabled={isDisable}
        >
          <p className="flex justify-between items-center">
            <Edit set="light" size={16} primaryColor={colors.white} />{' '}
            <span className="ml-2">Edit</span>
          </p>
        </Button>
      }
      content={
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <TextWithLabel label="Nama Calon" text={paslon_name || '-'} />
          </Col>
          <Col xs={24}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <TextWithLabel
                  label="Jenis Pencalonan"
                  text={jenis_pencalonan || '-'}
                />
              </Col>
              <Col xs={24} md={12}>
                <TextWithLabel label="No Urut" text={paslon_number || '-'} />
              </Col>
              <Col xs={24} md={12}>
                <TextWithLabel label="Jargon" text={slogan || '-'} />
              </Col>
              <Col xs={24} md={12}>
                <TextWithLabel label="Motto" text={motto || '-'} />
              </Col>
            </Row>
          </Col>
        </Row>
      }
    />
  );
};

export default CardInfoCalonKemenangan;
