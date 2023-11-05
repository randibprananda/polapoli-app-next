import { Alert, Button, Col, Form, Row, Select, Table, message } from 'antd';
import {
  FormDapil,
  FormWilayah,
  Gap,
  HeaderPage,
  ModalAddDataDPT,
  ModalConfirmation,
  Search,
  Spinner
} from '../../../components';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface,
  WilayahInterface
} from '../../../@types/DaerahIndonesia';
import React, { useEffect, useState } from 'react';
import {
  cleanObject,
  dateFormat,
  fetchWrapper,
  generateFormDataObj,
  responseMessage
} from '../../../utils';
import {
  getDapil,
  setDapil as setDapilValue
} from '../../../components/moleculs/FormDapil';
import {
  useCurrentTeam,
  useDPTdata,
  useDPTdataByNIK,
  useDapilAvailablePemilih,
  useDetailDPTdata,
  usePemilihData,
  usePemilihDataByDapil,
  useProfile
} from '../../../swr';
import { usePagination, useSearch } from '../../../customHooks';

import { Admin } from '../../../layouts';
import { DPTInterface } from '../../../@types/Pendukung';
import { DraggerProps } from 'antd/lib/upload';
import Head from 'next/head';
import moment from 'moment';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/router';

const { Option } = Select;

const DataPemilihPage = () => {
  const [formAdd] = useForm();
  const [formDapil] = useForm();

  const router = useRouter();

  const [id, setId] = useState<null | number>(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [isDetail, setIsDetail] = useState(true);
  const [nik, setNIK] = useState<string | null>(null);
  const [isPemilih, setIsPemilih] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [wilayah, setWilayah] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });
  const [tempWilayah, setTempWilayah] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });
  const [dapil, setDapil] = useState<number | undefined>(undefined);

  const [search, handleSearch] = useSearch('');
  const [searchNIK, handleSearchNIK] = useSearch('');

  const [currentPage, onChangePagination] = usePagination(1);
  const { data: timRelawanData } = useCurrentTeam(true);

  // service
  const { data: pemilihData, isLoading } = usePemilihData(
    refresh,
    wilayah?.kelurahan,
    currentPage,
    search
  );
  const { data: dptData } = useDPTdataByNIK(true, searchNIK);
  const { data: tempDetailDPTData } = useDPTdataByNIK(!!nik, nik);
  const { data: userData } = useProfile(true);
  const { data: dapilAvailable } = useDapilAvailablePemilih(true);
  const { data: pemilihDataByDapil } = usePemilihDataByDapil(true, dapil);

  const detailDPTData = {
    data: tempDetailDPTData?.data[0]
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
      return isPNG;
    },
    maxCount: 1
  };

  const onReset = () => {
    setWilayah({
      provinsi: tempWilayah.provinsi,
      kecamatan: tempWilayah.kecamatan,
      kota: tempWilayah.kota,
      kelurahan: tempWilayah.kelurahan
    });
    setTempWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    formAdd.resetFields();
    setIsDetail(false);
    setId(null);
  };

  const hideModal = () => {
    setOpenModalCreate(false);
    setOpenModalDelete(false);
    setRefresh(false);
    setIsPemilih(false);
    onReset();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const handleChangeWilayah = (name: string, value: any) => {
    if (dapil) {
      setDapil(() => undefined);
    }
    setWilayah({
      ...wilayah,
      [name]: value
    });
  };

  const handleOpenModalDetail = (record: DPTInterface) => {
    setTempWilayah({
      provinsi: wilayah.provinsi,
      kecamatan: wilayah.kecamatan,
      kota: wilayah.kota,
      kelurahan: wilayah.kelurahan
    });
    setOpenModalCreate(true);
    setIsDetail(true);
    setWilayah({
      provinsi: +record.propinsi_id,
      kecamatan: +record.kabupaten_id,
      kota: +record.kecamatan_id,
      kelurahan: +record.kelurahan_id
    });
    formAdd.setFieldsValue({
      nik: record.nik,
      nama: record.nama,
      tempat_lahir: record.tempat_lahir,
      tanggal_lahir: moment(record.tanggal_lahir, 'DD-MM-YYYYTHH:mm:ssZ'),
      jenis_kelamin: record.jenis_kelamin,
      propinsi_id: +record.propinsi_id,
      kabupaten_id: +record.kabupaten_id,
      kecamatan_id: +record.kecamatan_id,
      kelurahan_id: +record.kelurahan_id,
      tps: record.tps,
      rw: record.rw,
      rt: record.rt,
      alamat: record.alamat,
      is_pendukung: record.is_pendukung,
      agama: record?.agama?.toLowerCase(),
      suku: record?.suku,
      keterangan: record?.keterangan,
      referal_relawan: record?.referal_relawan,
      no_hp: record?.no_hp,
      no_hp_lainnya: record?.no_hp_lainnya,
      email: record?.email,
      foto: record?.foto,
      foto_ktp: record?.foto_ktp
    });
  };

  const handleOpenModalCreate = () => {
    setTempWilayah({
      provinsi: wilayah.provinsi,
      kecamatan: wilayah.kecamatan,
      kota: wilayah.kota,
      kelurahan: wilayah.kelurahan
    });

    formAdd.resetFields();
    setOpenModalCreate(true);
    setIsDetail(false);
    setIsPemilih(true);
  };

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/data-pemilih?id=${id}`)
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

  const handleSetNIK = (nik: any) => {
    setNIK(nik);
  };

  const confirmDelete = (id: number) => {
    setTempWilayah({
      provinsi: wilayah.provinsi,
      kecamatan: wilayah.kecamatan,
      kota: wilayah.kota,
      kelurahan: wilayah.kelurahan
    });
    setOpenModalDelete(true);
    setId(id);
  };

  const onCreate = (values: any) => {
    const newObj = cleanObject(values);
    const tempVal = {
      ...newObj,
      is_pendukung: isPemilih ? 1 + '' : 0 + '',
      tanggal_lahir: newObj.tanggal_lahir.format('DD-MM-YYYY'),
      kelurahan_id: newObj.kelurahan_id + '',
      dapil: setDapilValue(values)
    };

    const formData = new FormData();
    const newFormData = generateFormDataObj(formData, tempVal);

    setLoading(true);
    fetchWrapper
      .post_multipart('/api/data-pemilih', newFormData)
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

  const onUpdate = () => {};

  const handleSelectDapil = (d: number) => {
    if (wilayah?.provinsi) {
      setWilayah({
        provinsi: null,
        kecamatan: null,
        kota: null,
        kelurahan: null
      });
    }
    setDapil(d);
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
      title: 'NIK',
      dataIndex: 'nik',
      key: 'nik',
      width: 200
    },
    {
      title: 'Nama Lengkap',
      dataIndex: 'nama',
      key: 'nama',
      width: 200
    },
    {
      title: 'Wilayah',
      dataIndex: 'id',
      key: 'id',
      render: (id: any, record: any) => (
        <span>{`${record.propinsi?.name} - ${record.kabupaten?.name} - ${record.kecamatan?.name} - ${record.kelurahan?.name}`}</span>
      )
    },
    {
      title: 'No. HP',
      dataIndex: 'no_hp',
      key: 'no_hp',
      width: 160
    },
    {
      title: 'Direkrut Oleh',
      dataIndex: 'referal_relawan',
      key: 'referal_relawan',
      width: 160,
      render: (text: string, record: any) => <span>{record.user.name}</span>
    },
    {
      title: 'Tanggal Rekrut',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      render: (text: string) => <span>{text ? dateFormat(text) : '-'}</span>
    },
    {
      title: 'Aksi',
      width: 200,
      fixed: 'right',
      render: (text: string, record: any) => {
        return (
          <Row gutter={[16, 16]}>
            <Col>
              <Button onClick={() => handleOpenModalDetail(record)}>
                Detail
              </Button>
            </Col>
            <Col>
              <Button danger onClick={() => confirmDelete(record.id)}>
                Hapus
              </Button>
            </Col>
          </Row>
        );
      }
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
      } catch (error) {}
    }

    getValues();
  }, [wilayah]);

  useEffect(() => {
    if (detailDPTData?.data) {
      setTempWilayah({
        provinsi: wilayah.provinsi,
        kecamatan: wilayah.kecamatan,
        kota: wilayah.kota,
        kelurahan: wilayah.kelurahan
      });
      setWilayah({
        provinsi: +detailDPTData?.data.propinsi_id,
        kecamatan: +detailDPTData?.data.kecamatan_id,
        kota: +detailDPTData?.data.kabupaten_id,
        kelurahan: +detailDPTData?.data.kelurahan_id
      });
      formAdd.setFieldsValue({
        nik: detailDPTData?.data.nik,
        nama: detailDPTData?.data.nama,
        tempat_lahir: detailDPTData?.data.tempat_lahir,
        tanggal_lahir: moment(
          detailDPTData?.data.tanggal_lahir,
          'DD-MM-YYYYTHH:mm:ssZ'
        ),
        jenis_kelamin: detailDPTData?.data.jenis_kelamin,
        propinsi_id: +detailDPTData?.data.propinsi_id,
        kabupaten_id: +detailDPTData?.data.kabupaten_id,
        kecamatan_id: +detailDPTData?.data.kecamatan_id,
        kelurahan_id: +detailDPTData?.data.kelurahan_id,
        tps: detailDPTData?.data.tps,
        rw: detailDPTData?.data.rw,
        rt: detailDPTData?.data.rt,
        alamat: detailDPTData?.data.alamat,
        is_pendukung: detailDPTData?.data.is_pendukung,
        referal_relawan: userData?.data?.name,
        ...getDapil(detailDPTData?.data.dapil)
      });
    }
  }, [nik, detailDPTData?.data]);

  const filteredDapil = dapilAvailable
    ?.filter((item: any) => item?.dapil)
    ?.map((item: any) => item?.dapil)
    ?.sort((a: number, b: number) => a - b);

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

  console.log(pemilihData?.data?.data || pemilihDataByDapil?.data?.data);

  return (
    <>
      <Head>
        <title>Data Pemilih</title>
      </Head>
      <HeaderPage
        title="Daftar Pemilih/Dukungan Terkumpul"
        action={
          <>
            <Button type="primary" onClick={handleOpenModalCreate}>
              Tambah Pemilih/Pendukung
            </Button>
          </>
        }
      />
      <Row className="mt-7" gutter={[6, 24]}>
        <Col xs={24} md={12}>
          <Form layout="vertical" initialValues={{ remember: true }}>
            <FormWilayah
              wilayah={wilayah}
              setWilayah={handleChangeWilayah}
              provinsiData={provinsiData}
              kotaData={kotaData}
              kecamatanData={kecamatanData}
              kelurahanData={kelurahanData}
              withKelurahan={true}
              withTitle={false}
            />
          </Form>
        </Col>

        <Col xs={24}>
          <div className="flex items-center justify-between mb-8">
            <div className="w-40 ">
              <label className="inline-block mb-2 text-base font-semibold">
                Dapil
              </label>
              <Select
                className="w-full"
                placeholder="Dapil"
                onChange={e => handleSelectDapil(e)}
                value={dapil}
              >
                <Option value={undefined}>-- Pilih Dapil --</Option>
                {filteredDapil?.map((item: number) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            <Search value={search} onChange={handleSearch} />
          </div>
        </Col>
        {false ? (
          <div className="flex items-center justify-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={
                  pemilihData?.data?.data ||
                  pemilihDataByDapil?.data?.data ||
                  []
                }
                columns={columns}
                scroll={{ x: 1500 }}
                pagination={{
                  total:
                    pemilihData?.data?.total || pemilihDataByDapil?.data?.total,
                  current: currentPage,
                  onChange: onChangePagination
                }}
              />
            </Col>
          </>
        )}
      </Row>

      <ModalAddDataDPT
        visible={openModalCreate}
        onCancel={() => {
          setOpenModalCreate(false);
          onReset();
        }}
        isEdit={false}
        loading={loading}
        onCreate={onCreate}
        onUpdate={onUpdate}
        provinsiData={provinsiData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        kotaData={kotaData}
        form={formAdd}
        wilayah={wilayah}
        setWilayah={handleChangeWilayah}
        isPemilih={true}
        draggerPropsKTP={draggerProps}
        draggerPropsFoto={draggerProps}
        isDetail={isDetail}
        withButton={!isDetail}
        dptData={searchNIK.length > 0 ? dptData?.data : []}
        setNIK={handleSetNIK}
        onSearchNIK={handleSearchNIK}
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

DataPemilihPage.layout = Admin;

export default DataPemilihPage;
