import { Row, Col, Typography, Button, Table, message, Alert } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../@types/DaerahIndonesia';
import { IsuInterface, JenisIsuInterface } from '../../../@types/Isu';
import { IlWarning } from '../../../assets';
import {
  Filter,
  Gap,
  HeaderPage,
  ModalAddIsu,
  ModalConfirmation,
  ModalDetailIsu,
  Search,
  Spinner
} from '../../../components';
import { getDapil, setDapil } from '../../../components/moleculs/FormDapil';
import { PERMISSION } from '../../../constant/contract';
import { useFilter, usePagination, useSearch } from '../../../customHooks';
import { Admin } from '../../../layouts';
import { useCurrentTeam, useIsu, useJenisIsu, useProfile } from '../../../swr';
import {
  checkPermissionArray,
  fetchWrapper,
  responseMessage
} from '../../../utils';

const { Title } = Typography;

const IssueMonitoring = () => {
  const router = useRouter();
  const [refresh, setRefresh] = useState(true);
  const [form] = useForm();
  const [formDetail] = useForm();
  const [tempWilayah, setTempWilayah] = useState<{
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
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAbaikan, setOpenModalAbaikan] = useState(false);

  const [loading, setLoading] = useState(false);
  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [id, setId] = useState(0);
  const [fileEdit, setFileEdit] = useState<any>(null);
  const [modalState, setModalState] = useState<{
    isEdit: boolean;
    withWilayah: boolean;
    jenisWilayahIsu: any;
    withTanggapan: boolean;
  }>({
    withTanggapan: false,
    isEdit: false,
    withWilayah: false,
    jenisWilayahIsu: null
  });

  const [search, handleSearch] = useSearch('');
  const [currentPage, onChangePagination] = usePagination(1);
  const [filter, setFilter] = useFilter('');
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);
  const { data: jenisIsuData } = useJenisIsu();
  const { data: isuData, isLoading } = useIsu({
    mounted: refresh,
    page: currentPage,
    search,
    jenisIsu: filter
  });

  const { data: userData, role: userRole } = useProfile(true);

  const filterData = jenisIsuData?.data
    ? jenisIsuData?.data?.map((item: JenisIsuInterface) => ({
        value: item.id,
        label: item.nama_jenis_isu
      }))
    : [];

  const filterOptions = [
    {
      value: '',
      label: 'Semua Isu'
    },
    ...filterData
  ];
  const handleChangeFilter = (val: any) => {
    setFilter(val);
  };

  const setDynamicModalState = (name: string, value: any) => {
    setModalState({
      ...modalState,
      [name]: value
    });
  };

  const setWithWilayah = (state: boolean) => {
    setModalState({
      ...modalState,
      withWilayah: state
    });
  };

  const setJenisWilayahIsu = (idJenisWilayah: any) => {
    setModalState({
      ...modalState,
      jenisWilayahIsu: idJenisWilayah
    });
  };

  const handleResetForm = () => {
    form.resetFields();
    formDetail.resetFields();
    setFileEdit(null);
    setTempWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    setModalState({
      ...modalState,
      withWilayah: false,
      isEdit: false,
      jenisWilayahIsu: null,
      withTanggapan: false
    });
  };

  const handleCloseModal = () => {
    setOpenModalCreate(false);
    setOpenModalDetail(false);
    setTempWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    handleResetForm();
    form.resetFields();
    formDetail.resetFields();
  };

  const hideModal = () => {
    setOpenModalCreate(false);
    setOpenModalDetail(false);
    setOpenModalDelete(false);
    setOpenModalAbaikan(false);
    setRefresh(false);
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
    handleResetForm();
  };

  const handleDelete = (id: number) => {
    fetchWrapper
      .delete(`/api/isu?id=${id}`)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil dihapus',
          onHide: hideModal
        });
      })
      .catch(() => {
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

  const getJenisWilayahIsu = (wilayah: any[]) => {
    const tempJenisWilayah = wilayah.filter((item: any) => item).length - 1;
    return tempJenisWilayah === -1 || tempJenisWilayah === 0
      ? null
      : tempJenisWilayah.toString();
  };

  const handleOpenModalToUpdate = (record: IsuInterface, withEdit: boolean) => {
    const tempJenisWilayah = getJenisWilayahIsu([
      record.propinsi_id,
      record.kabupaten_id,
      record.kecamatan_id,
      record.kelurahan_id
    ]);

    setId(record.id);
    setOpenModalDetail(true);
    setModalState({
      ...modalState,
      withWilayah: !!record.propinsi_id,
      isEdit: withEdit,
      jenisWilayahIsu: tempJenisWilayah,
      withTanggapan: !!record.tanggapan_isu && record.tanggapan_isu !== '-'
    });

    let wilayahData = {};
    if (record.propinsi_id) {
      wilayahData = {
        propinsi_id: record.propinsi_id,
        kabupaten_id: record.kabupaten_id,
        kecamatan_id: record.kecamatan_id,
        kelurahan_id: record.kelurahan_id,
        isu_wilayah: true
      };

      setTempWilayah({
        provinsi: record.propinsi_id,
        kota: record.kabupaten_id,
        kecamatan: record.kecamatan_id,
        kelurahan: record.kelurahan_id
      });
    }

    let tanggapan = {};
    if (record.tanggapan_isu) {
      tanggapan = { tanggapan_isu: record.tanggapan_isu };
    }
    let online = {};
    if (record.judul_isu) {
      online = {
        judul_isu: record.judul_isu,
        url_isu: record.url_isu
      };
    }

    let dapil = {};
    if (record.dapil) {
      dapil = getDapil(record.dapil);
    }

    formDetail.setFieldsValue({
      jenis_isu_id: record.jenis_isu_id,
      dampak_isu: record.dampak_isu,
      tanggal_isu: moment(record.tanggal_isu, 'DD-MM-YYYYTHH:mm:ssZ'),
      keterangan_isu: record.keterangan_isu,
      nama_pelapor: record.nama_pelapor,
      foto_isu: record.foto_isu,
      ...wilayahData,
      ...tanggapan,
      ...online,
      ...dapil,
      is_abaikan: record.is_abaikan
    });
  };

  const handleAbaikan = (id: number, isAbaikan = true) => {
    fetchWrapper
      .put(`/api/isu/abaikan?id=${id}`, null)
      .then(() => {
        responseMessage({
          type: 'success',
          message: isAbaikan
            ? 'Isu diabaikan'
            : 'Berhasil batal mengabaikan isu',
          onHide: hideModal
        });
      })
      .catch(() => {
        responseMessage({
          type: 'error',
          message: isAbaikan
            ? 'Gagal mengabaikan isu'
            : 'Gagal batal mengabaikan isu',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const onFinish = (values: any, isUpdate = false) => {
    if (!values.isu_wilayah) {
      delete values.propinsi_id;
      delete values.kabupaten_id;
      delete values.kecamatan_id;
      delete values.kelurahan_id;
    }

    values.dapil = setDapil(values);

    const formData = new FormData();
    formData.append('jenis_isu_id', values.jenis_isu_id);
    formData.append('dampak_isu', values.dampak_isu);
    formData.append('tanggal_isu', values.tanggal_isu.format('DD-MM-YYYY'));
    formData.append('keterangan_isu', values.keterangan_isu);
    formData.append('nama_pelapor', values.nama_pelapor);
    values.judul_isu && formData.append('judul_isu', values.judul_isu);
    values.url_isu && formData.append('url_isu', values.url_isu);
    values.propinsi_id && formData.append('propinsi_id', values.propinsi_id);
    values.kabupaten_id && formData.append('kabupaten_id', values.kabupaten_id);
    values.kecamatan_id && formData.append('kecamatan_id', values.kecamatan_id);
    values.kelurahan_id && formData.append('kelurahan_id', values.kelurahan_id);
    values.dapil && formData.append('dapil', values.dapil);

    modalState.isEdit && fileEdit
      ? formData.append('foto_isu', fileEdit)
      : values.foto_isu && formData.append('foto_isu', values.foto_isu);

    if (!isUpdate) {
      fetchWrapper
        .post_multipart('/api/isu', formData)
        .then(() => {
          responseMessage({
            type: 'success',
            message: 'Data berhasil ditambah',
            onHide: hideModal
          });
        })
        .catch(err => {
          responseMessage({
            type: 'error',
            message: 'Gagal menambah data',
            onHide: hideModal
          });
        })
        .finally(() => hideLoading());
    } else {
      values.tanggapan_isu &&
        fetchWrapper.put(`/api/isu/tanggapan?id=${id}`, {
          tanggapan_isu: values.tanggapan_isu
        });

      fetchWrapper
        .post_multipart(`/api/isu?id=${id}`, formData)
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
    }
  };

  const handleChangeTempWilayah = (name: string, value: any) => {
    setTempWilayah({
      ...tempWilayah,
      [name]: value
    });
  };

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

      modalState.isEdit && setFileEdit(file);
      return isPNG;
    },
    maxCount: 1
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
      title: 'Jenis Isu',
      dataIndex: 'kind_of_issue',
      width: 300,
      key: '1',
      sorter: (a: IsuInterface, b: IsuInterface) =>
        a.kind_of_issue.nama_jenis_isu.length -
        b.kind_of_issue.nama_jenis_isu.length,
      render: (value: JenisIsuInterface) => <p>{value.nama_jenis_isu}</p>,
      filters: jenisIsuData?.data?.map((item: JenisIsuInterface) => ({
        text: item.nama_jenis_isu,
        value: item.nama_jenis_isu
      })),
      onFilter: (value: string, record: IsuInterface) =>
        record.kind_of_issue.nama_jenis_isu.indexOf(value) === 0
    },
    {
      title: 'Judul Isu',
      dataIndex: 'judul_isu',
      width: 250,
      render: (text: string) => <span>{text || '-'}</span>
    },
    {
      title: 'Dampak',
      dataIndex: 'dampak_isu',
      width: 150,
      sorter: (a: IsuInterface, b: IsuInterface) =>
        a.dampak_isu.length - b.dampak_isu.length,
      key: '2',
      filters: [
        {
          text: 'Positif',
          value: 'Positif'
        },
        {
          text: 'Negatif',
          value: 'Negatif'
        },
        {
          text: 'Netral',
          value: 'Netral'
        }
      ],
      onFilter: (value: string, record: IsuInterface) =>
        record.dampak_isu.indexOf(value) === 0
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal_isu',
      width: 150,
      key: '3'
    },
    {
      title: 'Pelapor',
      dataIndex: 'nama_pelapor',
      width: 150,
      key: '6'
    },
    {
      title: 'Ditanggapi Pada',
      dataIndex: 'ditanggapi_pada',
      width: 200,
      key: '8',
      render: (text: string) => <p>{text ? text : '-'}</p>
    },
    {
      title: 'Aksi',
      fixed: 'right',
      width: 220,
      render: (text: string, record: any) => {
        return (
          <div>
            <Button onClick={() => handleOpenModalToUpdate(record, false)}>
              Detail
            </Button>
            <Gap width={16} height={2} />
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record, true)}
            >
              Edit
            </Button>
            <Gap width={16} height={2} />
            <Button danger onClick={() => confirmDelete(record.id)}>
              Hapus
            </Button>
          </div>
        );
      },
      key: 'operation'
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
        <title>Data Laporan Isu</title>
      </Head>
      <HeaderPage
        title="Data Laporan Isu"
        action={
          <Button
            type="primary"
            onClick={() => {
              setJenisWilayahIsu(null);
              setOpenModalCreate(true);
            }}
          >
            Tambah Isu
          </Button>
        }
      />
      <Row className="mt-7">
        <Col xs={24}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <Filter
                data={filterOptions}
                label="Filter"
                value={filter}
                onChange={handleChangeFilter}
              />
            </div>
            <div>
              <Search value={search} onChange={handleSearch} />
            </div>
          </div>
        </Col>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={isuData?.data?.data}
              columns={columns}
              scroll={{ x: 1500 }}
              pagination={{
                total: isuData?.data?.total,
                current: currentPage,
                onChange: onChangePagination
              }}
            />
          </Col>
        )}
      </Row>

      <ModalAddIsu
        tempWilayah={tempWilayah}
        setTempWilayah={handleChangeTempWilayah}
        visible={openModalCreate}
        onCancel={handleCloseModal}
        onFinish={onFinish}
        form={form}
        draggerProps={draggerProps}
        loading={loading}
        kecamatanData={kecamatanData}
        provinsiData={provinsiData}
        kotaData={kotaData}
        kelurahanData={kelurahanData}
        jenisIsu={jenisIsuData?.data}
        withWilayah={modalState.withWilayah}
        setWithWilayah={setWithWilayah}
        jenisWilayahIsu={modalState.jenisWilayahIsu}
        setJenisWilayahIsu={setJenisWilayahIsu}
      />

      <ModalDetailIsu
        isEdit={modalState.isEdit}
        tempWilayah={tempWilayah}
        setTempWilayah={handleChangeTempWilayah}
        visible={openModalDetail}
        onCancel={handleCloseModal}
        onFinish={onFinish}
        form={formDetail}
        draggerProps={draggerProps}
        loading={loading}
        kecamatanData={kecamatanData}
        provinsiData={provinsiData}
        kotaData={kotaData}
        kelurahanData={kelurahanData}
        jenisIsu={jenisIsuData?.data}
        withWilayah={modalState.withWilayah}
        jenisWilayahIsu={modalState.jenisWilayahIsu}
        withTanggapan={
          modalState.withTanggapan &&
          checkPermissionArray({
            roles: listPermission,
            idRole: PERMISSION.verifikasi_data_isu
          })
        }
        setDynamicModalState={setDynamicModalState}
        handleAbaikan={() => setOpenModalAbaikan(true)}
        handleBatalAbaikan={() => handleAbaikan(id, false)}
      />

      <ModalConfirmation
        image={IlWarning}
        text="Apakah kamu yakin abaikan isu ini?"
        visible={openModalAbaikan}
        onCancel={() => setOpenModalAbaikan(false)}
        onOk={() => handleAbaikan(id)}
        textOk="Ya"
        textCancel="Batal"
      />

      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(id)}
      />
    </>
  );
};

IssueMonitoring.layout = Admin;

export default IssueMonitoring;
