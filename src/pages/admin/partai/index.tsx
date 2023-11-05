import { Alert, Button, Col, message, Row, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PartaiInterface } from '../../../@types/Partai';
import { IlDefault } from '../../../assets/img/landing';
import {
  Gap,
  HeaderPage,
  Loading,
  ModalConfirmation,
  ModalPartai,
  Search,
  Spinner
} from '../../../components';
import { usePagination, useSearch } from '../../../customHooks';
import AdminLayout from '../../../layouts/Admin';
import { usePartai, useProfile } from '../../../swr';
import {
  cleanObject,
  fetchWrapper,
  generateFormDataObj,
  responseMessage
} from '../../../utils';

const PartaiPage = () => {
  const [form] = useForm();

  const [search, handleSearch] = useSearch('');

  const [refresh, setRefresh] = useState(true);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);

  const { data: partaiData } = usePartai(refresh);
  const [currentPage, onChangePagination] = usePagination(1);

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
    onCancel();
  };

  const onFinish = (values: any) => {
    const cleanedObject = cleanObject(values);
    const newObj = {
      ...cleanedObject,
      status: cleanedObject?.status ? 1 : 0
    };

    const formData = new FormData();
    const newFormData = generateFormDataObj(formData, newObj);

    setLoading(true);
    fetchWrapper
      .post_multipart('/api/partai', newFormData)
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
    const cleanedObject = cleanObject(values);
    const newObj = {
      ...cleanedObject,
      status: cleanedObject?.status ? 1 : 0
    };
    const formData = new FormData();
    const newFormData = generateFormDataObj(formData, newObj);

    setLoading(true);
    fetchWrapper
      .post_multipart(`/api/partai?id=${id}`, newFormData)
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

  const handleDelete = (id: number) => {
    fetchWrapper
      .delete(`/api/partai?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dihapus',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menghapus data',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const confirmDelete = (id: number) => {
    setOpenModalDelete(true);
    setId(id);
  };

  const handleOpenModalToCreate = () => {
    setOpenModalCreate(true);
  };

  const handleOpenModalToUpdate = (record: PartaiInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    form.setFieldsValue({
      logo: record.logo,
      nama_partai: record.nama_partai,
      status: record.status === 1
    });
  };

  const onCancel = () => {
    setOpenModalCreate(false);
    setIsEdit(false);
    form.resetFields();
  };

  const columns: any = [
    {
      title: 'Logo Partai',
      dataIndex: 'logo',
      width: 280,
      key: 'logo',
      render: (text: string, record: PartaiInterface) => (
        <div>
          <Image
            alt={text}
            width={230}
            height={230}
            objectFit="cover"
            src={record?.logo || IlDefault}
            className="rounded-xl mx-auto"
          />
        </div>
      )
    },
    {
      title: 'Nama Partai',
      dataIndex: 'nama_partai',
      width: 250,
      sorter: (a: PartaiInterface, b: PartaiInterface) =>
        a.nama_partai.length - b.nama_partai.length,
      key: 'nama_partai'
    },
    {
      title: 'Status',
      width: 300,
      dataIndex: 'status',
      render: (text: 1 | 0) => (
        <span> {text === 1 ? 'Partai Diusung' : 'Partai Oposisi'}</span>
      )
    },
    {
      title: 'Aksi',
      width: 200,
      fixed: 'right',
      render: (text: string, record: PartaiInterface) => {
        return (
          <div>
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record)}
            >
              Edit
            </Button>
            <Gap width={16} height={2} />
            <Button danger onClick={() => confirmDelete(record.id)}>
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
        <title>Partai</title>
      </Head>
      <HeaderPage
        title="Data Partai Politik"
        action={
          <Button type="primary" onClick={() => handleOpenModalToCreate()}>
            Tambah Partai
          </Button>
        }
      />
      <Row className="mt-7">
        <Col xs={24}>
          <div className="flex justify-end mb-8">
            <Search value={search} onChange={handleSearch} />
          </div>
        </Col>
        {false ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={partaiData?.data?.data}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey="id"
              pagination={{
                total: partaiData?.data?.total,
                current: currentPage,
                onChange: onChangePagination
              }}
            />
          </Col>
        )}
      </Row>

      {/* Modal Tambah Data */}
      <ModalPartai
        visible={openModalCreate}
        onCancel={onCancel}
        draggerProps={draggerProps}
        onCreate={onFinish}
        onUpdate={onUpdate}
        loading={loading}
        form={form}
        isEdit={isEdit}
      />
      {/* Modal Tambah Data */}

      {/* Modal Hapus */}
      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(id)}
      />
      {/* Modal Hapus */}
    </>
  );
};

PartaiPage.layout = AdminLayout;

export default PartaiPage;
