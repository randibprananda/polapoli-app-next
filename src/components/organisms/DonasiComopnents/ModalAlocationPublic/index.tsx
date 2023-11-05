import { Button, Form, Input, Modal } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import Image from 'next/image';
import React from 'react';
import { IcImageDefault } from '../../../../assets';
import { checkBaseUrlImage, currencyFormat, RenderIf } from '../../../../utils';
import { Gap } from '../../../atoms';
import Props from './modalAlokasiPublic.props';

const ModalAlokasiPublicDonasi: React.FC<Props> = ({
  visible,
  onCancel,
  color,
  form
}) => {
  const checkImageIsString = (image: any) => typeof image === 'string';

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel}>
      <Form
        initialValues={{ remember: true }}
        onFinish={() => {}}
        form={form}
        layout="vertical"
      >
        <Image
          src={
            checkImageIsString(form.getFieldValue('bukti_alokasi'))
              ? checkBaseUrlImage(form.getFieldValue('bukti_alokasi'))
              : IcImageDefault
          }
          width={717.03}
          height={450}
          objectFit="cover"
          alt="alokasi"
        />
        <div className="pt-8">
          <h3
            style={{
              color
            }}
            className="text-2xl font-semibold mb-5"
          >
            {currencyFormat(form.getFieldValue('nominal'))}
          </h3>
          <p className="text-black text-lg">
            {form.getFieldValue('keterangan')}
          </p>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAlokasiPublicDonasi;
