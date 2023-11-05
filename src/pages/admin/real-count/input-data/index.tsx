import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Alert, Button, Col, Form, message, Row, Select, Table } from 'antd';

import {
  FormWilayah,
  HeaderPage,
  ModalConfirmation,
  Spinner
} from '../../../../components';
import { Admin } from '../../../../layouts';
import { useForm } from 'antd/lib/form/Form';
import {
  ProvinsiInterface,
  KotaInterface,
  KecamatanInterface,
  KelurahanInterface
} from '../../../../@types/DaerahIndonesia';
import {
  debugValues,
  fetchWrapper,
  objectToArray,
  responseMessage
} from '../../../../utils';
import { ModalAddSampleRealCount } from '../../../../components/organisms';
import { DraggerProps } from 'antd/lib/upload';
import { useRespondenRealCount } from '../../../../swr/real-count';
import {
  useCalonAnggota,
  useCurrentTeam,
  usePartai,
  usePasanganCalon,
  useProfile
} from '../../../../swr';
import {
  CalonAnggotaInterface,
  PaslonInterface
} from '../../../../@types/DataMaster';
import { usePagination } from '../../../../customHooks';
import { RespondenInterface } from '../../../../@types/Count';

const { Option } = Select;

const InpuDataPage = () => {
  const [formAdd] = useForm();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [currentPage, onChangePagination] = usePagination(1);
  const [refresh, setRefresh] = useState(true);
  const [id, setId] = useState<null | number>(null);

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
  const [modalWilayah, setModalWilayah] = useState<{
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

  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [partai, setPartai] = useState<number | undefined>(undefined);

  // swr
  const { data: currentTeam } = useCurrentTeam(true);
  const { data: userData } = useProfile(true);
  const { data: respondenData, isLoading } = useRespondenRealCount({
    mounted: refresh,
    propinsi_id: wilayah.provinsi,
    kabupaten_id: wilayah.kota,
    kecamatan_id: wilayah.kecamatan,
    kelurahan_id: wilayah.kelurahan,
    isLegislatif: currentTeam?.data?.jenis_pencalonan,
    page: currentPage
  });

  const isLegislatif = currentTeam?.data?.jenis_pencalonan === 1;

  const { data: paslonData } = usePasanganCalon(!isLegislatif);
  const { data: partaiData } = usePartai(isLegislatif, '1');
  const { data: calonAnggota } = useCalonAnggota({
    mounted: isLegislatif,
    page: 1,
    search: '',
    partai
  });

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

  const onFinish = async (values: any) => {
    const formData: any = new FormData();
    (isLegislatif ? calonAnggota : paslonData)?.data?.data.map(
      (paslon: PaslonInterface, index: number) => {
        formData.append(`paslon_id[${index}]`, paslon.id + '');
        formData.append(
          `suara_sah_paslon[${index}]`,
          values[`suara_sah_paslon[${index}]`]
        );
      }
    );
    formData.append('propinsi_id', values.propinsi_id);
    formData.append('kabupaten_id', values.kabupaten_id);
    formData.append('kecamatan_id', values.kecamatan_id);
    formData.append('kelurahan_id', values.kelurahan_id);
    formData.append('tps', values.tps);
    // formData.append('saksi', userData?.data?.name);
    formData.append('suara_sah', values.suara_sah);
    formData.append('suara_tidak_sah', values.suara_tidak_sah);
    values.keterangan && formData.append('keterangan', values.keterangan);
    values.foto_form && formData.append('foto_form', values.foto_form);
    values.suara_sah_partai &&
      formData.append('suara_sah_partai', values.suara_sah_partai);
    values.suara_tidak_sah_partai &&
      formData.append('suara_tidak_sah_partai', values.suara_tidak_sah_partai);
    values.partai_id && formData.append('partai_id', values.partai_id);
    formData.append('isLegislatif', isLegislatif ? 1 : 0);

    // debugValues(formData);
    setLoading(true);
    await axios
      .post('/api/real-count/list-responden', formData)
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

  const onUpdate = async (values: any) => {
    const formData: any = new FormData();
    (isLegislatif ? calonAnggota : paslonData)?.data?.data.map(
      (paslon: PaslonInterface, index: number) => {
        formData.append(`paslon_id[${index}]`, paslon.id + '');
        formData.append(
          `suara_sah_paslon[${index}]`,
          values[`suara_sah_paslon[${index}]`]
        );
      }
    );
    formData.append('propinsi_id', values.propinsi_id);
    formData.append('kabupaten_id', values.kabupaten_id);
    formData.append('kecamatan_id', values.kecamatan_id);
    formData.append('kelurahan_id', values.kelurahan_id);
    formData.append('tps', values.tps);
    // formData.append('saksi', userData?.data?.name);
    formData.append('suara_sah', values.suara_sah);
    formData.append('suara_tidak_sah', values.suara_tidak_sah);
    values.keterangan && formData.append('keterangan', values.keterangan);
    values.foto_form && formData.append('foto_form', values.foto_form);
    values.suara_sah_partai &&
      formData.append('suara_sah_partai', values.suara_sah_partai);
    values.suara_tidak_sah_partai &&
      formData.append('suara_tidak_sah_partai', values.suara_tidak_sah_partai);
    values.partai_id && formData.append('partai_id', values.partai_id);
    formData.append('isLegislatif', isLegislatif ? 1 : 0);

    setLoading(true);
    await axios
      .post(`/api/real-count/list-responden?id=${id}`, formData)
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
      .delete(`/api/real-count/list-responden?id=${id}`)
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

  const handleOpenModalToUpdate = (record: any) => {
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
    if (!isLegislatif) {
      paslonData?.data?.data.forEach((item: PaslonInterface, index: number) => {
        const totalKandidat = record.suara_paslon.filter(
          (kandidat: any) => kandidat.paslon_id == item.id
        )[0]?.suara_sah_paslon;
        const property1 = `paslon_id[${index}]`;
        const property2 = `suara_sah_paslon[${index}]`;

        tempObj[property1] = item.id;
        tempObj[property2] = totalKandidat;
      });
    } else {
      calonAnggota?.data?.data.forEach(
        (item: CalonAnggotaInterface, index: number) => {
          const totalKandidat = record.suara_calon_anggota.filter(
            (kandidat: any) => kandidat.paslon_id == item.id
          )[0]?.suara_sah_paslon;
          const property1 = `paslon_id[${index}]`;
          const property2 = `suara_sah_paslon[${index}]`;

          tempObj[property1] = item.id;
          tempObj[property2] = totalKandidat;
        }
      );
      setPartai(() => record?.partai.id);
      tempObj['partai_id'] = record?.partai.id;
      tempObj['suara_tidak_sah_partai'] = record?.suara_tidak_sah_partai;
      tempObj['suara_sah_partai'] = record?.suara_sah_partai;
    }

    formAdd.setFieldsValue({
      ...tempObj,
      propinsi_id: record.propinsi_id,
      kabupaten_id: record.kabupaten_id,
      kecamatan_id: record.kecamatan_id,
      kelurahan_id: record.kelurahan_id,
      tps: record.tps,
      suara_sah: record.suara_sah,
      suara_tidak_sah: record.suara_tidak_sah,
      keterangan: record.keterangan,
      foto_form: record.foto_form
    });
  };

  const handleOpenModalToDetail = (record: any) => {
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
    if (!isLegislatif) {
      paslonData?.data?.data.forEach((item: PaslonInterface, index: number) => {
        const totalKandidat = record.suara_paslon.filter(
          (kandidat: any) => kandidat.paslon_id == item.id
        )[0]?.suara_sah_paslon;
        const property1 = `paslon_id[${index}]`;
        const property2 = `suara_sah_paslon[${index}]`;

        tempObj[property1] = item.id;
        tempObj[property2] = totalKandidat;
      });
    } else {
      calonAnggota?.data?.data.forEach(
        (item: CalonAnggotaInterface, index: number) => {
          const totalKandidat = record.suara_calon_anggota.filter(
            (kandidat: any) => kandidat.paslon_id == item.id
          )[0]?.suara_sah_paslon;
          const property1 = `paslon_id[${index}]`;
          const property2 = `suara_sah_paslon[${index}]`;

          tempObj[property1] = item.id;
          tempObj[property2] = totalKandidat;
        }
      );
      setPartai(() => record?.partai.id);
      tempObj['partai_id'] = record?.partai.id;
      tempObj['suara_tidak_sah_partai'] = record?.suara_tidak_sah_partai;
      tempObj['suara_sah_partai'] = record?.suara_sah_partai;
    }

    formAdd.setFieldsValue({
      ...tempObj,
      propinsi_id: record.propinsi_id,
      kabupaten_id: record.kabupaten_id,
      kecamatan_id: record.kecamatan_id,
      kelurahan_id: record.kelurahan_id,
      tps: record.tps,
      suara_sah: record.suara_sah,
      suara_tidak_sah: record.suara_tidak_sah,
      keterangan: record.keterangan,
      foto_form: record.foto_form
    });
  };

  const columnsData = paslonData?.data?.data || partaiData?.data?.data;

  const tableData = isLegislatif
    ? respondenData?.data?.data?.filter(
        (item: any) => item?.suara_calon_anggota.length !== 0
      )
    : respondenData?.data?.data.filter(
        (item: any) => item?.suara_paslon.length !== 0
      );

  const columns =
    respondenData?.data && columnsData
      ? [
          {
            title: 'TPS',
            dataIndex: 'tps',
            width: 150
          },
          ...columnsData.map((item: any, index: number) => ({
            title: `${
              isLegislatif ? item?.nama_partai : `Paslon ${item.nomor_urut}`
            }`,
            width: 130,
            render: (text: string, record: any) => {
              const totalKandidat = isLegislatif
                ? record.partai.id === item.id && record.suara_sah_partai
                : record.suara_paslon.filter(
                    (kandidat: any) => kandidat.paslon_id == item.id
                  )[0]?.suara_sah_paslon;
              return <span>{totalKandidat || 0}</span>;
            }
          })),
          {
            title: 'Suara Sah',
            dataIndex: isLegislatif ? 'suara_sah_partai' : 'suara_sah',
            width: 130
          },
          {
            title: 'Tidak Sah',
            dataIndex: isLegislatif
              ? 'suara_tidak_sah_partai'
              : 'suara_tidak_sah',
            width: 130
          },
          {
            title: 'Aksi',
            width: 300,
            fixed: 'right',
            render: (text: any, record: any) => (
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
            )
          }
        ]
      : [];

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

  return (
    <>
      <Head>
        <title>Input Data | Real Count</title>
      </Head>
      <HeaderPage
        title="List Data Real Count"
        action={
          <>
            <Button type="primary" onClick={() => setOpenModalCreate(true)}>
              Tambah Real Count
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
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={tableData}
                columns={columns}
                scroll={{ x: 500 }}
                pagination={{
                  total: respondenData?.data?.total,
                  current: currentPage,
                  onChange: onChangePagination
                }}
              />
            </Col>
          </>
        )}
      </Row>
      <ModalAddSampleRealCount
        visible={openModalCreate}
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
        paslonData={paslonData?.data?.data}
        isLegislatif={isLegislatif}
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

InpuDataPage.layout = Admin;

export default InpuDataPage;
