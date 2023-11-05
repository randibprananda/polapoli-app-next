import { Button, Col, Row } from 'antd';
import React from 'react';
import { Edit } from 'react-iconly';
import { colors } from '../../../../theme';
import { CardKemenangan, TextWithLabel } from '../../../atoms';
import Props from './cardSocialMediaKemenangan.props';

const CardSocialMediaKemenangan: React.FC<Props> = ({
  onClickEdit = () => {},
  instagram = null,
  url_instagram = null,
  facebook = null,
  url_facebook = null,
  youtube = null,
  url_youtube = null,
  twitter = null,
  url_twitter = null,
  tiktok = null,
  url_tiktok = null,
  isDisable = false,
  linkedin = null,
  url_linkedin = null
}) => {
  return (
    <CardKemenangan
      title="Sosial Media"
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
          <Col xs={24} sm={12} md={8}>
            <TextWithLabel
              label="Instagram"
              text={instagram || '-'}
              withLink={!!url_instagram}
              link={url_instagram}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <TextWithLabel
              label="Facebook"
              text={facebook || '-'}
              withLink={!!url_facebook}
              link={url_facebook}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <TextWithLabel
              label="Youtube"
              text={youtube || '-'}
              withLink={!!url_youtube}
              link={url_youtube}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <TextWithLabel
              label="Twitter"
              text={twitter || '-'}
              withLink={!!url_twitter}
              link={url_twitter}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <TextWithLabel
              label="Tiktok"
              text={tiktok || '-'}
              withLink={!!url_tiktok}
              link={url_tiktok}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <TextWithLabel
              label="Linkedin"
              text={linkedin || '-'}
              withLink={!!url_linkedin}
              link={url_linkedin}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default CardSocialMediaKemenangan;
