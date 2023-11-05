import { Alert, Button, Col, Row, Table, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RoleInterface, RoleWithSalaryInterface } from '../../../@types/User';
import {
  Gap,
  HeaderPage,
  ModalAddRole,
  ModalConfirmation,
  Spinner
} from '../../../components';
import { LIST_ROLE, PERMISSION, ROLE } from '../../../constant/contract';
import { Admin } from '../../../layouts';
import { useCurrentTeam, useProfile, useRole } from '../../../swr';
import {
  checkPermissionArray,
  currencyFormat,
  fetchWrapper,
  RenderIf,
  responseMessage
} from '../../../utils';

const { Title } = Typography;

const RolePage = () => {
  const [form] = useForm();
  const router = useRouter();
  const [refresh, setRefresh] = useState(true);
  const { data: roleData, isLoading } = useRole(refresh);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const { listPermission } = useCurrentTeam(true);
  const [nameDisabled, setNameDisabled] = useState(false);
  const { data: userData, role: userRole } = useProfile(true);

  const onReset = () => {
    form.resetFields();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNameDisabled(false);
    onReset();
  };

  const hideModal = () => {
    setOpenModal(false);
    setOpenModalDelete(false);
    setRefresh(false);
    onReset();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onFinish = (values: any) => {
    setLoading(true);
    // fetchWrapper
    axios
      .post('/api/role', values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil ditambahkan',
          onHide: hideModal
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
              onHide: hideModal
            });
          });
        } else {
          responseMessage({
            type: 'error',
            message: err.response.data.data.message,
            onHide: hideModal
          });
        }
      })
      .finally(() => hideLoading());
  };

  const onUpdate = (values: any) => {
    if (
      checkPermissionArray({
        roles: [
          ROLE.Konsultan,
          ROLE.Koordinator,
          ROLE.ProjectManager,
          ROLE.Relawan,
          ROLE.Saksi
        ],
        idRole: id
      })
    ) {
      delete values.name;
    }
    setLoading(true);
    axios
      .put(`/api/role?id=${id}`, values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: hideModal
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
              onHide: hideModal
            });
          });
        } else {
          responseMessage({
            type: 'error',
            message: err.response.data.data.message,
            onHide: hideModal
          });
        }
      })
      .finally(() => hideLoading());
  };

  const handleDelete = (id: number) => {
    fetchWrapper
      .delete(`/api/role?id=${id}`)
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

  const handleOpenModalToUpdate = (record: RoleWithSalaryInterface) => {
    setId(record.role_id);
    if (
      checkPermissionArray({
        roles: [
          ROLE.Konsultan,
          ROLE.Koordinator,
          ROLE.ProjectManager,
          ROLE.Relawan,
          ROLE.Saksi
        ],
        idRole: record.id
      })
    ) {
      setNameDisabled(true);
    }
    setOpenModal(true);
    setIsEdit(true);
    form.setFieldsValue({
      name: record.role.name,
      ...record
    });
  };

  const handleOpenModalToCreate = () => {
    setOpenModal(true);
    setIsEdit(false);
  };

  const columns: any = [
    {
      title: 'Nama',
      width: 200,
      dataIndex: 'role',
      sorter: (a: RoleInterface, b: RoleInterface) =>
        a.name.length - b.name.length,
      key: '',
      render: (role: any) => <p>{role.name}</p>
    },
    {
      title: 'Metode Gaji',
      dataIndex: 'metode_gaji',
      width: 200,
      key: 'metode gaji'
    },
    {
      title: 'Gaji',
      dataIndex: 'gaji',
      width: 200,
      key: 'gaji',
      render: (text: any) => <p>{currencyFormat(text)}</p>
    },
    {
      title: 'Aksi',
      width: 300,
      fixed: 'right',
      render: (text: string, record: RoleWithSalaryInterface) => {
        return (
          <div>
            <RenderIf
              isTrue={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.manajemen_permission
              })}
            >
              <Button
                onClick={() =>
                  router.push(`/admin/role/hak-akses/${record.role_id}`)
                }
              >
                Hak Akses
              </Button>
            </RenderIf>
            <Gap width={16} height={2} />
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record)}
            >
              Edit
            </Button>
            <RenderIf
              isTrue={
                LIST_ROLE.filter(item => item.id == record.role_id).length === 0
              }
            >
              <Gap width={16} height={2} />
              <Button danger onClick={() => confirmDelete(record.role_id)}>
                Hapus
              </Button>
            </RenderIf>
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
        <title>Role | User & Hak Akses</title>
      </Head>
      <HeaderPage
        title="Role"
        action={
          <Button type="primary" onClick={() => handleOpenModalToCreate()}>
            Tambah Role
          </Button>
        }
      />
      <Row className="mt-7">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={roleData?.data}
              columns={columns}
              scroll={{ x: 800 }}
            />
          </Col>
        )}
      </Row>

      <ModalAddRole
        isEdit={isEdit}
        visible={openModal}
        loading={loading}
        onCancel={handleCloseModal}
        onCreate={onFinish}
        onUpdate={onUpdate}
        form={form}
        nameDisabled={nameDisabled}
      />

      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(id)}
      />
    </>
  );
};

RolePage.layout = Admin;

export default RolePage;
