import { Button, Input } from 'antd';
import React from 'react';
import { RenderIf } from '../../../../utils';
import { ButtonCopyToClipboard, CardKemenangan, Gap } from '../../../atoms';
import Props from './cardBagikanKemenangan.props';

const CardBagikanKemenangan: React.FC<Props> = ({
  slug,
  onShare,
  isShareDisable = true,
  isDisable = false
}) => {
  return (
    <CardKemenangan
      title="Bagikan Halaman"
      content={
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center">
          <Input.Group compact>
            <Input
              className="py-2"
              style={{ width: 'calc(100% - 100px)' }}
              defaultValue={slug}
              disabled
            />

            <RenderIf isTrue={!isDisable}>
              <ButtonCopyToClipboard
                customTextCopy="Link disalin ke clipboard"
                textToCopy={slug}
                customButton={
                  <Button type="primary" size="large" className="rounded-r-lg">
                    Salin
                  </Button>
                }
              />
            </RenderIf>
          </Input.Group>
          <Gap width={16} height={16} />
          <Button size="large" disabled={isShareDisable} onClick={onShare}>
            Bagikan
          </Button>
        </div>
      }
    />
  );
};

export default CardBagikanKemenangan;
