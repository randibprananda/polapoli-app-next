import { Button, Modal } from 'antd';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';

import { ButtonCopyToClipboard } from '../../../atoms';
import Props from './modalShareSocialMedia.props';
import React from 'react';

const ModalShareSocialMedia: React.FC<Props> = ({
  visible,
  onCancel,
  textToCopy,
  handleClick
}) => {
  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <div className="pb-2 mb-6 border-b border-b-grey3">
        <h2 className="text-xl font-bold ">Bagikan Feed</h2>
      </div>
      <div className="text-center">
        <div>
          <FacebookShareButton
            url={textToCopy}
            // quote={textToCopy}
            // hashtag={''}
            onClick={handleClick}
            className="p-3 mx-3 rounded-lg bg-light"
          >
            <FacebookIcon size={48} round />
          </FacebookShareButton>
          <TelegramShareButton
            className="p-3 mx-3 rounded-lg bg-light"
            // title={textToCopy}
            onClick={handleClick}
            url={textToCopy}
          >
            <TelegramIcon size={48} round />
          </TelegramShareButton>
          <WhatsappShareButton
            // title={textToCopy}
            onClick={handleClick}
            url={textToCopy}
            className="p-3 mx-3 rounded-lg bg-light"
          >
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
        </div>
        <div className="flex flex-row items-center justify-between my-4">
          <span className="w-full h-0 border-t border-t-grey1" />
          <h3 className="w-full text-base font-semibold text-grey1">
            Atau Salin Teks
          </h3>
          <span className="w-full h-0 border-t border-t-grey1" />
        </div>
        <ButtonCopyToClipboard
          textToCopy={textToCopy}
          customButton={
            <Button type="primary" size="large">
              Salin Text
            </Button>
          }
        />
      </div>
    </Modal>
  );
};

export default ModalShareSocialMedia;
