import { Alert, Button, Col, message, Row, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { CalonAnggotaInterface } from '../../../@types/DataMaster';
import {
  Gap,
  HeaderPage,
  ModalAddCalonAnggota,
  ModalConfirmation,
  Search,
  Spinner
} from '../../../components';
import { usePagination, useSearch } from '../../../customHooks';
import AdminLayout from '../../../layouts/Admin';
import { useCalonAnggota, usePartai, useProfile } from '../../../swr';
import { debugValues, fetchWrapper, responseMessage } from '../../../utils';

const CalonAnggota = () => {
  const [form] = useForm();

  const [jenisPencalonan, setJenisPencalonan] = useState('');

  const [refresh, setRefresh] = useState(true);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [isUsung, setIsUsung] = useState(0);

  const [search, handleSearch] = useSearch('');
  const [currentPage, onChangePagination] = usePagination(1);

  const { data: calonAnggotaData, isLoading } = useCalonAnggota({
    mounted: refresh,
    page: currentPage,
    search
  });
  const { data: partaiData } = usePartai(true, '1');

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
    onCancel();
    setRefresh(false);
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onCancel = () => {
    setOpenModalCreate(false);
    setOpenModalDelete(false);
    setIsEdit(false);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append('nama_calon', values.nama_calon);
    formData.append('no_urut', values.no_urut);
    formData.append('foto', values.foto);
    formData.append('id_partai', values.id_partai);
    formData.append(
      'jenis_pencalonan',
      values.jenis_pencalonan === 'Lainnya'
        ? values.custom_jenis_pencalonan
        : values.jenis_pencalonan
    );
    formData.append('is_usung', values.is_usung ? '1' : '0');

    setLoading(true);

    // ! Dicomment karena fetchWrapper melempar error ke page 400
    // fetchWrapper
    //   .post_multipart('/api/calon-anggota', formData)
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
      .post('/api/calon-anggota', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
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
      .finally(() => hideLoading());
  };

  const onUpdate = async (values: any) => {
    const formData = new FormData();
    formData.append('nama_calon', values.nama_calon);
    formData.append('no_urut', values.no_urut);
    typeof values.foto !== 'string' && formData.append('foto', values.foto);
    formData.append('id_partai', values.id_partai);
    formData.append(
      'jenis_pencalonan',
      values.jenis_pencalonan === 'Lainnya'
        ? values.custom_jenis_pencalonan
        : values.jenis_pencalonan
    );
    formData.append('is_usung', values.is_usung ? '1' : '0');

    setLoading(true);

    // ! Dicomment karena fetchWrapper melempar error ke page 400
    // fetchWrapper
    //   .post_multipart(`/api/calon-anggota?id=${id}`, formData)
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
      .post(`/api/calon-anggota?id=${id}`, formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
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
      .finally(() => hideLoading());
  };

  const handleDelete = async (id: number) => {
    // fetchWrapper
    await axios
      .delete(`/api/calon-anggota?id=${id}`)
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

  const handleOpenModalToUpdate = (record: CalonAnggotaInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    form.setFieldsValue({
      no_urut: record.no_urut,
      nama_calon: record.nama_calon,
      foto: record.foto,
      id_partai: record.partai.id,
      jenis_pencalonan: record.jenis_pencalonan,
      is_usung: record.is_usung == 1 ? true : false
    });
  };

  const confirmDelete = (id: number, isUsung: number) => {
    setIsUsung(isUsung);
    setOpenModalDelete(true);
    setId(id);
  };

  console.log('search', search);

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
      dataIndex: 'foto',
      width: 280,
      key: 'foto',
      render: (text: string, record: CalonAnggotaInterface) => (
        <div>
          <Image
            src={text}
            width={230}
            height={230}
            objectFit="cover"
            alt={record.nama_calon}
            className="mx-auto rounded-xl"
          />
        </div>
      )
    },
    {
      title: 'Nama',
      dataIndex: 'nama_calon',
      width: 250,
      sorter: (a: CalonAnggotaInterface, b: CalonAnggotaInterface) =>
        a.nama_calon.length - b.nama_calon.length,
      key: 'nama_calon'
    },
    {
      title: 'No. Urut',
      dataIndex: 'no_urut',
      width: 150,
      key: 'no_urut'
    },
    {
      title: 'Partai',
      dataIndex: 'Partai',
      width: 250,
      render: (text: string, record: CalonAnggotaInterface) => (
        <p>{record.partai.nama_partai}</p>
      )
    },
    {
      title: 'Keterangan',
      width: 300,
      dataIndex: 'jenis_pencalonan.nama_jenis_pencalonan',
      render: (text: string, record: CalonAnggotaInterface) => (
        <p>{record.jenis_pencalonan}</p>
      )
    },
    {
      title: 'Aksi',
      width: 200,
      fixed: 'right',
      render: (text: string, record: any) => {
        return (
          <div>
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record)}
            >
              Edit
            </Button>
            <Gap width={16} height={2} />
            <Button
              danger
              onClick={() => confirmDelete(record.id, record.isUsung)}
            >
              Hapus
            </Button>
          </div>
        );
      }
    }
  ];

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
        <title>Calon Anggota</title>
      </Head>
      <HeaderPage
        title="Calon Anggota"
        action={
          <Button type="primary" onClick={() => setOpenModalCreate(true)}>
            Tambah Calon
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
          <div className="flex items-center justify-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={calonAnggotaData?.data?.data}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey="id"
              pagination={{
                total: calonAnggotaData?.data?.total,
                current: currentPage,
                onChange: onChangePagination
              }}
            />
          </Col>
        )}
      </Row>

      {/* Modal Tambah Data */}
      <ModalAddCalonAnggota
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
        partaiData={partaiData?.data?.data}
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

CalonAnggota.layout = AdminLayout;

export default CalonAnggota;
