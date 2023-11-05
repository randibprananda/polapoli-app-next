import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { DonationNowInterface } from '../../../../@types/Landing';
import { fetchWrapper, responseMessage } from '../../../../utils';
import { SectionWrapper } from '../../../moleculs';
import {
  ListOfDonationKemenangan,
  ModalDonationNow
} from '../../DonasiComopnents';
import Props from './sectionDonation.props';

const SectionDonation: React.FC<Props> = ({ color, data }) => {
  const router = useRouter();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState('0');
  const [idDonasi, setIdDonasi] = useState<any>(null);

  const handleClickDetail = (id: string | number) => {
    window.open(window.location.pathname + '/detail?donasi=' + id);
  };

  const handleHide = (res: any) => {
    handleCloseModal();
    window.open(res?.data[0]?.invoice_url);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const onCreate = (values: DonationNowInterface) => {
    const formData = {
      ...values,
      name: values.is_anonim ? 'anonim' : values.name,
      amount,
      donation_id: idDonasi
    };
    delete formData.is_anonim;

    setLoading(true);
    fetchWrapper
      .post(`/api/donasi/donation-now`, formData)
      .then(res =>
        responseMessage({
          type: 'success',
          message: 'Berhasil melakukan donasi',
          onHide: () => handleHide(res)
        })
      )
      .catch(err =>
        responseMessage({
          type: 'error',
          message: 'Gagal melakukan donasi',
          onHide: () => {}
        })
      )
      .finally(() => hideLoading());
  };

  const handleDonationNow = (id: number) => {
    setOpenModal(true);
    setIdDonasi(id);
  };

  return (
    <>
      <SectionWrapper id="donasi" title="Ayo Dukung Calonmu" titleColor={color}>
        <ListOfDonationKemenangan
          withMenu={false}
          column={2}
          withButton={true}
          color={color}
          onDonateNow={handleDonationNow}
          onDetails={handleClickDetail}
          data={data}
        />
      </SectionWrapper>
      <ModalDonationNow
        form={form}
        visible={openModal}
        loading={loading}
        onCancel={handleCloseModal}
        onCreate={onCreate}
        amount={amount}
        setAmount={setAmount}
      />
    </>
  );
};

export default SectionDonation;
