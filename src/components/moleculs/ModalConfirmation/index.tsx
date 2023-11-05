import { Button, Modal } from 'antd';

import { Gap } from '../../atoms';
import { IlDelete } from '../../../assets';
import Image from 'next/image';
import Props from './modalConfirmation.props';
import React from 'react';
import { RenderIf } from '../../../utils';

const ModalConfirmation: React.FC<Props> = ({
  image = IlDelete,
  visible,
  onCancel,
  onOk,
  textOk = 'Ya',
  textCancel = 'Batal',
  withBtnCancel = true,
  customStyleCancel = {
    type: 'primary',
    size: 'large'
  },
  customStyleOk = {
    danger: true,
    type: 'default',
    size: 'large'
  },
  isUsung,
  textPublish
}) => {
  return (
    <Modal centered footer={false} visible={visible} onCancel={onCancel}>
      <div className="flex flex-col items-center justify-center py-6">
        <Image
          src={image}
          width={178}
          height={100}
          alt="Delete"
          objectFit="contain"
        />
        <Gap height={20} width={4} />
        <p className="text-xl font-bold text-center">
          {textPublish
            ? textPublish
            : isUsung === 1
            ? 'Apakah kamu yakin ingin menghapus data calon yang diusungkan?'
            : 'Apakah kamu yakin menghapus data ini ?'}
        </p>
      </div>
      <div className="flex justify-center">
        <Button onClick={onOk} {...customStyleOk}>
          {textOk}
        </Button>
        <Gap width={16} height={2} />
        <RenderIf isTrue={withBtnCancel}>
          <Button onClick={onCancel} {...customStyleCancel}>
            {textCancel}
          </Button>
        </RenderIf>
      </div>
    </Modal>
  );
};

export default ModalConfirmation;
