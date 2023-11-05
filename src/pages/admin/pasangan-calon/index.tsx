import {
  Alert,
  Button,
  Col,
  Row,
  Select,
  Table,
  Typography,
  message
} from 'antd';
import {
  Gap,
  HeaderPage,
  ModalAddPasanganCalon,
  ModalConfirmation,
  Search,
  Spinner
} from '../../../components';
import { checkIsPremium, fetchWrapper, responseMessage } from '../../../utils';
import { useCurrentTeam, usePasanganCalon, useProfile } from '../../../swr';
import { useEffect, useState } from 'react';
import { usePagination, useSearch } from '../../../customHooks';

import { Admin } from '../../../layouts';
import { DraggerProps } from 'antd/lib/upload';
import Head from 'next/head';
import Image from 'next/image';
import { PaslonInterface } from '../../../@types/DataMaster';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/router';

const { Title } = Typography;

const PasanganCalon = () => {
  const [form] = useForm();

  const router = useRouter();

  const [refresh, setRefresh] = useState(true);
  const [jenisPencalonan, setJenisPencalonan] = useState('');
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [isUsung, setIsUsung] = useState(0);

  const [search, handleSearch] = useSearch('');
  const [currentPage, onChangePagination] = usePagination(1);
  const { data: timRelawanData } = useCurrentTeam(true);
  const { data: paslonData, isLoading } = usePasanganCalon(
    refresh,
    currentPage,
    search
  );
  const { data: userData, role: userRole } = useProfile(true);

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

  const hideModal = () => {
    setOpenModalCreate(false);
    setOpenModalDelete(false);
    setRefresh(false);
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append('nama_paslon', values.nama_paslon);
    formData.append('nomor_urut', values.nomor_urut);
    formData.append('paslon_profile_photo', values.paslon_profile_photo);
    values.nama_wakil_paslon &&
      formData.append('nama_wakil_paslon', values.nama_wakil_paslon);
    formData.append(
      'jenis_pencalonan',
      values.jenis_pencalonan === 'Lainnya'
        ? values.custom_jenis_pencalonan
        : values.jenis_pencalonan
    );
    formData.append('is_usung', values.is_usung ? '1' : '0');

    setLoading(true);

    // ! Dicomment karena fetchWrapper melempar ke page 400
    // fetchWrapper
    //   .post_multipart('/api/pasangan-calon', formData)
    //   .then(() => {
    //     responseMessage({
    //       type: 'success',
    //       message: 'Data berhasil ditambahkan',
    //       onHide: hideModal
    //     });
    //   })
    //   .catch(err => {
    //     responseMessage({
    //       type: 'error',
    //       message: 'Gagal menambahkan data',
    //       onHide: hideModal
    //     });
    //   })
    //   .finally(() => hideLoading());

    await axios
      .post('/api/pasangan-calon', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil ditambahkan',
          onHide: hideModal
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          responseMessage({
            type: 'error',
            message: 'Sudah ada calon legislatif yang diusung',
            onHide: hideModal
          });
        } else if (err.response && err.response.status === 403) {
          responseMessage({
            type: 'error',
            message: 'Nomor urut sudah digunakan',
            onHide: hideModal
          });
        }
      })
      .finally(() => {
        hideLoading();
        form.resetFields();
      });
  };

  const onUpdate = async (values: any) => {
    const formData = new FormData();
    formData.append('nama_paslon', values.nama_paslon);
    formData.append('nomor_urut', values.nomor_urut);
    formData.append('paslon_profile_photo', values.paslon_profile_photo);
    values.nama_wakil_paslon &&
      formData.append('nama_wakil_paslon', values.nama_wakil_paslon);
    formData.append(
      'jenis_pencalonan',
      values.jenis_pencalonan === 'Lainnya'
        ? values.custom_jenis_pencalonan
        : values.jenis_pencalonan
    );
    formData.append('is_usung', values.is_usung ? '1' : '0');

    setLoading(true);

    // ! Dicomment karena fetchWrapper melempar ke page 400
    // fetchWrapper
    //   .post_multipart(`/api/pasangan-calon?id=${id}`, formData)
    //   .then(() => {
    //     responseMessage({
    //       type: 'success',
    //       message: 'Data berhasil diubah',
    //       onHide: hideModal
    //     });
    //   })
    //   .catch(err => {
    //     responseMessage({
    //       type: 'error',
    //       message: 'Gagal mengubah data',
    //       onHide: hideModal
    //     });
    //   })
    //   .finally(() => hideLoading());

    await axios
      .post(`/api/pasangan-calon?id=${id}`, formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil ditambahkan',
          onHide: hideModal
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          responseMessage({
            type: 'error',
            message: 'Sudah ada calon legislatif yang diusung',
            onHide: hideModal
          });
        } else if (err.response && err.response.status === 403) {
          responseMessage({
            type: 'error',
            message: 'Nomor urut sudah digunakan',
            onHide: hideModal
          });
        }
      })
      .finally(() => {
        hideLoading();
        form.resetFields();
      });
  };

  const handleDelete = (id: number) => {
    // fetchWrapper
    axios
      .delete(`/api/pasangan-calon?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dihapus',
          onHide: hideModal
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          responseMessage({
            type: 'error',
            message:
              'Non aktifkan dulu calon pasangan diusung sebelum menghapus data',
            onHide: hideModal
          });
        } else if (err.response && err.response.status === 500) {
          responseMessage({
            type: 'error',
            message:
              'Data calon anggota sudah masuk perhitungan suara, dan tidak bisa dihapus',
            onHide: hideModal
          });
        }
      })
      .finally(() => hideLoading());
  };

  const confirmDelete = (id: number, isUsung: number) => {
    setIsUsung(isUsung);
    setOpenModalDelete(true);
    setId(id);
  };

  const handleOpenModalToUpdate = (record: PaslonInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    form.setFieldsValue({
      nomor_urut: record.nomor_urut,
      nama_paslon: record.nama_paslon,
      nama_wakil_paslon: record.nama_wakil_paslon,
      paslon_profile_photo: record.paslon_profile_photo,
      jenis_pencalonan: record.jenis_pencalonan,
      is_usung: record.is_usung == 1 ? true : false
    });
  };

  const onCancel = () => {
    setOpenModalCreate(false);
    setIsEdit(false);
    form.resetFields();
  };

  const columns: any = [
    {
      title: 'No',
      key: 'no',
      dataIndex: 'no',
      width: 60,
      render: (_: any, record: any, index: number) => <span>{index + 1}</span>
    },
    {
      title: 'Foto',
      dataIndex: 'paslon_profile_photo',
      width: 280,
      key: 'paslon_profile_photo',
      render: (text: string, record: PaslonInterface) => (
        <div>
          <Image
            src={text}
            width={230}
            height={230}
            objectFit="cover"
            alt={record.nama_paslon}
            className="rounded-xl mx-auto"
          />
        </div>
      )
    },
    {
      title: 'Nama',
      dataIndex: 'nama_paslon',
      width: 250,
      sorter: (a: PaslonInterface, b: PaslonInterface) =>
        a.nama_paslon.length - b.nama_paslon.length,
      key: 'nama_paslon'
    },
    {
      title: 'Nomor',
      dataIndex: 'nomor_urut',
      width: 150,
      sorter: (a: PaslonInterface, b: PaslonInterface) =>
        a.nomor_urut.length - b.nomor_urut.length,
      key: 'nomor_urut'
    },
    {
      title: 'Keterangan',
      width: 300,
      dataIndex: 'jenis_pencalonan.nama_jenis_pencalonan',
      render: (text: string, record: PaslonInterface) => (
        <p>{record.jenis_pencalonan}</p>
      )
    },
    {
      title: 'Aksi',
      width: 200,
      fixed: 'right',
      render: (text: string, record: PaslonInterface) => {
        return (
          <div>
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record)}
              disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
            >
              Edit
            </Button>
            <Gap width={16} height={2} />
            <Button
              danger
              onClick={() => confirmDelete(record.id, record.is_usung)}
              disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
            >
              Hapus
            </Button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {}, []);

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
        <title>Pasangan Calon</title>
      </Head>
      <HeaderPage
        title="Data Pasangan Calon"
        action={
          <Button type="primary" onClick={() => setOpenModalCreate(true)}>
            Tambah Paslon
          </Button>
        }
      />
      <Row className="mt-7">
        <Col xs={24}>
          <div className="flex justify-end mb-8">
            <Search value={search} onChange={handleSearch} />
          </div>
        </Col>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={paslonData?.data?.data}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey="id"
              pagination={{
                total: paslonData?.data?.total,
                current: currentPage,
                onChange: onChangePagination
              }}
            />
          </Col>
        )}
      </Row>

      {/* Modal Tambah Data */}
      <ModalAddPasanganCalon
        visible={openModalCreate}
        onCancel={onCancel}
        draggerProps={draggerProps}
        onCreate={onFinish}
        onUpdate={onUpdate}
        loading={loading}
        form={form}
        jenisPencalonan={jenisPencalonan}
        setJenisPencalonan={setJenisPencalonan}
        isEdit={isEdit}
        isLegislatif={false}
      />
      {/* Modal Tambah Data */}

      {/* Modal Hapus */}
      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(id)}
        isUsung={isUsung}
      />
      {/* Modal Hapus */}
    </>
  );
};

PasanganCalon.layout = Admin;

export default PasanganCalon;
