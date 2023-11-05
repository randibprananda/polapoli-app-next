import { Alert, Button, Col, Row, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface,
  WilayahInterface
} from '../../../@types/DaerahIndonesia';
import { SurveiInterface } from '../../../@types/Survei';
import {
  HeaderPage,
  ListCardSurvei,
  ModalAddSurvei,
  ModalConfirmation,
  Search,
  Spinner
} from '../../../components';
import { STATUS_SURVEI, TINGKAT_SURVEI } from '../../../constant';
import { ADD_ON, PERMISSION, ROLE } from '../../../constant/contract';
import { usePagination, useSearch } from '../../../customHooks';
import { Admin } from '../../../layouts';
import { useCurrentTeam, useProfile, useSurvei } from '../../../swr';
import {
  checkIsPremium,
  checkPermission,
  checkPermissionArray,
  distinctAddOns,
  fetchWrapper,
  RenderIf,
  responseMessage
} from '../../../utils';

const SurveyPage = () => {
  const [form] = useForm();
  const router = useRouter();

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [id, setId] = useState(0);

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

  // swr
  const [search, handleSearch] = useSearch('');
  const [currentPage, onChangePagination] = usePagination(1);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);
  const { data: surveiData, isLoading } = useSurvei({
    mounted: refresh,
    page: currentPage,
    search,
    type: 'educate'
  });
  const { data: userData, role: userRole } = useProfile(true);

  console.log('data educate', surveiData);

  const filterdAddOn = useMemo(
    () => distinctAddOns(timRelawanData?.data?.order_tim),
    [timRelawanData?.data?.order_tim]
  );

  useEffect(() => {
    if (filterdAddOn?.indexOf(ADD_ON.Survey) === -1) {
      router.back();
    }
  }, [filterdAddOn]);

  const setDynamicModalState = (name: string, value: any) => {
    setModalState({
      ...modalState,
      [name]: value
    });
  };

  const handleChangeTempWilayah = (name: string, value: any) => {
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
    setIsEdit(false);
    setIsDetail(false);
  };

  const handleCloseModal = () => {
    setOpenModalCreate(false);
    onReset();
  };

  const hideModal = () => {
    setOpenModalCreate(false);
    setOpenModalDelete(false);
    setRefresh(false);
    onReset();
  };

  const getJenisWilayah = (wilayah: any[]) => {
    const tempJenisWilayah = wilayah.filter((item: any) => item).length - 1;
    return tempJenisWilayah === -1 ? null : tempJenisWilayah.toString();
  };

  const getWilayahSurvei = (wilayah: any[]) => {
    const wilayahIndex = wilayah.filter((item: any) => item).length - 1;

    return wilayahIndex === -1 ? null : wilayah[wilayahIndex]?.name?.toString();
  };

  const handleOpenModalToUpdate = (record: SurveiInterface) => {
    setId(record.id);
    setIsEdit(true);
    setOpenModalCreate(true);
    setModalState({
      ...modalState,
      withWilayah: !!record.propinsi_id,
      jenisWilayah:
        getJenisWilayah([
          record.propinsi_id,
          record.kabupaten_id,
          record.kecamatan_id,
          record.kelurahan_id,
          record.dapil
        ]) + ''
    });

    let wilayahData = {};
    if (record.propinsi_id) {
      wilayahData = {
        propinsi_id: record.propinsi_id,
        kabupaten_id: record.kabupaten_id,
        kecamatan_id: record.kecamatan_id,
        kelurahan_id: record.kelurahan_id,
        dapil: record.dapil
      };

      setTempWilayah({
        provinsi: record.propinsi_id,
        kota: record.kabupaten_id,
        kecamatan: record.kecamatan_id,
        kelurahan: record.kelurahan_id
      });
    }

    form.setFieldsValue({
      ...wilayahData,
      judul_survey: record.judul_survey,
      range: [
        moment(record.pembukaan_survey, 'DD-MM-YYYYTHH:mm:ssZ'),
        moment(record.penutupan_survey, 'DD-MM-YYYYTHH:mm:ssZ')
      ],
      target_responden: record.target_responden,
      tingkat_survei: TINGKAT_SURVEI.indexOf(record.tingkat_survei) + ''
    });
  };

  const handleOpenModalToDetail = (record: SurveiInterface) => {
    setId(record.id);
    setIsDetail(true);
    setOpenModalCreate(true);
    setModalState({
      ...modalState,
      withWilayah: !!record.propinsi_id,
      jenisWilayah:
        getJenisWilayah([
          record.propinsi_id,
          record.kabupaten_id,
          record.kecamatan_id,
          record.kelurahan_id,
          record.dapil
        ]) + ''
    });

    let wilayahData = {};
    if (record.propinsi_id) {
      wilayahData = {
        propinsi_id: record.propinsi_id,
        kabupaten_id: record.kabupaten_id,
        kecamatan_id: record.kecamatan_id,
        kelurahan_id: record.kelurahan_id,
        dapil: record.dapil
      };

      setTempWilayah({
        provinsi: record.propinsi_id,
        kota: record.kabupaten_id,
        kecamatan: record.kecamatan_id,
        kelurahan: record.kelurahan_id
      });
    }

    form.setFieldsValue({
      ...wilayahData,
      judul_survey: record.judul_survey,
      range: [
        moment(record.pembukaan_survey, 'DD-MM-YYYYTHH:mm:ssZ'),
        moment(record.penutupan_survey, 'DD-MM-YYYYTHH:mm:ssZ')
      ],
      target_responden: record.target_responden,
      tingkat_survei: TINGKAT_SURVEI.indexOf(record.tingkat_survei) + ''
    });
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onFinish = (values: any) => {
    const formData = {
      ...values,
      tingkat_survei: TINGKAT_SURVEI[+values.tingkat_survei],
      pembukaan_survey: values.range[0].format('DD-MM-YYYY'),
      penutupan_survey: values.range[1].format('DD-MM-YYYY')
    };

    setLoading(true);
    fetchWrapper
      .post('/api/survei?type=educate', formData)
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
    const formData = {
      ...values,
      tingkat_survei: TINGKAT_SURVEI[+values.tingkat_survei],
      pembukaan_survey: values.range[0].format('DD-MM-YYYY'),
      penutupan_survey: values.range[1].format('DD-MM-YYYY')
    };

    setLoading(true);
    fetchWrapper
      .put(`/api/survei?id=${id}&type=educate`, formData)
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

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/survei?id=${id}&type=educate`)
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
      title: 'Judul',
      width: 200,
      dataIndex: 'judul_survey'
    },
    {
      title: 'Wilayah',
      width: 200,
      dataIndex: 'wilayah',
      render: (text: any, record: any) => {
        const wilayahSurvei = getWilayahSurvei([
          record.propinsi,
          record.kabupaten,
          record.kecamatan,
          record.kelurahan,
          record.dapil
        ]);

        return (
          <span>
            {record?.propinsi?.name} {record?.kabupaten?.name}{' '}
            {record?.kecamatan?.name} {record?.kelurahan?.name}{' '}
            {record?.dapil && `Dapil ${record?.dapil}`}
          </span>
        );
      }
    },
    {
      title: 'Pertanyaan',
      width: 300,
      dataIndex: 'total_pertanyaan',
      render: (text: string, record: any) => {
        const isDraft = record.status == STATUS_SURVEI.draft;
        const isEmpty = text == '0' || !text;
        if (
          (isEmpty || isDraft) &&
          checkPermissionArray({
            roles: listPermission,
            idRole: PERMISSION.crud_pertanyaan
          })
        ) {
          return (
            <Link href={`/admin/survei/buat-pertanyaan/${record.id}`}>
              <a className="text-rose font-medium">
                {isDraft && !isEmpty ? 'Ubah' : 'Buat'} Pertanyaan{' '}
                {isDraft && !isEmpty && `(${text})`}
              </a>
            </Link>
          );
        }

        return (
          checkPermissionArray({
            roles: listPermission,
            idRole: PERMISSION.input_jawaban_survey
          }) && (
            <Link href={`/admin/survei/soal/${record.id}`}>
              <a className="text-primary font-medium">
                Lihat Pertanyaan ({text})
              </a>
            </Link>
          )
        );
      }
    },
    {
      title: 'Status',
      width: 200,
      dataIndex: 'status',
      render: (text: string) => (
        <span
          className={`capitalize ${
            text === 'draft'
              ? 'text-warning'
              : text === 'publish'
              ? 'text-info'
              : 'text-success'
          } font-medium`}
        >
          {text}
        </span>
      )
    },
    {
      title: 'Aksi',
      fixed: 'right',
      width: 200,
      render: (text: string, record: SurveiInterface) => {
        return (
          <Row gutter={[8, 8]}>
            <RenderIf
              isTrue={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.hasil_survey
              })}
            >
              <Col>
                <Button
                  disabled={
                    record.total_answer == '0' ||
                    !checkIsPremium(timRelawanData?.data.is_premium)
                  }
                  onClick={() =>
                    router.push(`/admin/survei/hasil/${record.id}`)
                  }
                >
                  Hasil Survei
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
        <title>Survei Educate</title>
      </Head>
      <HeaderPage
        title="Data Survei Educate"
        action={
          <RenderIf
            isTrue={checkPermissionArray({
              roles: listPermission,
              idRole: PERMISSION.crud_survey
            })}
          >
            <Button type="primary" onClick={() => setOpenModalCreate(true)}>
              Tambah Survei
            </Button>
          </RenderIf>
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
            <RenderIf
              isTrue={
                checkPermissionArray({
                  roles: listPermission,
                  idRole: PERMISSION.crud_survey
                }) &&
                checkPermissionArray({
                  roles: [
                    ROLE.ProjectManager,
                    ROLE.Koordinator,
                    ROLE.Konsultan
                  ],
                  idRole: userRole?.id
                })
              }
            >
              <Col xs={24}>
                <Table
                  dataSource={surveiData?.data?.data}
                  columns={columns}
                  scroll={{ x: 500 }}
                  pagination={{
                    total: surveiData?.data?.total,
                    current: currentPage,
                    onChange: onChangePagination
                  }}
                />
              </Col>
            </RenderIf>
            <RenderIf
              isTrue={checkPermission({
                role: ROLE.Relawan,
                idRole: userRole?.id
              })}
            >
              <Col xs={24}>
                <ListCardSurvei data={surveiData?.data?.data} />
              </Col>
            </RenderIf>
          </>
        )}
      </Row>
      <ModalAddSurvei
        visible={openModalCreate}
        onCancel={handleCloseModal}
        onFinish={isEdit ? onUpdate : onFinish}
        form={form}
        loading={loading}
        kecamatanData={kecamatanData}
        provinsiData={provinsiData}
        kotaData={kotaData}
        kelurahanData={kelurahanData}
        modalState={modalState}
        wilayah={tempWilayah}
        setWilayah={handleChangeTempWilayah}
        setDynamicModalState={setDynamicModalState}
        isEdit={isEdit}
        isDetail={isDetail}
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

SurveyPage.layout = Admin;

export default SurveyPage;
