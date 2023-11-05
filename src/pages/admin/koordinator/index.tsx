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
  ProvinsiInterface,
  WilayahInterface
} from '../../../@types/DaerahIndonesia';
import {
  BreadcrumbWilayah,
  HeaderPage,
  ModalConfirmation,
  Spinner
} from '../../../components';
import { ModalAddKoordinator } from '../../../components/organisms';
import { TINGKAT_KOORDINATOR_INDEX } from '../../../constant';
import { PERMISSION, ROLE } from '../../../constant/contract';
import {
  useBreadcrumbWilayah,
  useColumnSearch,
  useSearch
} from '../../../customHooks';
import { Admin } from '../../../layouts';
import {
  useAllKoordinator,
  useCurrentTeam,
  useProfile,
  useRelawan,
  useRelawanByKelurahan,
  useSaksi,
  useSaksiByKelurahan
} from '../../../swr';
import {
  RenderIf,
  checkIsPremium,
  checkPermissionArray,
  dateFormat,
  fetchWrapper,
  responseMessage
} from '../../../utils';

const KoordinatorPage = () => {
  const [form] = useForm();
  const router = useRouter();
  const [refresh, setRefresh] = useState(true);
  const {
    bcWilayah,
    setBcWilayah,
    resetBcWilayah,
    tingkatKoordinator,
    setTingkatKoorinator
  } = useBreadcrumbWilayah();
  const { getColumnSearchProps } = useColumnSearch();

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState<null | number>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [kelurahanId, setKelurahanId] = useState<number>(0);
  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [modalState, setModalState] = useState<{
    withWilayah: boolean;
    jenisWilayah: any;
  }>({
    withWilayah: true,
    jenisWilayah: null
  });
  const [tempWilayah, setTempWilayah] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });
  const [anggotaRelawan, setAnggotaRelawan] = useState<any[]>([]);
  const [anggotaSaksi, setAnggotaSaksi] = useState<any[]>([]);
  const [selectedKelurahanId, setSelectedKelurahanId] = useState(0);

  // swr
  const { data: koordinatorData, isLoading } = useAllKoordinator({
    mounted: refresh,
    options: {
      tingkat_koordinator: tingkatKoordinator,
      propinsi_id: bcWilayah.propinsi_id.id,
      kabupaten_id: bcWilayah.kabupaten_id.id,
      kecamatan_id: bcWilayah.kecamatan_id.id,
      kelurahan_id: bcWilayah.kelurahan_id.id,
      rw: bcWilayah.rw,
      rt: bcWilayah.rt
    }
  });

  const [searchRelawan, handleSearchRelawan] = useSearch('');
  const [searchSaksi, handleSearchSaksi] = useSearch('');

  // const { data: relawanData } = useRelawan(true, 1, searchRelawan);
  // const { data: saksiData } =Due, 1, searchSaksi);
  const { data: relawanData } = useRelawanByKelurahan(
    true,
    selectedKelurahanId,
    searchRelawan
  );
  const { data: saksiData } = useSaksiByKelurahan(
    true,
    selectedKelurahanId,
    searchSaksi
  );

  const { data: timRelawanData, listPermission } = useCurrentTeam(true);

  const { data: userData, role: userRole } = useProfile(true);

  const setDynamicModalState = (name: string, value: any) => {
    setModalState({
      ...modalState,
      [name]: value
    });
  };

  const handleChangeTempWilayah = (name: string, value: any) => {
    if (name === 'kelurahan') {
      setSelectedKelurahanId(value);
    }
    setTempWilayah({
      ...tempWilayah,
      [name]: value
    });
  };

  const onReset = () => {
    setTempWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    form.resetFields();
    setModalState({
      ...modalState,
      jenisWilayah: null
    });
    setAnggotaRelawan([]);
    setAnggotaSaksi([]);
    setIsEdit(false);
    setIsDetail(false);
  };

  const hideModal = () => {
    setOpenModalCreate(false);
    setOpenModalDelete(false);
    setRefresh(false);
    onReset();
  };

  const handleCloseModal = () => {
    setOpenModalCreate(false);
    onReset();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const getJenisWilayah = (wilayah: any[]) => {
    const tempJenisWilayah = wilayah.filter((item: any) => item).length - 1;

    return tempJenisWilayah === -1 ? null : tempJenisWilayah.toString();
  };

  const generateAnggotaKeyValue = (data: any[], role: any) =>
    data
      .filter((item: any) => item.user.user_role_tim[0].role.id == role)
      .map((item: any) => ({
        key: item.user.id,
        value: item.user.name
      }));

  const handleOpenModalToUpdate = (record: any) => {
    const recordData = record.data ? record.data : record;
    const kelurahanId = recordData.detail_user?.kelurahan.id;
    // setKelurahanId(kelurahanId);
    setSelectedKelurahanId(kelurahanId);
    setId(recordData.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    const tempJenisWilayah: any =
      getJenisWilayah([
        recordData.detail_user.propinsi.id,
        recordData.detail_user?.kabupaten?.id,
        recordData.detail_user?.kecamatan?.id,
        recordData.detail_user?.kelurahan?.id,
        recordData.detail_user?.rt
      ]) + '';

    setModalState({
      ...modalState,
      withWilayah: !!recordData.detail_user.propinsi.id,
      jenisWilayah: tempJenisWilayah
    });

    let wilayahData = {};
    if (recordData.detail_user?.propinsi.id) {
      wilayahData = {
        propinsi_id: recordData.detail_user?.propinsi?.id,
        kabupaten_id: recordData.detail_user?.kabupaten?.id,
        kecamatan_id: recordData.detail_user?.kecamatan?.id,
        kelurahan_id: recordData.detail_user?.kelurahan?.id,
        rt: recordData.detail_user?.rt,
        rw: recordData.detail_user?.rw
      };

      setTempWilayah({
        provinsi: recordData.detail_user?.propinsi?.id,
        kota: recordData.detail_user?.kabupaten?.id,
        kecamatan: recordData.detail_user?.kecamatan?.id,
        kelurahan: recordData.detail_user?.kelurahan?.id
      });
    }

    let tempRelawan: any[] = [];
    let tempSaksi: any[] = [];
    let formAnggota: any = {};

    if (recordData?.detail_user.daftar_anggota) {
      tempRelawan = generateAnggotaKeyValue(
        recordData?.detail_user.daftar_anggota,
        ROLE.Relawan
      );
      tempSaksi = generateAnggotaKeyValue(
        recordData?.detail_user.daftar_anggota,
        ROLE.Saksi
      );

      setAnggotaRelawan(tempRelawan);
      setAnggotaSaksi(tempSaksi);

      formAnggota = {
        relawan_id: tempRelawan.map((item: any) => item.key),
        saksi_id: tempSaksi.map((item: any) => item.key)
      };
    }

    form.setFieldsValue({
      email: recordData.email,
      nama: recordData.name,
      nomor_hp: recordData.detail_user.no_hp,
      jenis_kelamin: recordData.detail_user.jenis_kelamin,
      ...wilayahData,
      keterangan: recordData.detail_user.keterangan,
      nama_tingkat_koordinator: tempJenisWilayah,
      ...formAnggota
    });
  };

  const handleOpenModalToDetail = (record: any) => {
    const recordData = record.data ? record.data : record;
    // const kelurahanId = recordData.detail_user?.kelurahan.id;
    setKelurahanId(kelurahanId);
    setId(recordData.id);
    setOpenModalCreate(true);
    setIsDetail(true);
    const tempJenisWilayah: any =
      getJenisWilayah([
        recordData.detail_user.propinsi.id,
        recordData.detail_user?.kabupaten?.id,
        recordData.detail_user?.kecamatan?.id,
        recordData.detail_user?.kelurahan?.id,
        recordData.detail_user?.rt
      ]) + '';

    setModalState({
      ...modalState,
      withWilayah: !!recordData.detail_user.propinsi.id,
      jenisWilayah: tempJenisWilayah
    });

    let wilayahData = {};
    if (recordData.detail_user?.propinsi?.id) {
      wilayahData = {
        propinsi_id: recordData.detail_user?.propinsi?.id,
        kabupaten_id: recordData.detail_user?.kabupaten?.id,
        kecamatan_id: recordData.detail_user?.kecamatan?.id,
        kelurahan_id: recordData.detail_user?.kelurahan?.id,
        rt: recordData.detail_user?.rt,
        rw: recordData.detail_user?.rw
      };

      setTempWilayah({
        provinsi: recordData.detail_user.propinsi?.id,
        kota: recordData.detail_user.kabupaten?.id,
        kecamatan: recordData.detail_user.kecamatan?.id,
        kelurahan: recordData.detail_user.kelurahan?.id
      });
    }

    let tempRelawan: any[] = [];
    let tempSaksi: any[] = [];
    let formAnggota: any = {};

    if (recordData?.detail_user.daftar_anggota) {
      tempRelawan = generateAnggotaKeyValue(
        recordData?.detail_user.daftar_anggota,
        ROLE.Relawan
      );
      tempSaksi = generateAnggotaKeyValue(
        recordData?.detail_user.daftar_anggota,
        ROLE.Saksi
      );

      setAnggotaRelawan(tempRelawan);
      setAnggotaSaksi(tempSaksi);

      formAnggota = {
        relawan_id: tempRelawan.map((item: any) => item.key),
        saksi_id: tempSaksi.map((item: any) => item.key)
      };
    }

    form.setFieldsValue({
      email: recordData.email,
      nama: recordData.name,
      nomor_hp: recordData.detail_user.no_hp,
      jenis_kelamin: recordData.detail_user.jenis_kelamin,
      ...wilayahData,
      keterangan: recordData.detail_user.keterangan,
      nama_tingkat_koordinator: tempJenisWilayah,
      ...formAnggota
    });
  };

  const generateRelawanSaksi = () => {
    const relawan_id: number[] = [];
    const saksi_id: number[] = [];
    if (modalState.jenisWilayah === '4') {
      // rt rw
      anggotaRelawan.forEach((relawan: any) => {
        relawan_id.push(+relawan.key);
      });
      anggotaSaksi.forEach((relawan: any) => {
        saksi_id.push(+relawan.key);
      });
    }

    return {
      relawan_id,
      saksi_id
    };
  };

  const onCreate = async (values: any) => {
    const { relawan_id, saksi_id } = generateRelawanSaksi();

    const formData = {
      ...values,
      nama_tingkat_koordinator:
        TINGKAT_KOORDINATOR_INDEX[+values.nama_tingkat_koordinator],
      relawan_id,
      saksi_id
    };

    if (modalState.jenisWilayah !== '4') {
      delete formData.relawan_id;
      delete formData.saksi_id;
    }

    setLoading(true);
    // ! Dicomment karena fetchwrapper melempar ke page error
    // fetchWrapper
    //   .post('/api/koordinator', formData)
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
    //   .finally(() => hideLoading())
    await axios
      .post('/api/koordinator', formData)
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

  const onUpdate = async (values: any) => {
    const { relawan_id, saksi_id } = generateRelawanSaksi();
    const formData = {
      ...values,
      nama_tingkat_koordinator:
        TINGKAT_KOORDINATOR_INDEX[+values.nama_tingkat_koordinator],
      relawan_id,
      saksi_id
    };

    if (modalState.jenisWilayah !== '4') {
      delete formData.relawan_id;
      delete formData.saksi_id;
    }

    setLoading(true);
    // fetchWrapper
    await axios
      .post(`/api/koordinator?id=${id}`, formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diubah',
          onHide: hideModal
        });
      })
      .catch(err => {
        console.log(err.response);
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

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/koordinator?id=${id}`)
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

  const handleGetAnggota = (record: any) => {
    if (!bcWilayah.propinsi_id.id) {
      setTingkatKoorinator('kabupaten');
      return setBcWilayah({
        ...bcWilayah,
        propinsi_id: record.data.detail_user.propinsi
      });
    }
    if (!bcWilayah.kabupaten_id.id) {
      setTingkatKoorinator('kecamatan');
      return setBcWilayah({
        ...bcWilayah,
        kabupaten_id: record.data.detail_user.kabupaten
      });
    }
    if (!bcWilayah.kecamatan_id.id) {
      setTingkatKoorinator('kelurahan');
      return setBcWilayah({
        ...bcWilayah,
        kecamatan_id: record.data.detail_user.kecamatan
      });
    }
    if (!bcWilayah.kelurahan_id.id) {
      setTingkatKoorinator('rt/rw');
      return setBcWilayah({
        ...bcWilayah,
        kelurahan_id: record.data.detail_user.kelurahan
      });
    }
    if (!bcWilayah.rt && !bcWilayah.rw) {
      setTingkatKoorinator('rt/rw');
      return setBcWilayah({
        ...bcWilayah,
        rt: record.data.detail_user.rt,
        rw: record.data.detail_user.rw
      });
    }
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
      dataIndex: 'data.name',
      render: (text: any, record: any) => (
        <span>{record.data?.name ? record.data.name : record.name}</span>
      ),
      width: 200
    },
    {
      title: 'Wilayah',
      dataIndex: 'data.name',
      render: (text: any, record: any) => (
        <span>
          {tingkatKoordinator !== 'rt/rw'
            ? record?.data.detail_user[tingkatKoordinator]?.name
            : `RT ${record.detail_user.rt}/ RW ${record.detail_user.rw}`}
        </span>
      ),
      width: 150
    },
    {
      title: 'Anggota',
      width: 200,
      dataIndex: 'total_anggota',
      render: (text: string, record: any) => {
        if (tingkatKoordinator === 'rt/rw') {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() => {
                if (
                  checkPermissionArray({
                    roles: listPermission,
                    idRole: PERMISSION.daftar_relawan_under_koordinator
                  }) &&
                  checkPermissionArray({
                    roles: listPermission,
                    idRole: PERMISSION.daftar_saksi_under_koordinator
                  })
                ) {
                  return router.push(
                    `/admin/koordinator/list-anggota/${record.id}`
                  );
                }

                return;
              }}
            >
              Lihat Anggota
            </button>
          );
        }

        return (
          <button
            className="text-primary font-semibold"
            onClick={() => {
              if (
                checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.daftar_koordinator_under_koordinator
                })
              ) {
                return handleGetAnggota(record);
              }

              return;
            }}
          >
            Lihat Anggota ({text})
          </button>
        );
      }
    },
    {
      title: 'Terakhir Login',
      render: (text: any, record: any) => (
        <span>
          {record?.data
            ? record?.data.last_sign_in_at
              ? dateFormat(record.data.last_sign_in_at)
              : '-'
            : record?.last_sign_in_at
            ? record?.last_sign_in_at
            : '-'}
        </span>
      ),
      width: 200
    },
    {
      title: 'Status Undangan',
      dataIndex: 'data.is_active',
      width: 180,
      render: (text: number, record: any) => {
        const recordData = record?.data || record;
        if (
          recordData?.detail_user?.status_invitation?.toLowerCase() == 'active'
        ) {
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
      width: 200,
      fixed: 'right',
      render: (text: string, record: any) => {
        const recordData = record?.data || record;
        return (
          <Row gutter={[8, 8]}>
            <RenderIf
              isTrue={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.log_aktifitas_koordinator
              })}
            >
              <Col>
                <Button
                  onClick={() =>
                    router.push(
                      `/admin/log-aktivitas/koordinator/${recordData?.id}`
                    )
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
                onClick={() => confirmDelete(recordData?.id)}
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
        if (tempWilayah.provinsi) {
          const resKota = await fetchWrapper.get(
            `/api/daerah-indonesia/kota?id_provinsi=${tempWilayah.provinsi}`
          );

          setKotaData(resKota);
        }

        if (tempWilayah.kota) {
          const resKecamatan = await fetchWrapper.get(
            `/api/daerah-indonesia/kecamatan?id_kota=${tempWilayah.kota}`
          );
          setKecamatanData(resKecamatan);
        }

        if (tempWilayah.kecamatan) {
          const resKelurahan = await fetchWrapper.get(
            `/api/daerah-indonesia/kelurahan?id_kecamatan=${tempWilayah.kecamatan}`
          );
          setKelurahanData(resKelurahan);
        }
      } catch (error) {
        // console.log(error);
      }
    }

    getValues();
  }, [tempWilayah]);

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
        <title>Koordinator</title>
      </Head>
      <HeaderPage
        title="Daftar Koordinator"
        action={
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpenModalCreate(true);
                setIsCreate(true);
              }}
            >
              Tambah Koordinator
            </Button>
          </>
        }
      />
      <Row className="mt-7">
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24} xl={16}>
              <BreadcrumbWilayah
                wilayah={bcWilayah}
                resetWilayah={resetBcWilayah}
              />
            </Col>
            <Col xs={24} className="mt-7">
              <Table
                dataSource={koordinatorData?.data}
                columns={columns}
                scroll={{ x: 1000 }}
              />
            </Col>
          </>
        )}
      </Row>

      <ModalAddKoordinator
        setKelurahanId={setKelurahanId}
        isCreate={isCreate}
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
        modalState={modalState}
        wilayah={tempWilayah}
        setWilayah={handleChangeTempWilayah}
        setDynamicModalState={setDynamicModalState}
        relawanData={relawanData}
        saksiData={saksiData}
        anggotaRelawan={anggotaRelawan}
        anggotaSaksi={anggotaSaksi}
        setAnggotaRelawan={setAnggotaRelawan}
        setAnggotaSaksi={setAnggotaSaksi}
        onSearchRelawan={handleSearchRelawan}
        onSearchSaksi={handleSearchSaksi}
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

KoordinatorPage.layout = Admin;

export default KoordinatorPage;
