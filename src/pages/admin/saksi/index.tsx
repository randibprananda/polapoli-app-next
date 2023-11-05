import { Alert, Button, Col, Row, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../@types/DaerahIndonesia';
import {
  HeaderPage,
  ModalConfirmation,
  Search,
  Spinner
} from '../../../components';
import { ModalAddSaksi } from '../../../components/organisms';
import { PERMISSION } from '../../../constant/contract';
import {
  useColumnSearch,
  usePagination,
  useSearch
} from '../../../customHooks';
import { Admin } from '../../../layouts';
import { useCurrentTeam, useProfile, useSaksi } from '../../../swr';
import {
  RenderIf,
  checkIsPremium,
  checkPermissionArray,
  dateFormat,
  fetchWrapper,
  responseMessage
} from '../../../utils';

const SaksiPage = () => {
  const [form] = useForm();
  const router = useRouter();
  const { getColumnSearchProps } = useColumnSearch();

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [refresh, setRefresh] = useState(true);
  const [id, setId] = useState<null | number>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [wilayah, setWilayah] = useState<{
    provinsi: number | string | null;
    kecamatan: number | string | null;
    kota: number | string | null;
    kelurahan: number | string | null;
  }>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });

  const [search, handleSearch] = useSearch('');
  const [currentPage, onChangePagination] = usePagination(1);

  // swr
  const { data: saksiData, isLoading } = useSaksi(refresh, currentPage, search);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);
  const { data: userData, role: userRole } = useProfile(true);

  const hideModal = () => {
    setOpenModalCreate(false);
    setOpenModalDelete(false);
    setRefresh(false);

    onReset();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onReset = () => {
    setWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    setIsDetail(false);
    setIsEdit(false);
    form.resetFields();
  };

  const onCreate = async (values: any) => {
    setLoading(true);
    // fetchWrapper
    //   .post('/api/saksi', values)
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
      .post('/api/saksi', values)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil ditambahkan',
          onHide: hideModal
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          const validationErrors = err.response.data.data.errors;

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
        }
      })
      .finally(() => hideLoading());
  };

  const onUpdate = async (values: any) => {
    console.log('values', values);
    setLoading(true);
    // fetchWrapper
    await axios
      .post(`/api/saksi?id=${id}`, values)
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

  const handleOpenModalToUpdate = (record: any) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    setWilayah({
      provinsi: +record.detail_user.propinsi_id,
      kecamatan: +record.detail_user.kecamatan_id,
      kota: +record.detail_user.kabupaten_id,
      kelurahan: +record.detail_user.kelurahan_id
    });
    form.setFieldsValue({
      email: record.email,
      nama: record.name,
      nomor_hp: record.detail_user.no_hp,
      jenis_kelamin: record.detail_user.jenis_kelamin,
      propinsi_id: +record.detail_user.propinsi_id,
      kabupaten_id: +record.detail_user.kabupaten_id,
      kecamatan_id: +record.detail_user.kecamatan_id,
      kelurahan_id: +record.detail_user.kelurahan_id,
      tps: record.detail_user.tps,
      rw: record.detail_user.rw,
      rt: record.detail_user.rt,
      keterangan: record.detail_user.keterangan
    });
  };

  const handleOpenModalToDetail = (record: any) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsDetail(true);
    setWilayah({
      provinsi: +record.detail_user.propinsi_id,
      kecamatan: +record.detail_user.kecamatan_id,
      kota: +record.detail_user.kabupaten_id,
      kelurahan: +record.detail_user.kelurahan_id
    });
    form.setFieldsValue({
      email: record.email,
      nama: record.name,
      nomor_hp: record.detail_user.no_hp,
      jenis_kelamin: record.detail_user.jenis_kelamin,
      propinsi_id: +record.detail_user.propinsi_id,
      kabupaten_id: +record.detail_user.kabupaten_id,
      kecamatan_id: +record.detail_user.kecamatan_id,
      kelurahan_id: +record.detail_user.kelurahan_id,
      tps: record.detail_user.tps,
      rw: record.detail_user.rw,
      rt: record.detail_user.rt,
      keterangan: record.detail_user.keterangan
    });
  };

  const handleChangeWilayah = (name: string, value: any) => {
    setWilayah({
      ...wilayah,
      [name]: value
    });
  };

  const handleCloseModal = () => {
    setOpenModalCreate(false);
    onReset();
  };

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/saksi?id=${id}`)
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
      key: 'no',
      dataIndex: 'no',
      width: 60,
      render: (_: any, record: any, index: number) => <span>{index + 1}</span>
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      width: 250,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Koordinator',
      width: 250,
      render: (text: any, record: any) => (
        <span>
          {record?.daftar_anggota_atasan?.detail_user_atasan?.user?.name}
        </span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 250,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Terakhir Login',
      dataIndex: 'last_sign_in_at',
      width: 250,
      render: (text: string) => <span>{text ? dateFormat(text) : '-'}</span>
    },
    {
      title: 'Status Undangan',
      ataIndex: 'detail_user',
      width: 250,
      render: (data: any) => {
        if (data.detail_user?.status_invitation === 'active') {
          return <span className="text-success text-sm">User Aktif</span>;
        } else {
          return (
            <span className="text-warning text-sm">Undangan terkirim</span>
          );
        }
      }
    },
    {
      title: 'Aksi',
      fixed: 'right',
      width: 200,
      render: (text: string, record: any) => {
        return (
          <Row gutter={[8, 8]}>
            <RenderIf
              isTrue={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.log_aktifitas_saksi
              })}
            >
              <Col>
                <Button
                  onClick={() =>
                    router.push(`/admin/log-aktivitas/saksi/${record?.id}`)
                  }
                  disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
                >
                  Log Aktivitas
                </Button>
              </Col>
            </RenderIf>
            <Col>
              <Button
                onClick={() => handleOpenModalToDetail(record)}
                disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
              >
                Detail
              </Button>
            </Col>
            <Col>
              <Button
                className="border-success hover:border-success text-success hover:text-success"
                onClick={() => handleOpenModalToUpdate(record)}
                disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
              >
                Edit
              </Button>
            </Col>
            <Col>
              <Button
                danger
                onClick={() => confirmDelete(record.id)}
                disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
              >
                Hapus
              </Button>
            </Col>
          </Row>
        );
      },
      key: 'aksi'
    }
  ];

  useEffect(() => {
    fetchWrapper.get('/api/daerah-indonesia/provinsi').then(res => {
      setProvinsiData(res);
    });
  }, []);

  useEffect(() => {
    async function getValues() {
      try {
        if (wilayah.provinsi) {
          const resKota = await fetchWrapper.get(
            `/api/daerah-indonesia/kota?id_provinsi=${wilayah.provinsi}`
          );

          setKotaData(resKota);
        }

        if (wilayah.kota) {
          const resKecamatan = await fetchWrapper.get(
            `/api/daerah-indonesia/kecamatan?id_kota=${wilayah.kota}`
          );
          setKecamatanData(resKecamatan);
        }

        if (wilayah.kecamatan) {
          const resKelurahan = await fetchWrapper.get(
            `/api/daerah-indonesia/kelurahan?id_kecamatan=${wilayah.kecamatan}`
          );
          setKelurahanData(resKelurahan);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }

    getValues();
  }, [wilayah]);

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
        <title>Saksi</title>
      </Head>
      <HeaderPage
        title="Daftar Saksi"
        action={
          <>
            <Button type="primary" onClick={() => setOpenModalCreate(true)}>
              Tambah Saksi
            </Button>
          </>
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
          <>
            <Col xs={24}>
              <Table
                dataSource={saksiData?.data?.data}
                columns={columns}
                scroll={{ x: 1000 }}
                pagination={{
                  total: saksiData?.data?.total,
                  current: currentPage,
                  onChange: onChangePagination
                }}
              />
            </Col>
          </>
        )}
      </Row>

      <ModalAddSaksi
        visible={openModalCreate}
        onCancel={handleCloseModal}
        isEdit={isEdit}
        isDetail={isDetail}
        loading={loading}
        onCreate={onCreate}
        onUpdate={onUpdate}
        provinsiData={provinsiData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        kotaData={kotaData}
        form={form}
        wilayah={wilayah}
        setWilayah={handleChangeWilayah}
        isPemilih={true}
      />

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

SaksiPage.layout = Admin;

export default SaksiPage;
