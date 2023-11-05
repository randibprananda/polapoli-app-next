import { Tooltip, Button } from 'antd';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Document } from 'react-iconly';
import { colors } from '../../../theme';
import Props from './buttonCopyToClipboard.props';

const ButtonCopyToClipboard: React.FC<Props> = ({
  textToCopy,
  block = false,
  customButton,
  customTextCopy = null
}) => {
  const [visible, setVisible] = useState(false);

  const handleSetVisible = () => {
    setVisible(true);

    setTimeout(() => setVisible(false), 1500);
  };

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleSetVisible}>
      <Tooltip
        title={customTextCopy || 'Teks disalin ke clipboard'}
        trigger="click"
        visible={visible}
      >
        {customButton ? (
          customButton
        ) : (
          <Button
            type="default"
            size="middle"
            block={block}
            className=" border-grey1 hover:border-grey1 ml-2"
          >
            <p className="flex justify-between items-center text-grey1">
              <Document set="light" size={16} primaryColor={colors.grey1} />{' '}
              <span className="ml-2">Salin Teks</span>
            </p>
          </Button>
        )}
      </Tooltip>
    </CopyToClipboard>
  );
};

export default ButtonCopyToClipboard;
