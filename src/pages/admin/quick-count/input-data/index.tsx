import { Alert, Button, Col, Form, Row, Select, Table, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { RespondenInterface } from '../../../../@types/Count';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface,
  WilayahInterface
} from '../../../../@types/DaerahIndonesia';
import {
  FormWilayah,
  HeaderPage,
  ModalConfirmation,
  Spinner
} from '../../../../components';
import { ModalAddSampleQuickCount } from '../../../../components/organisms';
import { useColumnSearch, usePagination } from '../../../../customHooks';
import { Admin } from '../../../../layouts';
import {
  useCalonAnggota,
  useCurrentTeam,
  usePartai,
  usePasanganCalon,
  useProfile,
  useRespondenQuickCount,
  useTPS
} from '../../../../swr';
import {
  dateFormat,
  debugValues,
  fetchWrapper,
  responseMessage
} from '../../../../utils';

const { Option } = Select;

const PemilihPage = () => {
  const [formAdd] = useForm();
  const [refresh, setRefresh] = useState(true);
  const [currentPage, onChangePagination] = usePagination(1);
  const [id, setId] = useState<null | number>(null);
  const [wilayah, setWilayah] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });
  const [modalWilayah, setModalWilayah] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const { getColumnSearchProps } = useColumnSearch();
  const [partai, setPartai] = useState<number | undefined>(undefined);

  // swr
  const { data: currentTeam } = useCurrentTeam(true);
  const isLegislatif = currentTeam?.data?.jenis_pencalonan === 1;

  const { data: paslonData } = usePasanganCalon(!isLegislatif);
  const { data: partaiData } = usePartai(isLegislatif, '1');

  const { data: calonAnggota } = useCalonAnggota({
    mounted: isLegislatif,
    page: 1,
    search: '',
    partai
  });

  const { data: respondenData, isLoading } = useRespondenQuickCount({
    mounted: refresh,
    propinsi_id: wilayah.provinsi,
    kabupaten_id: wilayah.kota,
    kecamatan_id: wilayah.kecamatan,
    kelurahan_id: wilayah.kelurahan,
    tps: '',
    page: currentPage
  });
  const { data: userData } = useProfile(true);

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
  };

  const onFinish = async (values: any) => {
    console.log(values);
    const formData = new FormData();
    formData.append('metode_pengambilan', values.metode_pengambilan);
    formData.append('kandidat_pilihan_id', values.kandidat_pilihan_id);
    formData.append('propinsi_id', values.propinsi_id);
    formData.append('kabupaten_id', values.kabupaten_id);
    formData.append('kecamatan_id', values.kecamatan_id);
    formData.append('kelurahan_id', values.kelurahan_id);
    formData.append('tps', values.tps);
    formData.append('referal_relawan', userData?.data?.name);
    formData.append('nama_responden', values.nama_responden);
    values.keterangan && formData.append('keterangan', values.keterangan);
    values.no_hp && formData.append('no_hp', values.no_hp);
    values.no_hp_lain && formData.append('no_hp_lain', values.no_hp_lain);
    values.no_hp_lain && formData.append('no_hp_lain', values.no_hp_lain);
    values.nik && formData.append('nik', values.nik);
    values.nik && formData.append('nik', values.nik);
    values.no_hp_lain && formData.append('no_hp_lain', values.no_hp_lain);
    values.bukti && formData.append('bukti', values.bukti);
    values.kandidat_partai_id &&
      formData.append('kandidat_partai_id', values.kandidat_partai_id);
    formData.append('isLegislatif', isLegislatif ? '1' : '0');
    values.usia && formData.append('usia', values.usia);

    setLoading(true);
    await axios
      .post('/api/quick-count/list-responden', formData)
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
      .finally(() => {
        hideLoading();
        onReset();
      });
  };

  const onUpdate = async (values: any) => {
    const formData = new FormData();
    formData.append('metode_pengambilan', values.metode_pengambilan);
    formData.append('kandidat_pilihan_id', values.kandidat_pilihan_id);
    formData.append('propinsi_id', values.propinsi_id);
    formData.append('kabupaten_id', values.kabupaten_id);
    formData.append('kecamatan_id', values.kecamatan_id);
    formData.append('kelurahan_id', values.kelurahan_id);
    formData.append('tps', values.tps);
    formData.append('referal_relawan', userData?.data?.name);
    formData.append('nama_responden', values.nama_responden);
    values.keterangan && formData.append('keterangan', values.keterangan);
    values.no_hp && formData.append('no_hp', values.no_hp);
    values.no_hp_lain && formData.append('no_hp_lain', values.no_hp_lain);
    values.no_hp_lain && formData.append('no_hp_lain', values.no_hp_lain);
    values.nik && formData.append('nik', values.nik);
    values.nik && formData.append('nik', values.nik);
    values.no_hp_lain && formData.append('no_hp_lain', values.no_hp_lain);
    values.bukti && formData.append('bukti', values.bukti);
    values.kandidat_partai_id &&
      formData.append('kandidat_partai_id', values.kandidat_partai_id);
    formData.append('isLegislatif', isLegislatif ? '1' : '0');
    values.usia && formData.append('usia', values.usia);
    await axios
      .post(`/api/quick-count/list-responden?id=${id}`, formData)
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

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/quick-count/list-responden?id=${id}`)
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
  const handleChangeWilayah = (name: string, value: any) => {
    setWilayah({
      ...wilayah,
      [name]: value
    });
  };
  const handleChangeModalWilayah = (name: string, value: any) => {
    setModalWilayah({
      ...modalWilayah,
      [name]: value
    });
  };

  const onReset = () => {
    setModalWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    formAdd.resetFields();
  };

  const handleCloseModal = () => {
    setOpenModalCreate(false);
    setIsDetail(false);
    setIsEdit(false);
    onReset();
  };

  const confirmDelete = (id: number) => {
    setOpenModalDelete(true);
    setId(id);
  };

  const handleOpenModalToUpdate = (record: RespondenInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    setModalWilayah({
      provinsi: +record.propinsi.id,
      kecamatan: +record.kecamatan.id,
      kota: +record.kabupaten.id,
      kelurahan: +record.kelurahan.id
    });

    let tempObj: any = {};
    if (isLegislatif) {
      tempObj['kandidat_pilihan_id'] = record.kandidat_calon_anggota_id;
      tempObj['kandidat_partai_id'] = record.kandidat_partai_id;
      setPartai(() => record?.kandidat_partai_id);
    } else {
      tempObj['kandidat_pilihan_id'] = record.kandidat_pilihan_id;
    }
    formAdd.setFieldsValue({
      metode_pengambilan: record.metode_pengambilan,
      propinsi_id: record.propinsi_id,
      kabupaten_id: record.kabupaten_id,
      kecamatan_id: record.kecamatan_id,
      kelurahan_id: record.kelurahan_id,
      tps: record.tps,
      referal_relawan: userData?.data?.name,
      nama_responden: record.nama_responden,
      keterangan: record.keterangan,
      no_hp: record.no_hp,
      no_hp_lain: record.no_hp_lain,
      nik: record.nik,
      bukti: record.bukti,
      usia: record.usia,
      ...tempObj
    });
  };

  const handleOpenModalToDetail = (record: RespondenInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsDetail(true);
    setModalWilayah({
      provinsi: +record.propinsi.id,
      kecamatan: +record.kecamatan.id,
      kota: +record.kabupaten.id,
      kelurahan: +record.kelurahan.id
    });

    let tempObj: any = {};
    if (isLegislatif) {
      tempObj['kandidat_pilihan_id'] = record.kandidat_calon_anggota_id;
      tempObj['kandidat_partai_id'] = record.kandidat_partai_id;
      setPartai(() => record?.kandidat_partai_id);
    } else {
      tempObj['kandidat_pilihan_id'] = record.kandidat_pilihan_id;
    }

    formAdd.setFieldsValue({
      metode_pengambilan: record.metode_pengambilan,
      propinsi_id: record.propinsi_id,
      kabupaten_id: record.kabupaten_id,
      kecamatan_id: record.kecamatan_id,
      kelurahan_id: record.kelurahan_id,
      tps: record.tps,
      referal_relawan: userData?.data?.name,
      nama_responden: record.nama_responden,
      keterangan: record.keterangan,
      no_hp: record.no_hp,
      no_hp_lain: record.no_hp_lain,
      nik: record.nik,
      bukti: record.bukti,
      usia: record.usia,
      ...tempObj
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
      title: 'Tanggal Input',
      key: 'tanggal input',
      dataIndex: 'created_at',
      render: (text: string) => <span>{dateFormat(text)}</span>
    },
    {
      title: 'Nama Responden',
      key: 'nama responden',
      dataIndex: 'nama_responden',
      ...getColumnSearchProps('nama_responden')
    },
    isLegislatif
      ? {
          title: 'Pilihan partai',
          key: 'pilihan_partai',
          dataIndex: 'kandidat_pilihan_partai',
          render: (text: string, responden: RespondenInterface) => {
            return <span>{responden?.kandidat_partai?.nama_partai}</span>;
          }
        }
      : {},
    {
      title: 'Pilihan Calon',
      key: 'pilihan',
      dataIndex: 'kandidat_pilihan',
      render: (text: string, responden: RespondenInterface) => {
        const hasil = isLegislatif
          ? `${responden?.kandidat_calon_anggota?.nama_calon}`
          : `Paslon ${responden.kandidat_pilihan?.nomor_urut}`;

        return <span>{hasil}</span>;
      }
    },
    {
      title: 'Relawan',
      key: 'relawan',
      dataIndex: 'relawan',
      render: (text: string, responden: RespondenInterface) => (
        <span>{responden.relawan.name}</span>
      )
    },
    {
      title: 'Aksi',
      width: 300,
      fixed: 'right',
      render: (text: string, record: RespondenInterface) => {
        return (
          <Row gutter={[16, 16]}>
            <Col>
              <Button onClick={() => handleOpenModalToDetail(record)}>
                Detail
              </Button>
            </Col>
            <Col>
              <Button
                className="ant-btn-light-success"
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
    formAdd.setFieldsValue({
      ...formAdd.getFieldsValue(),
      saksi: userData?.data?.name
    });
  }, [formAdd, userData?.data?.name]);

  useEffect(() => {
    async function getValues() {
      try {
        if (wilayah.provinsi || modalWilayah.provinsi) {
          const resKota = await fetchWrapper.get(
            `/api/daerah-indonesia/kota?id_provinsi=${
              modalWilayah.provinsi || wilayah.provinsi
            }`
          );

          setKotaData(resKota);
        }

        if (wilayah.kota || modalWilayah.kota) {
          const resKecamatan = await fetchWrapper.get(
            `/api/daerah-indonesia/kecamatan?id_kota=${
              wilayah.kota || modalWilayah.kota
            }`
          );
          setKecamatanData(resKecamatan);
        }

        if (wilayah.kecamatan || modalWilayah.kecamatan) {
          const resKelurahan = await fetchWrapper.get(
            `/api/daerah-indonesia/kelurahan?id_kecamatan=${
              wilayah.kecamatan || modalWilayah.kecamatan
            }`
          );
          setKelurahanData(resKelurahan);
        }
      } catch (error) {
        // console.log(error);
      }
    }

    getValues();
  }, [wilayah, modalWilayah]);

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

  const tableData = isLegislatif
    ? respondenData?.data?.data?.filter(
        (item: RespondenInterface) => item?.kandidat_calon_anggota?.nama_calon
      )
    : respondenData?.data?.data?.filter(
        (item: RespondenInterface) => item.kandidat_pilihan?.nomor_urut
      );

  return (
    <>
      <Head>
        <title>Input Data | Quick Count</title>
      </Head>
      <HeaderPage
        title="List Data Quick Count"
        action={
          <>
            <Button type="primary" onClick={() => setOpenModalCreate(true)}>
              Tambah Quick Count
            </Button>
          </>
        }
      />
      <Row className="mt-7">
        <Col xs={24} md={12}>
          <Form layout="vertical" initialValues={{ remember: true }}>
            <Row>
              <Col xs={24}>
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
              </Col>
            </Row>
          </Form>
        </Col>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={tableData}
                columns={columns}
                pagination={{
                  total: respondenData?.data?.total,
                  current: currentPage,
                  onChange: onChangePagination
                }}
                scroll={{ x: 500 }}
              />
            </Col>
          </>
        )}
      </Row>
      <ModalAddSampleQuickCount
        visible={openModalCreate}
        paslons={paslonData?.data?.data}
        onCancel={handleCloseModal}
        draggerProps={draggerProps}
        onCreate={onFinish}
        onUpdate={onUpdate}
        loading={loading}
        form={formAdd}
        isEdit={isEdit}
        isDetail={isDetail}
        wilayah={modalWilayah}
        setWilayah={handleChangeModalWilayah}
        provinsiData={provinsiData}
        kotaData={kotaData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        withKelurahan={true}
        isLegislatif={currentTeam?.data?.jenis_pencalonan === 1}
        partaiData={partaiData?.data?.data}
        calonAnggotaData={calonAnggota?.data?.data}
        setPartaiSelected={setPartai}
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

PemilihPage.layout = Admin;

export default PemilihPage;
