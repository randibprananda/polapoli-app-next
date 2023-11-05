import { Alert, Button, Col, Row, Table, Typography } from 'antd';
import {
  Gap,
  HeaderPage,
  ModalConfirmation,
  ModalUser,
  Spinner
} from '../../../components';
import { RenderIf, fetchWrapper, responseMessage } from '../../../utils';
import { useProfile, useRole, useUser } from '../../../swr';
import { useRef, useState } from 'react';

import { Admin } from '../../../layouts';
import Head from 'next/head';
import { LIST_ROLE } from '../../../constant/contract';
import { UserInterface } from '../../../@types/User';
import axios from 'axios';
import { useColumnSearch } from '../../../customHooks';
import { useForm } from 'antd/lib/form/Form';

const { Title } = Typography;

const PM = LIST_ROLE.filter(item => item.id === 1)[0];

const UserPage = () => {
  const [form] = useForm();
  const [refresh, setRefresh] = useState(true);
  const { data: userData, isLoading } = useUser(refresh);
  const { data: roleData } = useRole(true);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [id, setId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const { data: profile, role: userRole } = useProfile(true);

  const { getColumnSearchProps } = useColumnSearch();

  const handleCloseModal = () => {
    setOpenModal(false);
    setId(0);
    setIsEdit(false);
    form.resetFields();
  };
  const hideModal = () => {
    setOpenModal(false);
    setOpenModalDelete(false);
    setRefresh(false);
    handleCloseModal();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onCreate = async (values: any) => {
    setLoading(true);
    // fetchWrapper
    //   .post(`/api/user/konsultan`, values)
    //   .then(() => {
    //     responseMessage({
    //       type: 'success',
    //       message: 'Data berhasil ditambah',
    //       onHide: hideModal
    //     });
    //   })
    //   .catch(err => {
    //     responseMessage({
    //       type: 'error',
    //       message: 'Gagal menambah data',
    //       onHide: hideModal
    //     });
    //   })
    //   .finally(() => hideLoading());

    await axios
      .post('/api/user/konsultan', values)
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
            message: 'Email sudah digunakan',
            onHide: hideModal
          });
        }
      })
      .finally(() => hideLoading());
  };

  const onUpdate = (values: any) => {
    setLoading(true);
    fetchWrapper
      .post(`/api/user/konsultan?id=${id}`, values)
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

  const handleOpenModalToUpdate = (record: UserInterface) => {
    setId(record.id);
    setOpenModal(true);
    setIsEdit(true);
    form.setFieldsValue({
      ...record,
      nama: record.name
    });
  };

  const handleDelete = (id: number) => {
    fetchWrapper
      .delete(`/api/user/konsultan?id=${id}`)
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

  const columns: any = [
    {
      title: 'No',
      dataIndes: 'index',
      width: 60,
      render: (_: any, record: any, index: number) => <span>{index + 1}</span>
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      width: 250,
      sorter: (a: UserInterface, b: UserInterface) =>
        a.name.length - b.name.length,
      key: '',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 350,
      key: '',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Hak Akses',
      width: 200,
      sorter: (a: UserInterface, b: UserInterface) =>
        a.user_role_tim[0].role.name.length -
        b.user_role_tim[0].role.name.length,
      key: '',
      render: (_: any, record: UserInterface) => (
        <p>{record.user_role_tim[0].role.name}</p>
      )
    },
    {
      title: 'Status Undangan',
      dataIndex: 'detail_user',
      width: 180,
      render: (detail_user: any) => {
        if (detail_user?.status_invitation === 'active') {
          return <span className="text-sm text-success">User Aktif</span>;
        } else {
          return (
            <span className="text-sm text-warning">Undangan terkirim</span>
          );
        }
      }
    },
    {
      title: 'Aksi',
      width: 220,
      fixed: 'right',
      render: (text: string, record: UserInterface) => {
        return (
          <div>
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record)}
            >
              Edit
            </Button>
            <Gap width={16} height={2} />
            <RenderIf isTrue={PM.id !== record.user_role_tim[0].role.id}>
              <Button danger onClick={() => confirmDelete(record.id)}>
                Hapus
              </Button>
            </RenderIf>
          </div>
        );
      }
    }
  ];

  if (!profile?.currentTeam) {
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
        <title>Data Admin & Konsultan</title>
      </Head>
      <HeaderPage
        title="Data Admin & Konsultan"
        action={
          <>
            <Button type="primary" onClick={() => setOpenModal(true)}>
              Tambah Konsultan
            </Button>
          </>
        }
      />
      <Row className="mt-7">
        <Col xs={24}>
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-96">
              <Spinner />
            </div>
          ) : (
            <Table
              dataSource={userData?.data}
              columns={columns}
              scroll={{ x: 900 }}
            />
          )}
        </Col>
      </Row>

      <ModalUser
        form={form}
        roleAvailable={roleData?.data}
        visible={openModal}
        loading={loading}
        onCancel={handleCloseModal}
        onFinish={isEdit ? onUpdate : onCreate}
        isEdit={isEdit}
      />

      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(id)}
      />
    </>
  );
};

UserPage.layout = Admin;

export default UserPage;
