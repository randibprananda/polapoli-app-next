import {
  Row,
  Col,
  Typography,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Checkbox,
  Alert
} from 'antd';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { EditSquare } from 'react-iconly';
import { PermissionInterface } from '../../../../@types/User';
import { Gap, Spinner, HeaderPage } from '../../../../components';
import { useHakAkses, useProfile, useRolePermission } from '../../../../swr';
import { Admin } from '../../../../layouts';
import { colors } from '../../../../theme';
import {
  fetchWrapper,
  getWindowLastPath,
  permissionNameParse,
  responseMessage
} from '../../../../utils';
import { useRouter } from 'next/router';

const AccessManagementPage = () => {
  const router = useRouter();
  const [id, setId] = useState<any>(null);
  const [refresh, setRefresh] = useState(true);
  const { data: accessManagementData, isLoading } = useHakAkses(refresh);
  const { data: rolePermData, isLoading: roleIsLoading } = useRolePermission(
    refresh,
    id
  );
  const [isEdit, setIsEdit] = useState(false);
  const [tempRolePerm, setTempRolePerm] = useState<any>(null);
  const { data: userData, role: userRole } = useProfile(true);

  const onFinish = () => {
    const formData = {
      id_permission: tempRolePerm
    };

    fetchWrapper
      .put(`/api/permission/role-permission?id=${id}`, formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Hak akses berhasil diubah',
          onHide: () => setRefresh(false)
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah hak akses',
          onHide: () => setRefresh(false)
        });
      })
      .finally(() => {
        setIsEdit(false);
        setRefresh(true);
      });
  };

  const handleCheck = useCallback(
    (e: any, id: number | string) => {
      if (e.target.checked) {
        const newTemp = [...tempRolePerm, id];
        setTempRolePerm([...newTemp]);
        return;
      } else {
        const newTemp = tempRolePerm.filter((item: any) => item !== id);
        setTempRolePerm([...newTemp]);
        return;
      }
    },
    [tempRolePerm]
  );

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'name',
      sorter: (a: PermissionInterface, b: PermissionInterface) =>
        a.name.length - b.name.length,
      key: '',
      render: (text: string) => (
        <p className="capitalize">{permissionNameParse(text)}</p>
      )
    },
    {
      title: 'Hak Akses',
      dataIndex: 'name',
      width: 300,
      key: '',
      render: (text: string, record: PermissionInterface) => {
        if (tempRolePerm) {
          const rolePermIndex = tempRolePerm.indexOf(record.id);

          return (
            <Checkbox
              defaultChecked={rolePermIndex !== -1}
              disabled={!isEdit}
              onChange={e => handleCheck(e, record.id)}
            />
          );
        }
      }
    }
  ];

  useEffect(() => {
    setId(getWindowLastPath());
    if (rolePermData) {
      const rolePermIds = rolePermData?.data.map(
        (item: any) => item.permission_id
      );
      setTempRolePerm([...rolePermIds]);
    }
  }, [router, rolePermData]);

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
        <title>Hak Akses</title>
      </Head>
      <HeaderPage
        title="Hak Akses"
        withArrowBack
        action={
          <>
            {isEdit && (
              <>
                <Button type="primary" onClick={() => onFinish()}>
                  Simpan Hak Akses
                </Button>
                <Gap width={16} height={12} />
                <Button type="default" onClick={() => setIsEdit(false)}>
                  Batal
                </Button>
              </>
            )}
            {!isEdit && (
              <Button type="primary" onClick={() => setIsEdit(true)}>
                Ubah Hak Akses
              </Button>
            )}
          </>
        }
      />
      <Row className="mt-7">
        {isLoading || roleIsLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={accessManagementData.data}
              columns={columns}
              scroll={{ x: 500 }}
              rowKey="id"
            />
          </Col>
        )}
      </Row>
    </>
  );
};

AccessManagementPage.layout = Admin;

export default AccessManagementPage;
