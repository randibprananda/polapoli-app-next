import React, { useState } from 'react';
import { BASE_URL } from '../../../../config';
import { CardBagikanKemenangan } from '../../../moleculs';
import Props from '../../../moleculs/KemenanganComponents/CardBagikanKemenangan/cardBagikanKemenangan.props';
import { ModalShareSocialMediaFeed } from '../../FeedComponents';

const BagikanKemenangan: React.FC<Props> = ({
  slug,
  isShareDisable,
  isDisable
}) => {
  const [openModalShare, setOpenModalShare] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');

  const handleOpenShare = () => {
    setTextToCopy(`${BASE_URL}${slug}`);
    setOpenModalShare(true);
  };

  const handleCloseShare = () => {
    setOpenModalShare(false);
    setTextToCopy('');
  };

  return (
    <>
      <CardBagikanKemenangan
        slug={`${BASE_URL}${slug}`}
        onShare={handleOpenShare}
        isShareDisable={isShareDisable}
        isDisable={isDisable}
      />
      {/* Modal Share */}
      <ModalShareSocialMediaFeed
        handleClick={() => {}}
        visible={openModalShare}
        onCancel={handleCloseShare}
        textToCopy={textToCopy}
      />
      {/* Modal Sharea */}
    </>
  );
};

export default BagikanKemenangan;
