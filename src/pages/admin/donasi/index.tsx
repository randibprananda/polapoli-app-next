import { Row, Col, Button, message, Tabs, Alert } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import { DraggerProps } from 'antd/lib/upload';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IcNull, IlWarning } from '../../../assets';
import {
  HeaderPage,
  ListOfDonation,
  ModalConfirmation,
  ModalDonasi,
  NotFound,
  Spinner
} from '../../../components';
import { ADD_ON } from '../../../constant/contract';
import { Admin } from '../../../layouts';
import { useCurrentTeam, useDonasi, useProfile } from '../../../swr';
import { colors } from '../../../theme';
import {
  checkIsPremium,
  distinctAddOns,
  fetchWrapper,
  responseMessage
} from '../../../utils';

const { TabPane } = Tabs;

const DonasiPage = () => {
  const [form] = useForm();
  const router = useRouter();
  const [refresh, setRefresh] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalConfir, setOpenModalConfir] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [modalIsClosed, setModalIsClosed] = useState(false);
  const [optionalState, setOptionalState] = useState<{
    withTarget: boolean;
    withDateline: boolean;
  }>({
    withTarget: false,
    withDateline: false
  });

  // swr
  const {
    data: { publish, draft },
    isLoading
  } = useDonasi(refresh);
  const { data: timRelawanData } = useCurrentTeam(true);

  const { data: userData, role: userRole } = useProfile(true);

  const filterdAddOn = useMemo(
    () => distinctAddOns(timRelawanData?.data?.order_tim),
    [timRelawanData?.data?.order_tim]
  );

  useEffect(() => {
    if (filterdAddOn?.indexOf(ADD_ON.Donasi) === -1) {
      router.back();
    }
  }, [filterdAddOn]);

  const handleChangeOptionalState = useCallback(
    (name: 'withTarget' | 'withDateline', value: any) => {
      setOptionalState({
        ...optionalState,
        [name]: value
      });
    },
    [optionalState]
  );

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    beforeUpload: file => {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isPNG) {
        message.error('Format tidak didukung! Masukan file .png atau .jpg', 3);
      }
      return isPNG;
    },
    maxCount: 1
  };

  const onReset = () => {
    form.resetFields();
    setIsEdit(false);
    setId(null);
    setOptionalState({
      withTarget: false,
      withDateline: false
    });
  };

  const hideModal = () => {
    setOpenModal(false);
    setOpenModalConfir(false);
    setOpenModalDelete(false);
    setRefresh(false);
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
    onReset();
  };

  const handleCancelModal = () => {
    setOpenModal(false);
    onReset();
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('donation_image', values.donation_image);
    formData.append('donation_title', values.donation_title);
    formData.append('donation_description', values.donation_description);
    formData.append(
      'target_amount',
      optionalState.withTarget ? values.target_amount : '0'
    );
    formData.append('is_target', optionalState.withTarget ? '1' : '0');
    formData.append(
      'batas_akhir',
      optionalState.withDateline ? values.batas_akhir.format('DD-MM-YYYY') : '0'
    );
    formData.append('is_batas', optionalState.withDateline ? '1' : '0');

    setLoading(true);
    fetchWrapper
      .post_multipart('/api/donasi', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil ditambahkan',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menambahkan data',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const onUpdate = (values: any) => {
    const formData = new FormData();
    formData.append('donation_image', values.donation_image);
    formData.append('donation_title', values.donation_title);
    formData.append('donation_description', values.donation_description);
    formData.append(
      'target_amount',
      optionalState.withTarget ? values.target_amount : '0'
    );
    formData.append('is_target', optionalState.withTarget ? '1' : '0');
    formData.append(
      'batas_akhir',
      optionalState.withDateline ? values.batas_akhir.format('DD-MM-YYYY') : '0'
    );
    formData.append('is_batas', optionalState.withDateline ? '1' : '0');

    setLoading(true);
    fetchWrapper
      .put_multipart(`/api/donasi?id=${id}`, formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const handleDelete = (id: any) => {
    fetchWrapper
      .delete(`/api/donasi?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Donasi berhasil dihapus',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menghapus donasi',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const confirmDelete = (id: number) => {
    setOpenModalDelete(true);
    setId(id);
  };

  const handleCloseDonation = (id: any) => {
    fetchWrapper
      .post(`/api/donasi/open-close?id=${id}`, {})
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Donasi berhasil ditutup',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menutup donasi',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const confirmCloseDonation = (id: number, isClosed: boolean) => {
    setOpenModalConfir(true);
    setId(id);
    setModalIsClosed(isClosed);
  };

  const handleOpenModalToUpdate = (record: any) => {
    setId(record.id);
    setOpenModal(true);
    setIsEdit(true);

    const isTarget = record.is_target != '0';
    const isBatas = record.is_batas != '0';
    let batasAkhir = isBatas && {
      batas_akhir: moment(record.batas_akhir, 'DD-MM-YYYYTHH:mm:ssZ')
    };
    form.setFieldsValue({
      donation_image: record.donation_image,
      donation_title: record.donation_title,
      donation_description: record.donation_description,
      target_amount: isTarget
        ? record.target_amount.substring(
            0,
            record.target_amount.lastIndexOf('.')
          )
        : '0',
      is_target: isTarget ? record.is_target : '0',
      ...batasAkhir,
      is_batas: isBatas ? record.is_batas : '0'
    });
    setOptionalState({
      withTarget: isTarget,
      withDateline: isBatas
    });
  };

  const handleClickDetail = (id: number) => {
    return router.push(`/admin/donasi/detail/${id}`);
  };

  if (!userData?.currentTeam) {
    return (
      <div>
        <Alert
          message="Anda harus memilih tim terlebih dahulu untuk melihat informasi pada halaman ini"
          type="info"
          showIcon
          className="mb-6"
        />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Donasi</title>
      </Head>
      <HeaderPage
        title="Daftar Donasi"
        action={
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Tambah Donasi
          </Button>
        }
      />
      <Row className="mt-7">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Tabs color={colors.primary} defaultActiveKey="1">
              <TabPane tab="Publish" key="1">
                {publish?.length === 0 ? (
                  <NotFound />
                ) : (
                  <ListOfDonation
                    data={publish}
                    onDelete={confirmDelete}
                    onEdit={handleOpenModalToUpdate}
                    onCloseDonation={confirmCloseDonation}
                    onDetails={handleClickDetail}
                    withMenu={checkIsPremium(timRelawanData?.data.is_premium)}
                  />
                )}
              </TabPane>
              <TabPane tab="Draft" key="2">
                {draft?.length === 0 ? (
                  <NotFound />
                ) : (
                  <ListOfDonation
                    data={draft}
                    onDelete={confirmDelete}
                    onEdit={handleOpenModalToUpdate}
                    onCloseDonation={confirmCloseDonation}
                    onDetails={handleClickDetail}
                    withMenu={checkIsPremium(timRelawanData?.data.is_premium)}
                  />
                )}
              </TabPane>
            </Tabs>
          </Col>
        )}
      </Row>

      <ModalDonasi
        visible={openModal}
        onCancel={handleCancelModal}
        draggerProps={draggerProps}
        onCreate={onFinish}
        onUpdate={onUpdate}
        loading={loading}
        form={form}
        isEdit={isEdit}
        optionalState={optionalState}
        setOptionalState={handleChangeOptionalState}
      />

      <ModalConfirmation
        image={IlWarning}
        text={`Apakah kamu yakin untuk ${
          modalIsClosed ? 'membuka' : 'menutup'
        } donasi ini?`}
        visible={openModalConfir}
        onCancel={() => setOpenModalConfir(false)}
        onOk={() => handleCloseDonation(id)}
        customStyleOk={{
          danger: false,
          type: 'primary',
          size: 'large'
        }}
        customStyleCancel={{
          danger: true,
          type: 'default',
          size: 'large'
        }}
        textOk={modalIsClosed ? 'Buka' : 'Tutup'}
        textCancel="Batal"
      />

      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(id)}
      />
    </>
  );
};

DonasiPage.layout = Admin;

export default DonasiPage;
