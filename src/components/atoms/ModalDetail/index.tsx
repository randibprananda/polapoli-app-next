import { Modal, Select } from 'antd';
import React from 'react';
import { TFeatureItem } from '..';
import Props from './modalDetail.props';

const { Option } = Select;

const ModalDetail: React.FC<Props> = ({
  visible,
  title,
  subTitle,
  features,
  checked,
  onCancel
}) => {
  return (
    <Modal
      footer={false}
      visible={visible}
      onCancel={onCancel}
      maskStyle={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      }}
    >
      <div className="flex flex-col items-center pb-2 mb-6 space-y-4 border-b border-b-grey3">
        <h2 className="text-xl font-bold text-center">{title}</h2>
        <p className="text-sm text-center text-grey1">{subTitle}</p>
      </div>
      <div>
        {features.map((feature: string, index: number) => (
          <TFeatureItem
            checked={checked}
            feature={feature}
            key={index}
            color={'black'}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ModalDetail;
