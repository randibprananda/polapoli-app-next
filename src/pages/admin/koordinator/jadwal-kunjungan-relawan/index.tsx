import { Alert, Button, Col, Row, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../../@types/DaerahIndonesia';
import { JadwalKunjunganRelawanInterface } from '../../../../@types/Survei';
import {
  Filter,
  HeaderPage,
  ModalAddJadwalKunjungan,
  ModalConfirmation,
  Search,
  Spinner
} from '../../../../components';
import { JENIS_SURVEY } from '../../../../constant';
import { useFilter, usePagination, useSearch } from '../../../../customHooks';
import { Admin } from '../../../../layouts';
import {
  useCurrentTeam,
  useJadwalKunjuanganRelawan,
  useProfile,
  useRelawan
} from '../../../../swr';
import useRelawanByKelurahan from '../../../../swr/relawan/use-relawan-by-kelurahan/index';
import { fetchWrapper, responseMessage } from '../../../../utils';

const filterOptions = [
  {
    value: JENIS_SURVEY.All,
    label: 'Semua Survei'
  },
  {
    value: JENIS_SURVEY.Educate,
    label: 'Educate'
  },
  {
    value: JENIS_SURVEY.Survei,
    label: 'Survei'
  }
];

const JadwalKunjungan = () => {
  const [form] = useForm();

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [id, setId] = useState<null | number>(null);
  const [refresh, setRefresh] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useFilter(JENIS_SURVEY.All);

  const handleChangeFilter = (val: any) => {
    setFilter(val);
  };

  const [currentPage, onChangePagination] = usePagination(1);
  const [search, handleSearch] = useSearch('');
  const [searchRelawan, handleSearchRelawan] = useSearch('');

  // services
  // const { data: relawanData } = useRelawan(true, 1, searchRelawan);

  const { data: timRelawan } = useCurrentTeam(true);
  const { data: jadwalKunjunganData, isLoading } = useJadwalKunjuanganRelawan({
    mounted: refresh,
    page: currentPage,
    search,
    type: filter
  });
  const { data: userData, role: userRole } = useProfile(true);

  // wilayah
  const [selectedKelurahanId, setSelectedKelurahanId] = useState(0);
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

  const { data: relawanData } = useRelawanByKelurahan(
    true,
    selectedKelurahanId,
    searchRelawan
  );

  const handleChangeWilayah = (name: string, value: any) => {
    if (name === 'kelurahan') {
      setSelectedKelurahanId(value);
    }

    setWilayah({
      ...wilayah,
      [name]: value
    });
  };

  const onReset = () => {
    setWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    form.resetFields();
    setIsEdit(false);
    setId(null);
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

  const confirmDelete = (id: number) => {
    setOpenModalDelete(true);
    setId(id);
  };

  const onUpdate = (values: any) => {
    // console.log(values);
    const formData = {
      ...values,
      // jadwal_kunjungan: values.jadwal_kunjungan.format('YYYY-MM-DD'),
      tim_relawan_id: timRelawan?.data?.id
    };
    setLoading(true);
    fetchWrapper
      .post(`/api/koordinator/jadwal-kunjungan-relawan?id=${id}`, formData)
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

  const onCreate = (values: any) => {
    const formData = {
      ...values,
      jadwal_kunjungan: values.jadwal_kunjungan.format('YYYY-MM-DD'),
      tim_relawan_id: timRelawan?.data?.id
    };
    setLoading(true);
    fetchWrapper
      .post('/api/koordinator/jadwal-kunjungan-relawan', formData)
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

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/koordinator/jadwal-kunjungan-relawan?id=${id}`)
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

  const handleOpenModalToUpdate = (record: JadwalKunjunganRelawanInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    setWilayah({
      provinsi: +record.propinsi_id,
      kecamatan: +record.kecamatan_id,
      kota: +record.kabupaten_id,
      kelurahan: +record.kelurahan_id
    });
    form.setFieldsValue({
      jenis_survey: record.jenis_survey,
      user_id: record.user_id,
      jadwal_kunjungan: record.jadwal_kunjungan,
      propinsi_id: +record.propinsi_id,
      kabupaten_id: +record.kabupaten_id,
      kecamatan_id: +record.kecamatan_id,
      kelurahan_id: +record.kelurahan_id,
      keterangan: record.keterangan,
      rt: record.rt,
      rw: record.rw
    });
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
      title: 'Nama Relawan',
      width: 200,
      render: (_: any, record: JadwalKunjunganRelawanInterface) => (
        <span>{record?.user.name}</span>
      )
    },
    {
      title: 'Jenis Survei',
      width: 150,
      dataIndex: 'jenis_survey',
      render: (text: string) => <span className="capitalize">{text}</span>
    },
    {
      title: 'Tanggal Kunjungan',
      width: 200,
      dataIndex: 'jadwal_kunjungan'
    },
    {
      title: 'Wilayah',
      width: 200,
      render: (_: any, record: JadwalKunjunganRelawanInterface) => {
        const getPlace = (place?: string, withComma = true) =>
          place ? (withComma ? place + ', ' : place + '.') : '';

        return `${getPlace(record?.kelurahan?.name)}${getPlace(
          record?.kecamatan?.name
        )}${getPlace(record?.kabupaten?.name)}${getPlace(
          record?.propinsi?.name,
          false
        )}`;
      }
    },
    {
      title: 'Aksi',
      width: 200,
      fixed: 'right',
      render: (_: any, record: JadwalKunjunganRelawanInterface) => (
        <Row gutter={[8, 8]}>
          {/* <Col>
            <Button onClick={() => {}}>Detail</Button>
          </Col> */}
          <Col>
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record)}
            >
              Edit
            </Button>
          </Col>
          <Col>
            <Button danger onClick={() => confirmDelete(record.id)}>
              Hapus
            </Button>
          </Col>
        </Row>
      )
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
      } catch (error) {
        // console.log(error);
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
        <title>Jadwal Kunjuangan Relawan | Koordinator</title>
      </Head>
      <HeaderPage
        title="Jadwal Kunjungan Relawan"
        action={
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpenModalCreate(true);
                // setIsEdit(true)
              }}
            >
              Tambah Jadwal
            </Button>
          </>
        }
      />
      <Row className="mt-7">
        <Col xs={24}>
          <div className="flex items-center justify-between mb-8">
            <Filter
              data={filterOptions}
              label="Filter"
              value={filter}
              onChange={handleChangeFilter}
            />
            <Search value={search} onChange={handleSearch} />
          </div>
        </Col>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24} className="mt-7">
              <Table
                dataSource={jadwalKunjunganData?.data?.data}
                columns={columns}
                scroll={{ x: 1000 }}
                pagination={{
                  total: jadwalKunjunganData?.data?.total,
                  current: currentPage,
                  onChange: onChangePagination
                }}
              />
            </Col>
          </>
        )}
      </Row>

      <ModalAddJadwalKunjungan
        form={form}
        loading={loading}
        isEdit={isEdit}
        isDetail={isDetail}
        visible={openModalCreate}
        onUpdate={onUpdate}
        onCreate={onCreate}
        onCancel={handleCloseModal}
        provinsiData={provinsiData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        kotaData={kotaData}
        wilayah={wilayah}
        setWilayah={handleChangeWilayah}
        relawanData={relawanData}
        onSearchRelawan={handleSearchRelawan}
      />

      {/* Modal Delete */}
      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(id)}
      />
      {/* Modal Delete */}
    </>
  );
};

JadwalKunjungan.layout = Admin;

export default JadwalKunjungan;
