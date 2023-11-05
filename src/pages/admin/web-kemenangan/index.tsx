import { Alert, Button, Col, message, Row, Table, Tabs } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { DraggerProps } from 'antd/lib/upload';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  GaleriInterface,
  ParpolInterface,
  PengalamanKerjaInterface
} from '../../../@types/Kemenangan';
import {
  Gap,
  HeaderPage,
  ModalConfirmation,
  ModalGallery,
  TabAboutCalonComp,
  TabContactPersonComp
} from '../../../components';
import { PERMISSION } from '../../../constant/contract';
import { Admin } from '../../../layouts';
import {
  useCurrentTeam,
  useGaleriCalon,
  useKontakCalon,
  useProfile,
  useTentangCalon
} from '../../../swr';
import useSosialMediaCalon from '../../../swr/kemenangan/use-sosial-media';
import { colors } from '../../../theme';
import {
  checkIsPremium,
  checkPermissionArray,
  fetchWrapper,
  RenderIf,
  responseMessage
} from '../../../utils';

const ModalConfirmationGallery = ModalConfirmation;
const ModalConfirmationParpol = ModalConfirmation;
const ModalConfirmationPengalaman = ModalConfirmation;

const { TabPane } = Tabs;

const WebKemenanganPage = () => {
  // state
  const [refresh, setRefresh] = useState(true);

  // router
  const router = useRouter();

  // form
  const [formBackground] = useForm();
  const [formInfoCalon] = useForm();
  const [formFotoCalon] = useForm();
  const [formVisi] = useForm();
  const [formMisi] = useForm();
  const [formProker] = useForm();
  const [formTema] = useForm();
  const [formGaleri] = useForm();
  const [formContactPerson] = useForm();
  const [formSocialMedia] = useForm();
  const [formParpol] = useForm();
  const [formPengalamanKerja] = useForm();

  // state
  const [openModalGaleri, setOpenModalGaleri] = useState(false);
  const [openModalParpol, setOpenModalParpol] = useState(false);
  const [openModalPengalamanKerja, setOpenModalPengalamanKerja] =
    useState(false);
  const [openModalDeleteGallery, setOpenModalDeleteGallery] = useState(false);
  const [openModalDeleteParpol, setOpenModalDeleteParpol] = useState(false);
  const [openModalDeletePengalaman, setOpenModalDeletePengalaman] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);

  // swr
  const { data: tentangCalonData } = useTentangCalon(refresh);
  const { data: kontakCalonData } = useKontakCalon(refresh);
  const { data: sosialMediaData } = useSosialMediaCalon(refresh);
  const { data: galeriData } = useGaleriCalon(refresh);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);
  const { data: userData, role: userRole } = useProfile(true);

  // Modal
  const hideModal = (callaback: () => void) => {
    setRefresh(false);
    callaback();
  };

  const onCancelGaleri = () => {
    setOpenModalGaleri(false);
    setIsEdit(false);
    formGaleri.resetFields();
  };

  const onCancelParpol = () => {
    setOpenModalParpol(false);
    setIsEdit(false);
    formParpol.resetFields();
  };

  const onCancelPengalamanKerja = () => {
    setOpenModalPengalamanKerja(false);
    setIsEdit(false);
    formPengalamanKerja.resetFields();
  };
  // Modal

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onUpdateBackground = async (values: any, callback: () => void) => {
    const formData = new FormData();

    formData.append(
      'background_web_kemenangan',
      values.background_web_kemenangan
    );

    await axios
      .post('/api/kemenangan/tentang-calon/background', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        // console.log(err.response);
        if (err.response && err.response.status === 400) {
          const validationErrors = err.response.data.data.error;

          const errorMessages = Object.keys(validationErrors).map(key => {
            return `${validationErrors[key]}`;
          });

          errorMessages.forEach(errorMessage => {
            responseMessage({
              type: 'error',
              message: `${errorMessage}`,
              onHide: () => hideModal(callback)
            });
          });
        } else {
          responseMessage({
            type: 'error',
            message: err.response.data.data.message,
            onHide: () => hideModal(callback)
          });
        }
      })
      .finally(() => hideLoading());
  };

  const onUpdateInfoCalon = (values: any, callback: () => void) => {
    setLoading(true);
    fetchWrapper
      .post('/api/kemenangan/tentang-calon/info', values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };

  const onUpdateFotoCalon = async (values: any, callback: () => void) => {
    const formData = new FormData();

    formData.append(
      'foto_calon_web_kemenangan',
      values.foto_calon_web_kemenangan
    );

    setLoading(true);
    await axios
      .post('/api/kemenangan/tentang-calon/foto-calon', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        // console.log(err.response);
        if (err.response && err.response.status === 400) {
          const validationErrors = err.response.data.data.error;

          const errorMessages = Object.keys(validationErrors).map(key => {
            return `${validationErrors[key]}`;
          });

          errorMessages.forEach(errorMessage => {
            responseMessage({
              type: 'error',
              message: `${errorMessage}`,
              onHide: () => hideModal(callback)
            });
          });
        } else {
          responseMessage({
            type: 'error',
            message: err.response.data.data.message,
            onHide: () => hideModal(callback)
          });
        }
      })
      .finally(() => hideLoading());
  };

  const onUpdateVisi = (values: any, callback: () => void) => {
    setLoading(true);
    fetchWrapper
      .post('/api/kemenangan/tentang-calon/visi', values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };

  const onUpdateMisi = (values: any, callback: () => void) => {
    setLoading(true);
    fetchWrapper
      .post('/api/kemenangan/tentang-calon/misi', {
        misi: values.misi
      })
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };

  const onUpdateProker = (values: any, callback: () => void) => {
    // console.log('on update Proker', values);
    setLoading(true);
    fetchWrapper
      .post('/api/kemenangan/tentang-calon/program-kerja', {
        isi_proker: values.prokers
      })
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };

  const onUpdateTema = (values: any, callback: () => void) => {
    setLoading(true);
    fetchWrapper
      .post('/api/kemenangan/tentang-calon/tema-warna', values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };

  const onUpdateContactPerson = (values: any, callback: () => void) => {
    setLoading(true);
    fetchWrapper
      .post('/api/kemenangan/kontak', values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };

  const onUpdateSocialMedia = (values: any, callback: () => void) => {
    setLoading(true);
    fetchWrapper
      .post('/api/kemenangan/kontak/sosial-media', values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };

  //! Gallery
  const onCreateGaleri = async (values: any, callback: () => void) => {
    const formData = new FormData();

    formData.append('foto_galeri_paslon', values.foto_galeri_paslon);
    formData.append('keterangan', values.keterangan);

    setLoading(true);
    await axios
      .post('/api/kemenangan/galeri', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        // console.log(err.response);
        if (err.response && err.response.status === 400) {
          const validationErrors = err.response.data.data.error;

          const errorMessages = Object.keys(validationErrors).map(key => {
            return `${validationErrors[key]}`;
          });

          errorMessages.forEach(errorMessage => {
            responseMessage({
              type: 'error',
              message: `${errorMessage}`,
              onHide: () => hideModal(callback)
            });
          });
        } else {
          responseMessage({
            type: 'error',
            message: err.response.data.data.message,
            onHide: () => hideModal(callback)
          });
        }
      })
      .finally(() => hideLoading());
  };

  const onUpdateGaleri = async (values: any, callback: () => void) => {
    const formData = new FormData();
    formData.append('foto_galeri_paslon', values.foto_galeri_paslon);
    formData.append('keterangan', values.keterangan);

    setLoading(true);
    await axios
      .post(`/api/kemenangan/galeri?id=${id}`, formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        // console.log(err.response);
        if (err.response && err.response.status === 400) {
          const validationErrors = err.response.data.data.error;

          const errorMessages = Object.keys(validationErrors).map(key => {
            return `${validationErrors[key]}`;
          });

          errorMessages.forEach(errorMessage => {
            responseMessage({
              type: 'error',
              message: `${errorMessage}`,
              onHide: () => hideModal(callback)
            });
          });
        } else {
          responseMessage({
            type: 'error',
            message: err.response.data.data.message,
            onHide: () => hideModal(callback)
          });
        }
      })
      .finally(() => hideLoading());
  };

  const handleDeleteGallery = (id: number) => {
    fetchWrapper
      .delete(`/api/kemenangan/galeri?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dihapus',
          onHide: () => hideModal(() => setOpenModalDeleteGallery(false))
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menghapus data',
          onHide: () => hideModal(() => setOpenModalDeleteGallery(false))
        });
      })
      .finally(() => hideLoading());
  };

  const confirmDeleteGallery = (id: number) => {
    setOpenModalDeleteGallery(true);
    setId(id);
  };

  const handleOpenModalToUpdateGallery = (record: GaleriInterface) => {
    setId(record.id);
    setOpenModalGaleri(true);
    setIsEdit(true);
    formGaleri.setFieldsValue({
      foto_galeri_paslon: record.foto_galeri_paslon,
      keterangan: record.keterangan
    });
  };
  //! Gallery

  //! Parpol
  const onCreateParpol = (values: any, callback: () => void) => {
    const formData = new FormData();

    formData.append('foto_parpol', values.foto_parpol);
    formData.append('nama_parpol', values.nama_parpol);

    setLoading(true);
    fetchWrapper
      .post_multipart('/api/kemenangan/tentang-calon/parpol', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dibuat',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal membuat data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };
  const onUpdateParpol = (values: any, callback: () => void) => {
    const formData = new FormData();

    formData.append('foto_parpol', values.foto_parpol);
    formData.append('nama_parpol', values.nama_parpol);

    setLoading(true);
    fetchWrapper
      .post_multipart(`/api/kemenangan/tentang-calon/parpol?id=${id}`, formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };
  const handleDeleteParpol = (id: number) => {
    fetchWrapper
      .delete(`/api/kemenangan/tentang-calon/parpol?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dihapus',
          onHide: () => hideModal(() => setOpenModalDeleteParpol(false))
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menghapus data',
          onHide: () => hideModal(() => setOpenModalDeleteParpol(false))
        });
      })
      .finally(() => hideLoading());
  };

  const confirmDeleteParpol = (id: number) => {
    setOpenModalDeleteParpol(true);
    setId(id);
  };

  const handleOpenModalToUpdateParpol = (record: any) => {
    setId(record.id);
    setOpenModalParpol(true);
    setIsEdit(true);
    formParpol.setFieldsValue({
      foto_parpol: record.foto_parpol,
      nama_parpol: record.nama_parpol
    });
  };
  //! Parpol

  //! Pengalaman Kerja
  const onCreatePengalamanKerja = (values: any, callback: () => void) => {
    setLoading(true);
    fetchWrapper
      .post(`/api/kemenangan/tentang-calon/pengalaman-kerja`, values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dibuat',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal diubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };
  const onUpdatePengalamanKerja = (values: any, callback: () => void) => {
    setLoading(true);
    fetchWrapper
      .post(`/api/kemenangan/tentang-calon/pengalaman-kerja?id=${id}`, values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: () => hideModal(callback)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah data',
          onHide: () => hideModal(callback)
        });
      })
      .finally(() => hideLoading());
  };

  const handleDeletePengalamanKerja = (id: number) => {
    fetchWrapper
      .delete(`/api/kemenangan/tentang-calon/pengalaman-kerja?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dihapus',
          onHide: () => hideModal(() => setOpenModalDeletePengalaman(false))
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menghapus data',
          onHide: () => hideModal(() => setOpenModalDeletePengalaman(false))
        });
      })
      .finally(() => hideLoading());
  };

  const confirmDeletePengalamanKerja = (id: number) => {
    setOpenModalDeletePengalaman(true);
    setId(id);
  };

  const handleOpenModalToUpdatePengalamanKerja = (
    record: PengalamanKerjaInterface
  ) => {
    setOpenModalPengalamanKerja(true);
    setIsEdit(true);
    formPengalamanKerja.setFieldsValue({
      name: record.name,
      detail_pengalaman: record.detail_pengalaman
    });
    setId(record?.id);
  };
  //! Pengalaman Kerja

  // dragger props
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

  // columns
  const columns: any = [
    {
      title: 'Foto',
      dataIndex: 'foto_galeri_paslon',
      key: 'foto_galeri_paslon',
      render: (src: string, record: GaleriInterface) => (
        <div>
          <Image
            src={src}
            width={300}
            height={300}
            objectFit="contain"
            alt={record.keterangan}
          />
        </div>
      )
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan',
      key: 'keterangan'
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (text: any, record: GaleriInterface) => (
        <div>
          <Button
            className="border-success hover:border-success text-success hover:text-success"
            onClick={() => handleOpenModalToUpdateGallery(record)}
            disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
          >
            Edit
          </Button>
          <Gap width={16} height={2} />
          <Button
            danger
            onClick={() => confirmDeleteGallery(record.id)}
            disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
          >
            Hapus
          </Button>
        </div>
      )
    }
  ];

  const columnsParpol: any = [
    {
      title: 'Foto',
      dataIndex: 'foto_parpol',
      width: 200,
      key: 'foto_parpol',
      render: (src: string, record: ParpolInterface) => (
        <div>
          <Image
            src={src}
            width={80}
            height={80}
            objectFit="cover"
            alt={record.nama_parpol}
          />
        </div>
      )
    },
    {
      title: 'Nama Parpol',
      dataIndex: 'nama_parpol',
      key: 'nama_parpol'
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (text: any, record: ParpolInterface) => (
        <div>
          <Button
            className="border-success hover:border-success text-success hover:text-success"
            onClick={() => handleOpenModalToUpdateParpol(record)}
          >
            Edit
          </Button>
          <Gap width={16} height={2} />
          <Button danger onClick={() => confirmDeleteParpol(record.id)}>
            Hapus
          </Button>
        </div>
      )
    }
  ];

  const columnsPengalamanKerja: any = [
    {
      title: 'Nama Calon',
      dataIndex: 'name',
      width: 200,
      key: ''
    },
    {
      title: 'Pengalaman Kerja',
      dataIndex: '',
      key: '',
      render: (_: any, record: PengalamanKerjaInterface) => (
        <ul>
          {record?.detail_pengalaman?.map((item, index) => (
            <li key={item?.id}>{`${index + 1}. ${item?.description} (${
              item?.start
            } - ${item?.end})`}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Aksi',
      key: 'aksi',
      width: 200,
      render: (text: any, record: any) => (
        <div>
          <Button
            className="border-success hover:border-success text-success hover:text-success"
            onClick={() => handleOpenModalToUpdatePengalamanKerja(record)}
          >
            Edit
          </Button>
          <Gap width={16} height={2} />
          <Button
            danger
            onClick={() => confirmDeletePengalamanKerja(record.id)}
          >
            Hapus
          </Button>
        </div>
      )
    }
  ];

  // tabs
  const TabsAboutCalon = () => (
    <TabAboutCalonComp
      listPermission={listPermission}
      tentangCalonData={tentangCalonData}
      formBackground={formBackground}
      onUpdateBackground={onUpdateBackground}
      formInfoCalon={formInfoCalon}
      onUpdateInfoCalon={onUpdateInfoCalon}
      openModalParpol={openModalParpol}
      onCancelParpol={onCancelParpol}
      draggerProps={draggerProps}
      onCreateParpol={onCreateParpol}
      onUpdateParpol={onUpdateParpol}
      loading={loading}
      formParpol={formParpol}
      isEdit={isEdit}
      setOpenModalParpol={setOpenModalParpol}
      columnsParpol={columnsParpol}
      formVisi={formVisi}
      onUpdateVisi={onUpdateVisi}
      formMisi={formMisi}
      onUpdateMisi={onUpdateMisi}
      formProker={formProker}
      onUpdateProker={onUpdateProker}
      formFotoCalon={formFotoCalon}
      onUpdateFotoCalon={onUpdateFotoCalon}
      formTema={formTema}
      onUpdateTema={onUpdateTema}
      isDisable={!checkIsPremium(timRelawanData?.data.is_premium)}
      pengalamanKerja={{
        columnsPengalamanKerja,
        pengalamanKerjaData:
          tentangCalonData?.data?.tentang_paslon?.pengalaman_kerja,
        openModalPengalamanKerja,
        onCancelPengalamanKerja,
        onCreatePengalamanKerja,
        onUpdatePengalamanKerja,
        formPengalamanKerja,
        loadingPengalamanKerja: false,
        setOpenModalPengalamanKerja
      }}
    />
  );

  const TabsGallery = () => (
    <>
      <div className="mb-6">
        <Button
          type="primary"
          onClick={() => setOpenModalGaleri(true)}
          disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
        >
          Tambah Galeri
        </Button>
      </div>
      <Table
        dataSource={galeriData?.data}
        columns={columns}
        scroll={{ x: 800 }}
      />
      <ModalGallery
        visible={openModalGaleri}
        onCancel={onCancelGaleri}
        draggerProps={draggerProps}
        onCreate={onCreateGaleri}
        onUpdate={onUpdateGaleri}
        loading={loading}
        form={formGaleri}
        isEdit={isEdit}
      />
    </>
  );

  const TabsContactPerson = () => (
    <TabContactPersonComp
      listPermission={listPermission}
      kontakCalonData={kontakCalonData}
      formContactPerson={formContactPerson}
      onUpdateContactPerson={onUpdateContactPerson}
      sosialMediaData={sosialMediaData}
      formSocialMedia={formSocialMedia}
      onUpdateSocialMedia={onUpdateSocialMedia}
      isDisable={!checkIsPremium(timRelawanData?.data.is_premium)}
    />
  );

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
        <title>Web Kemenangan | Pengaturan</title>
      </Head>
      <HeaderPage
        title="Pengaturan Halaman Kemenangan"
        action={
          <RenderIf
            isTrue={checkPermissionArray({
              roles: listPermission,
              idRole: PERMISSION.view_halaman_kemenangan
            })}
          >
            <Button
              type="default"
              onClick={() =>
                window.open(
                  `/kemenangan/${tentangCalonData?.data?.tentang_paslon?.slug}`
                )
              }
              disabled={!tentangCalonData?.data?.tentang_paslon?.slug}
            >
              Lihat Halaman
            </Button>
          </RenderIf>
        }
      />
      <Row>
        <Col xs={24}>
          <Alert
            message="Pastikan Anda telah menambahkan Paslon yang diusung di menu Pasangan Calon"
            type="info"
            showIcon
            className="mb-6"
          />
        </Col>
        <Col xs={24}>
          <Tabs color={colors.primary}>
            <TabPane tab="Tentang Calon" key="1">
              <TabsAboutCalon />
            </TabPane>
            <TabPane tab="Galeri" key="2">
              <RenderIf
                isTrue={checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.crud_galeri_paslon
                })}
              >
                <TabsGallery />
              </RenderIf>
            </TabPane>
            <TabPane tab="Contact Person" key="3">
              <RenderIf
                isTrue={
                  checkPermissionArray({
                    roles: listPermission,
                    idRole: PERMISSION.crud_contact
                  }) ||
                  checkPermissionArray({
                    roles: listPermission,
                    idRole: PERMISSION.crud_social_media
                  })
                }
              >
                <TabsContactPerson />
              </RenderIf>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      {/* Modal Hapus */}
      <ModalConfirmationGallery
        visible={openModalDeleteGallery}
        onCancel={() => setOpenModalDeleteGallery(false)}
        onOk={() => handleDeleteGallery(id)}
      />
      {/* Modal Hapus */}
      {/* Modal Hapus */}
      <ModalConfirmationParpol
        visible={openModalDeleteParpol}
        onCancel={() => setOpenModalDeleteParpol(false)}
        onOk={() => handleDeleteParpol(id)}
      />
      {/* Modal Hapus */}
      {/* Modal Hapus */}
      <ModalConfirmationPengalaman
        visible={openModalDeletePengalaman}
        onCancel={() => setOpenModalDeletePengalaman(false)}
        onOk={() => handleDeletePengalamanKerja(id)}
      />
      {/* Modal Hapus */}
    </>
  );
};

WebKemenanganPage.layout = Admin;

export default WebKemenanganPage;
