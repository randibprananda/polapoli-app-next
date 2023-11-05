import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DonationNowInterface } from '../../../../@types/Landing';
import {
  DonationItem,
  ModalDonationNow,
  SectionDescription,
  SectionDonationHistory,
  SectionLaporanAlokasiDana,
  Spinner
} from '../../../../components';
import { Kemenangan } from '../../../../layouts';
import { usePublicDonasi, usePublicKemenanganBySlug } from '../../../../swr';
import {
  calculateDayLeft,
  currencyFormat,
  currencyToInt,
  fetchWrapper,
  getWindowLastPath,
  responseMessage
} from '../../../../utils';

const DonationDetail = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [idDonasi, setIdDonasi] = useState<string | null>(null);
  const [amount, setAmount] = useState('0');

  // swr
  const { data: donasiData } = usePublicDonasi(true, slug, idDonasi);
  const { data: allData, isLoading } = usePublicKemenanganBySlug(true, slug);

  const handleCloseModal = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const handleHide = (res: any) => {
    handleCloseModal();
    window.open(res?.data[0]?.invoice_url);
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

  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search);
    setIdDonasi(urlSearch.get('donasi'));
    setSlug(router.query.slug + '');
  }, [router]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <section className="bg-primary px-4 sm:px-6 md:px-20 xl:px-56 py-8 sm:py-12 md:py-16 xl:py-24">
            <DonationItem
              imageSrc={donasiData?.detail_donasi?.donation_image}
              title={donasiData?.detail_donasi?.donation_title}
              onDonateNow={() => setOpenModal(true)}
              description={donasiData?.detail_donasi?.donation_description}
              collectedFundsFrom={currencyFormat(
                donasiData?.detail_donasi?.target_amount
              )}
              collectedFundsNow={currencyFormat(
                donasiData?.detail_donasi?.total_amount
              )}
              progress={
                (+donasiData?.detail_donasi?.total_amount /
                  +donasiData?.detail_donasi?.target_amount) *
                100
              }
              totalDonors={donasiData?.detail_donasi?.donation_donors?.length}
              dayLeft={calculateDayLeft(
                moment(),
                moment(
                  donasiData?.detail_donasi?.batas_akhir,
                  'DD-MM-YYYYTHH:mm:ssZ'
                )
              )}
              withMenu={false}
              withButton={true}
              withDetailButton={false}
              customColorDonationNowButton={
                allData?.data?.tentang_paslon?.tema_warna || '#C41141'
              }
              imgSectionColSize={{
                xs: 24,
                sm: 13,
                md: 11,
                lg: 8,
                xl: 8
              }}
              contentSectionColSize={{
                xs: 24,
                sm: 11,
                md: 13,
                lg: 16,
                xl: 16
              }}
            />
            <div className="max-h-max lg:max-h-80"></div>
          </section>
          {/* <SectionDescription color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'} description={data?.description} /> */}
          <SectionLaporanAlokasiDana
            color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
            data={donasiData?.detail_donasi?.alokasi_donations}
          />
          <SectionDonationHistory
            color={allData?.data?.tentang_paslon?.tema_warna || '#C41141'}
            data={donasiData?.detail_donasi?.donation_donors}
          />
        </>
      )}

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

DonationDetail.layout = Kemenangan;

export default DonationDetail;
