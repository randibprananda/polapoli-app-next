import { Row, Col } from 'antd';
import React from 'react';
import { ContactPersonKemenangan, SocialMediaKemenangan } from '../..';
import { PERMISSION } from '../../../../../constant/contract';
import { RenderIf, checkPermissionArray } from '../../../../../utils';

const TabContactPersonComp: React.FC<any> = ({
  listPermission,
  formContactPerson,
  kontakCalonData,
  onUpdateContactPerson,
  sosialMediaData,
  formSocialMedia,
  onUpdateSocialMedia,
  isDisable
}) => (
  <Row gutter={[24, 24]}>
    <Col xs={24} lg={16} xl={17}>
      <Row gutter={[24, 24]}>
        <RenderIf
          isTrue={checkPermissionArray({
            roles: listPermission,
            idRole: PERMISSION.crud_contact
          })}
        >
          <Col xs={24}>
            <ContactPersonKemenangan
              data={kontakCalonData?.data}
              form={formContactPerson}
              onUpdate={onUpdateContactPerson}
              isDisable={isDisable}
            />
          </Col>
        </RenderIf>

        <RenderIf
          isTrue={checkPermissionArray({
            roles: listPermission,
            idRole: PERMISSION.crud_social_media
          })}
        >
          <Col xs={24}>
            <SocialMediaKemenangan
              data={sosialMediaData?.data}
              form={formSocialMedia}
              onUpdate={onUpdateSocialMedia}
              isDisable={isDisable}
            />
          </Col>
        </RenderIf>
      </Row>
    </Col>
  </Row>
);

export default TabContactPersonComp;
