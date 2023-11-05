import { Col, Row } from 'antd';
import React from 'react';
import { Calling, Location, Message } from 'react-iconly';
import { textLightOrDark } from '../../../../theme';
import { RenderIf } from '../../../../utils';
import { TextIcon } from '../../../atoms';
import { SectionWrapper } from '../../../moleculs';
import ContactComp from './ContactComp';
import LocationComp from './LocationComp';
import Props from './sectionContact.props';
import SocialMediaComp from './SocialMediaComp';

const SectionContact: React.FC<Props> = ({ color, contact, socialMedia }) => {
  return (
    <SectionWrapper
      id="kontak"
      title="Hubungi Kami"
      backgroundColor={color}
      titleColor={textLightOrDark(color)}
      titleStyle="text-left"
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={10}>
          <RenderIf isTrue={!!contact?.alamat}>
            <LocationComp color={color} size={20} alamat={contact?.alamat} />
          </RenderIf>
        </Col>
        <Col xs={24} md={12} lg={9}>
          <ContactComp
            color={color}
            size={20}
            email={contact?.email}
            telepon={contact?.telepon}
            whatsapp={contact?.whatsapp}
          />
        </Col>
        <Col xs={24} lg={5}>
          <SocialMediaComp
            color={color}
            size={20}
            instagram={socialMedia?.instagram}
            url_instagram={socialMedia?.url_instagram}
            facebook={socialMedia?.facebook}
            url_facebook={socialMedia?.url_facebook}
            youtube={socialMedia?.youtube}
            url_youtube={socialMedia?.url_youtube}
            twitter={socialMedia?.twitter}
            url_twitter={socialMedia?.url_twitter}
            tiktok={socialMedia?.tiktok}
            url_tiktok={socialMedia?.url_tiktok}
            linkedin={socialMedia?.linkedin}
            url_linkedin={socialMedia?.url_linkedin}
          />
        </Col>
      </Row>
    </SectionWrapper>
  );
};

export default SectionContact;
