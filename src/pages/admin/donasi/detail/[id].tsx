import { Alert, Button, Col, message, Row, Table, Tabs } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlokasiDonasiInterface,
  DonasiDonorInterface
} from '../../../../@types/Donasi';
import { IlWarning } from '../../../../assets';
import {
  DonationItem,
  Gap,
  HeaderPage,
  ModalAlokasiDonasi,
  ModalConfirmation,
  ModalDonasi,
  ModalRiwayatDonasi,
  Spinner
} from '../../../../components';
import { STATUS_PAYMENT } from '../../../../constant';
import { ADD_ON, PERMISSION } from '../../../../constant/contract';
import { Admin } from '../../../../layouts';
import {
  useAlokasiDonasi,
  useCurrentTeam,
  useDetailDonasi,
  useProfile,
  useRiwayatDonasi,
  useVirtualAccount
} from '../../../../swr';
import { colors } from '../../../../theme';
import {
  calculateDayLeft,
  checkPermissionArray,
  currencyFormat,
  dateFormat,
  distinctAddOns,
  fetchWrapper,
  RenderIf,
  responseMessage
} from '../../../../utils';

const { TabPane } = Tabs;
const DonationDetailPage = () => {
  const [form] = useForm();
  const [formAlocation] = useForm();
  const [formHistory] = useForm();

  const router = useRouter();
  const [refresh, setRefresh] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openModalAlocation, setOpenModalAlocation] = useState(false);
  const [openModalHistory, setOpenModalHistory] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalConfir, setOpenModalConfir] = useState(false);
  const [modalIsClosed, setModalIsClosed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAlocationDetail, setIsAlocationDetail] = useState(false);
  const [id, setId] = useState<any>(0);
  const [idAlocation, setIdAlocation] = useState<any>(0);
  const [optionalState, setOptionalState] = useState<{
    withTarget: boolean;
    withDateline: boolean;
  }>({
    withTarget: false,
    withDateline: false
  });

  // swr
  const { data: donasiDetail, isLoading: isLoadingDetail } = useDetailDonasi(
    refresh,
    id
  );
  const { data: alokasiDonasi, isLoading: isLoadingAlokasi } = useAlokasiDonasi(
    refresh,
    id
  );
  const { data: riwayatDonasi, isLoading: isLoadingRiwayat } = useRiwayatDonasi(
    refresh,
    id
  );
  const { data: virtualAccounts } = useVirtualAccount(true);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);

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

  const onReset = () => {
    formAlocation.resetFields();
    form.resetFields();
    formHistory.resetFields();
    setIsEdit(false);
  };

  const handleCloseModal = () => {
    onReset();
    setOpenModal(false);
    setOpenModalAlocation(false);
    setOpenModalHistory(false);
    setOpenModalDelete(false);
    setIsAlocationDetail(false);
  };

  const hideModal = () => {
    setOpenModal(false);
    setOpenModalAlocation(false);
    setOpenModalHistory(false);
    setOpenModalConfir(false);
    setRefresh(false);
    onReset();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onFinish = (values: any) => {};

  const onFinishHistory = (values: any) => {
    values.donation_id = id;
    setLoading(true);
    fetchWrapper
      .post(`/api/donasi/riwayat-donasi`, values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Tarik dana berhasil',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal tarik dana',
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

  const onCreateAlocation = (values: any) => {
    const formData = new FormData();
    formData.append('bukti_alokasi', values.bukti_alokasi);
    formData.append('keterangan', values.keterangan);
    formData.append('nominal', values.nominal);
    formData.append('donation_id', id);

    setLoading(true);
    fetchWrapper
      .post_multipart('/api/donasi/alokasi-donasi', formData)
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

  const onUpdateAlocation = (values: any) => {
    const formData = new FormData();
    formData.append('bukti_alokasi', values.bukti_alokasi);
    formData.append('keterangan', values.keterangan);
    formData.append('nominal', values.nominal);

    setLoading(true);
    fetchWrapper
      .put_multipart(`/api/donasi/alokasi-donasi?id=${idAlocation}`, formData)
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

  const handleDelete = () => {
    fetchWrapper
      .delete(`/api/donasi?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Donasi berhasil dihapus',
          onHide: hideModal
        });

        router.back();
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

  const confirmDelete = () => {
    setOpenModalDelete(true);
  };

  const handleCloseDonation = (id: any) => {
    fetchWrapper
      .post(`/api/donasi/open-close?id=${id}`, {})
      .then(() => {
        responseMessage({
          type: 'success',
          message: `Donasi berhasil ${modalIsClosed ? 'dibuka' : 'ditutup'}`,
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: `Gagal ${modalIsClosed ? 'membuka' : 'menutup'} donasi`,
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

  const handleClickDetail = () => {
    return router.push(`/admin/donasi/detail/${id}`);
  };

  const handleOpenModaltoDetail = (record: AlokasiDonasiInterface) => {
    formAlocation.setFieldsValue({
      bukti_alokasi: record?.bukti_alokasi,
      nominal: +record?.nominal,
      keterangan: record?.keterangan
    });
    setIsAlocationDetail(true);
    setOpenModalAlocation(true);
  };

  const handleOpenModaltoUpdateAlocation = (record: AlokasiDonasiInterface) => {
    formAlocation.setFieldsValue({
      bukti_alokasi: record?.bukti_alokasi,
      nominal: +record?.nominal,
      keterangan: record?.keterangan
    });
    setIsEdit(true);
    setOpenModalAlocation(true);
    setIdAlocation(record.id);
  };

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    beforeUpload: file => {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isPNG) {
        message.error('Format tidak didukung! Masukkan file .png atau .jpg', 3);
      }

      const isSizeValid = file.size <= 2 * 1024 * 1024; // 2MB in bytes
      if (!isSizeValid) {
        message.error('Ukuran gambar tidak boleh lebih dari 2MB', 3);
      }

      return isPNG && isSizeValid;
    },
    maxCount: 1
  };

  const columns = [
    {
      title: 'No',
      key: 'no',
      dataIndex: 'index',
      render: (text: string, record: any, index: number) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: 'Tanggal Donasi',
      key: 'tanggal_donasi',
      dataIndex: 'updated_at',
      render: (text: string) => <span>{dateFormat(text)}</span>,
      sorter: (a: DonasiDonorInterface, b: DonasiDonorInterface) =>
        a.name.length - b.name.length
    },
    {
      title: 'Nama Donatur',
      key: 'nama_donatur',
      dataIndex: 'name',
      render: (text: string) => <span>{text}</span>,
      sorter: (a: DonasiDonorInterface, b: DonasiDonorInterface) =>
        a.name.length - b.name.length
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (text: string) => <span>{text}</span>,
      sorter: (a: DonasiDonorInterface, b: DonasiDonorInterface) =>
        a.email.length - b.email.length
    },
    {
      title: 'Pesan',
      key: 'pesan',
      dataIndex: 'message',
      render: (text: string) => <span>{text}</span>,
      sorter: (a: DonasiDonorInterface, b: DonasiDonorInterface) =>
        a.message.length - b.message.length
    },
    {
      title: 'Nominal',
      key: 'nominal',
      dataIndex: 'amount',
      render: (text: string) => <span>{currencyFormat(+text)}</span>,
      sorter: (a: DonasiDonorInterface, b: DonasiDonorInterface) =>
        a.amount.length - b.amount.length
    }
  ];

  const alocationColumns: any = [
    {
      title: 'No',
      key: 'no',
      dataIndex: 'no',
      render: (_: any, record: AlokasiDonasiInterface, index: number) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: 'Tanggal',
      key: 'tanggal',
      dataIndex: 'created_at',
      render: (text: string) => <span>{dateFormat(text)}</span>
    },
    {
      title: 'Keterangan',
      key: 'keterangan',
      dataIndex: 'keterangan'
    },
    {
      title: 'Nominal',
      key: 'nominal',
      dataIndex: 'nominal',
      render: (text: string) => <span>{currencyFormat(+text)}</span>
    },
    {
      title: 'Aksi',
      key: 'aksi',
      fixed: 'right',
      width: 200,
      render: (_: any, record: AlokasiDonasiInterface) => (
        <Row gutter={[16, 16]}>
          <Col>
            <Button onClick={() => handleOpenModaltoDetail(record)}>
              Lihat Bukti
            </Button>
          </Col>
          <Col>
            <Button
              className="ant-btn-success"
              onClick={() => handleOpenModaltoUpdateAlocation(record)}
            >
              Edit
            </Button>
          </Col>
        </Row>
      )
    }
  ];

  const historyColumns = [
    {
      title: 'Tanggal',
      key: 'tanggal',
      dataIndex: 'created_at',
      render: (text: string) => <span>{dateFormat(text)}</span>
    },
    {
      title: 'Bank',
      key: 'bank',
      dataIndex: 'bank_code'
    },
    {
      title: 'No. Rekening',
      key: 'no_rek',
      dataIndex: 'account_number'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text: string) => {
        if (text === STATUS_PAYMENT.Pending) {
          return <span className="text-sm text-warning">Diproses</span>;
        }

        if (text === STATUS_PAYMENT.Claimed) {
          return <span className="text-sm text-success">Berhasil</span>;
        }

        if (text === STATUS_PAYMENT.Rejected) {
          return <span className="text-sm text-danger">Gagal</span>;
        }

        return <span className="text-sm text-black">-</span>;
      }
    },
    {
      title: 'Nominal',
      key: 'nominal',
      dataIndex: 'amount',
      render: (text: string) => <span>{currencyFormat(+text)}</span>
    }
  ];

  useEffect(() => {
    setId(router.query.id);
    setModalIsClosed(donasiDetail?.data.is_close == '1');
  }, [router, donasiDetail]);

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

  const TabDonationResult = () => (
    <Row gutter={[24, 24]}>
      {isLoadingDetail ? (
        <div className="flex items-center justify-center w-full h-96">
          <Spinner />
        </div>
      ) : (
        <>
          <Col xs={24}>
            <DonationItem
              imageSrc={donasiDetail?.data?.donation_image}
              title={donasiDetail?.data?.donation_title}
              onDelete={() => confirmDelete()}
              onEdit={() => handleOpenModalToUpdate(donasiDetail?.data)}
              onCloseDonation={() =>
                confirmCloseDonation(
                  donasiDetail?.data?.id,
                  donasiDetail?.data.is_close == '1'
                )
              }
              onDetails={() => handleClickDetail()}
              description={donasiDetail?.data.donation_description}
              collectedFundsFrom={currencyFormat(
                +donasiDetail?.data.target_amount
              )}
              collectedFundsNow={currencyFormat(
                +donasiDetail?.data?.total_amount
              )}
              progress={
                (+donasiDetail?.data?.total_amount /
                  +donasiDetail?.data?.target_amount) *
                100
              }
              totalDonors={donasiDetail?.data?.donation_donors?.length}
              dayLeft={calculateDayLeft(
                moment(),
                moment(donasiDetail?.data.batas_akhir, 'DD-MM-YYYYTHH:mm:ssZ')
              )}
              tag="div"
              isClosed={donasiDetail?.data?.is_close}
              className="mx-auto xl:max-w-1200"
              imgSectionColSize={{
                xs: 24,
                sm: 14,
                md: 9,
                lg: 8,
                xl: 7
              }}
              contentSectionColSize={{
                xs: 24,
                sm: 10,
                md: 15,
                lg: 16,
                xl: 17
              }}
            />
          </Col>
          <Col xs={24}>
            <h2 className="mb-6 text-2xl font-bold">Hasil Donasi</h2>
            <Table
              dataSource={donasiDetail?.data?.donation_donors}
              columns={columns}
              className="mb-16"
              scroll={{ x: 1000 }}
            />
          </Col>
        </>
      )}
    </Row>
  );

  const TabAlocation = () => (
    <Row gutter={[24, 24]}>
      <Col xs={24}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Alokasi Dana</h2>
          <Button type="primary" onClick={() => setOpenModalAlocation(true)}>
            Alokasi Dana
          </Button>
        </div>
      </Col>
      {isLoadingAlokasi ? (
        <div className="flex items-center justify-center w-full h-96">
          <Spinner />
        </div>
      ) : (
        <Col xs={24}>
          <Table
            dataSource={alokasiDonasi?.data?.alokasi_donations}
            columns={alocationColumns}
            scroll={{ x: 1000 }}
          />
        </Col>
      )}
    </Row>
  );

  const TabHistory = () => (
    <Row gutter={[24, 24]}>
      <Col xs={24}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Riwayat Penarikan Dana</h2>
          <RenderIf
            isTrue={checkPermissionArray({
              roles: listPermission,
              idRole: PERMISSION.create_request_wd_donasi
            })}
          >
            <Button type="primary" onClick={() => setOpenModalHistory(true)}>
              Tarik Dana
            </Button>
          </RenderIf>
        </div>
      </Col>
      {isLoadingRiwayat ? (
        <div className="flex items-center justify-center w-full h-96">
          <Spinner />
        </div>
      ) : (
        <Col xs={24}>
          <Table
            dataSource={riwayatDonasi?.data?.donation_outs}
            columns={historyColumns}
            scroll={{ x: 1000 }}
          />
        </Col>
      )}
    </Row>
  );

  return (
    <>
      <Head>
        <title>Detail | Donasi</title>
      </Head>
      <HeaderPage
        withArrowBack
        title="Detail Donasi"
        action={
          <div className="flex items-center justify-end">
            <Button onClick={() => handleOpenModalToUpdate(donasiDetail?.data)}>
              Edit
            </Button>
            <Gap width={16} height={10} />
            <Button
              danger={!modalIsClosed}
              onClick={() =>
                confirmCloseDonation(
                  donasiDetail?.data.id,
                  donasiDetail?.data.is_close == '1'
                )
              }
            >
              {modalIsClosed ? 'Buka' : 'Tutup'} Donasi
            </Button>
          </div>
        }
      />
      <Row>
        <Col xs={24}>
          <Tabs color={colors.primary}>
            <TabPane tab="Hasil Donasi" key="1">
              <TabDonationResult />
            </TabPane>
            <TabPane tab="Alokasi Dana" key="2">
              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.crud_alokasi_dana
                })}
              >
                <TabAlocation />
              </RenderIf>
            </TabPane>
            <TabPane tab="Riwayat Penarikan" key="3">
              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.riwayat_hasil_donasi
                })}
              >
                <TabHistory />
              </RenderIf>
            </TabPane>
          </Tabs>
        </Col>
      </Row>

      <ModalDonasi
        visible={openModal}
        onCancel={handleCloseModal}
        draggerProps={draggerProps}
        onCreate={onFinish}
        onUpdate={onUpdate}
        loading={loading}
        form={form}
        isEdit={isEdit}
        optionalState={optionalState}
        setOptionalState={handleChangeOptionalState}
      />

      <ModalAlokasiDonasi
        visible={openModalAlocation}
        onCancel={handleCloseModal}
        draggerProps={draggerProps}
        onCreate={onCreateAlocation}
        onUpdate={onUpdateAlocation}
        loading={loading}
        form={formAlocation}
        isEdit={isEdit}
        isDetail={isAlocationDetail}
      />

      <ModalRiwayatDonasi
        visible={openModalHistory}
        onCancel={handleCloseModal}
        onFinish={onFinishHistory}
        virtualAccounts={virtualAccounts}
        loading={loading}
        form={formHistory}
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
        onOk={() => handleDelete()}
      />
    </>
  );
};

DonationDetailPage.layout = Admin;

export default DonationDetailPage;
