import { Alert, Button, Col, Form, Row, Select, Table, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import axios, { AxiosError } from 'axios';
import FileSaver from 'file-saver';
import moment from 'moment';
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
import { DPTInterface } from '../../../@types/Pendukung';
import {
  ExportToExcel,
  FormWilayah,
  HeaderPage,
  ModalAddDataDPT,
  ModalConfirmation,
  Search,
  Spinner
} from '../../../components';
import {
  getDapil,
  setDapil as setDapilValue
} from '../../../components/moleculs/FormDapil';
import { ModalImportDataDPT } from '../../../components/organisms';
import { usePagination, useSearch } from '../../../customHooks';
import { Admin } from '../../../layouts';
import {
  useCurrentTeam,
  useDPTdata,
  useDPTdataByDapil,
  useDapilAvailableDPT,
  useProfile
} from '../../../swr';
import {
  cleanObject,
  fetchWrapper,
  generateDataToExportDataDPT,
  generateFormDataObj,
  handleErrorByCode,
  responseMessage
} from '../../../utils';

const { Option } = Select;

const DataDPTPage = () => {
  const [formAdd] = useForm();
  const [formImport] = useForm();
  const [formDapil] = useForm();

  const router = useRouter();

  const [id, setId] = useState<null | number>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isPemilih, setIsPemilih] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [dapil, setDapil] = useState<number | undefined>(undefined);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
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
  const [wilayahForTable, setWilayahForTable] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });
  const [search, handleSearch] = useSearch('');
  const [currentPage, onChangePagination] = usePagination(1);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);

  // service
  const { data: dptData, isLoading } = useDPTdata(
    refresh,
    wilayahForTable?.kelurahan,
    currentPage,
    search
  );
  const { data: userData } = useProfile(isPemilih);
  const { data: dapilAvailable } = useDapilAvailableDPT(true);
  const { data: dptDataByDapil } = useDPTdataByDapil(true, dapil);
  const { data: profileData } = useProfile(true);

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

  const draggerPropsExcel: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    beforeUpload: file => {
      const isXls =
        file.type === 'application/vnd.ms-excel' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXls) {
        message.error('Format tidak didukung! Masukan file .xls', 3);
      }
      return isXls;
    },
    maxCount: 1
  };

  const onReset = () => {
    setWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    formImport.resetFields();
    formAdd.resetFields();
    setIsDetail(false);
    setIsEdit(false);
    setId(null);
  };

  const hideModal = () => {
    setOpenModalCreate(false);
    setOpenModalImport(false);
    setOpenModalDelete(false);
    setRefresh(false);
    onReset();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const handleDonwloadTemplateDPT = () => {
    const formData = {
      ...formImport.getFieldsValue(),
      kelurahan_id: formImport.getFieldsValue().kelurahan_id + ''
    };
    delete formData.file_dpt;

    axios
      .post(`/api/data-dpt/template-download`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      })
      .then((response: any) => {
        const dirtyFileName = response.headers['content-disposition'];
        const regex =
          /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;
        var fileName = dirtyFileName.match(regex)[3];

        var blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        FileSaver.saveAs(blob, fileName);
      })
      .catch((err: AxiosError) => {
        handleErrorByCode(err.response?.status);
      });
  };

  const handleImportDPT = (values: any) => {
    values.dapil = setDapilValue(values);
    const formData = new FormData();
    formData.append('propinsi_id', values.propinsi_id);
    formData.append('kabupaten_id', values.kabupaten_id);
    formData.append('kecamatan_id', values.kecamatan_id);
    formData.append('kelurahan_id', values.kelurahan_id + '');
    formData.append('file_dpt', values.file_dpt);
    formData.append('dapil', values.dapil);
    setLoading(true);
    axios
      .post('/api/data-dpt/import-file', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Data berhasil diimport',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: err.response.data.data.errors,
          onHide: hideModal
        });
      })
      .finally(() => {
        hideLoading();
      });
  };

  const handleChangeWilayah = (name: string, value: any) => {
    setWilayah({
      ...wilayah,
      [name]: value
    });
  };

  const handleChangeWilayahForTable = (name: string, value: any) => {
    if (dapil) {
      setDapil(() => undefined);
    }
    setWilayahForTable({
      ...wilayahForTable,
      [name]: value
    });
  };

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleOpenModalToImport = () => {
    setOpenModalImport(true);
  };

  const handleOpenModalToUpdate = (record: DPTInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);
    setWilayah({
      provinsi: +record.propinsi_id,
      kecamatan: +record.kabupaten_id,
      kota: +record.kecamatan_id,
      kelurahan: +record.kelurahan_id
    });
    let dapil = {};
    if (record.dapil) {
      dapil = getDapil(record.dapil);
    }
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
      ...dapil
    });
  };

  const handleOpenModalDetail = (record: DPTInterface) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsDetail(true);
    setIsPemilih(+record.is_pendukung === 1);
    setWilayah({
      provinsi: +record.propinsi_id,
      kecamatan: +record.kabupaten_id,
      kota: +record.kecamatan_id,
      kelurahan: +record.kelurahan_id
    });

    let dapil = {};
    if (record.dapil) {
      dapil = getDapil(record.dapil);
    }
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
      ...dapil
    });
  };

  const handleCloseModal = () => {
    setOpenModalImport(false);
    setOpenModalCreate(false);
    onReset();
  };

  const handleTogglePemilih = () => setIsPemilih(!isPemilih);

  const onCreate = (values: any) => {
    const formData = {
      ...values,
      is_pendukung: 0,
      tanggal_lahir: values.tanggal_lahir.format('DD-MM-YYYY'),
      kelurahan_id: values.kelurahan_id + '',
      dapil: setDapilValue(values)
    };

    setLoading(true);
    fetchWrapper
      .post('/api/data-dpt', formData)
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
          message: err.message,
          onHide: hideModal
        });
      })
      .finally(() => {
        hideLoading();
        setRefresh(true);

        setTimeout(() => {
          router.reload();
        }, 2000);
      });
  };

  const onUpdate = (values: any) => {
    const formData = {
      ...values,
      is_pendukung: 0,
      tanggal_lahir: values.tanggal_lahir.format('DD-MM-YYYY'),
      kelurahan_id: values.kelurahan_id + '',
      dapil: setDapilValue(values)
    };

    setLoading(true);
    fetchWrapper
      .post(`/api/data-dpt?id=${id}`, formData)
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

  const onCreatePemilih = (values: any) => {
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
          message: err.message,
          onHide: hideModal
        });
      })
      .finally(() => {
        hideLoading();
        setRefresh(true);

        setTimeout(() => {
          router.reload();
        }, 2000);
      });
  };

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/data-dpt?id=${id}`)
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

  const handleSelectDapil = (d: number) => {
    if (wilayahForTable?.provinsi) {
      setWilayahForTable({
        provinsi: null,
        kecamatan: null,
        kota: null,
        kelurahan: null
      });
    }
    setDapil(d);
  };

  const confirmDelete = (id: number) => {
    setOpenModalDelete(true);
    setId(id);
  };

  const columnDapil = [
    {
      title: 'Provinsi',
      dataIndex: 'propinsi',
      key: 'propinsi',
      width: 150,
      render: (item: ProvinsiInterface) => <span>{item?.name}</span>
    },
    {
      title: 'Kabupaten',
      dataIndex: 'kabupaten',
      key: 'kabupaten',
      width: 150,
      render: (item: KotaInterface) => <span>{item?.name}</span>
    },
    {
      title: 'Kecamatan',
      dataIndex: 'kecamatan',
      key: 'kecamatan',
      width: 150,
      render: (item: KecamatanInterface) => <span>{item?.name}</span>
    },
    {
      title: 'Kelurahan',
      dataIndex: 'kelurahan',
      key: 'kelurahan',
      width: 150,
      render: (item: KelurahanInterface) => <span>{item?.name}</span>
    }
  ];

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
      title: 'Jenis Kelamin',
      dataIndex: 'jenis_kelamin',
      key: 'jk',
      width: 140
    },
    {
      title: 'Alamat',
      dataIndex: 'alamat',
      key: 'alamat',
      width: 140
    },
    ...(dapil ? columnDapil : [{}]),
    {
      title: 'RT',
      dataIndex: 'rt',
      key: 'rt',
      width: 140
    },
    {
      title: 'RW',
      dataIndex: 'rw',
      key: 'rw',
      width: 140
    },
    {
      title: 'TPS',
      dataIndex: 'tps',
      key: 'tps',
      width: 140
    },
    {
      title: 'Aksi',
      width: 300,
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
        if (wilayah.provinsi || wilayahForTable.provinsi) {
          const resKota = await fetchWrapper.get(
            `/api/daerah-indonesia/kota?id_provinsi=${
              wilayah.provinsi || wilayahForTable.provinsi
            }`
          );

          setKotaData(resKota);
        }

        if (wilayah.kota || wilayahForTable.kota) {
          const resKecamatan = await fetchWrapper.get(
            `/api/daerah-indonesia/kecamatan?id_kota=${
              wilayah.kota || wilayahForTable.kota
            }`
          );
          setKecamatanData(resKecamatan);
        }

        if (wilayah.kecamatan || wilayahForTable.kecamatan) {
          const resKelurahan = await fetchWrapper.get(
            `/api/daerah-indonesia/kelurahan?id_kecamatan=${
              wilayah.kecamatan || wilayahForTable.kecamatan
            }`
          );
          setKelurahanData(resKelurahan);
        }
      } catch (error: any) {
        console.log(error.response);
      }
    }

    getValues();
  }, [wilayah, wilayahForTable]);

  useEffect(() => {
    formAdd.setFieldsValue({
      ...formAdd.getFieldsValue(),
      referal_relawan: userData?.data?.name
    });
  }, [isPemilih]);

  const filteredDapil = dapilAvailable
    ?.filter((item: any) => item?.dapil)
    ?.map((item: any) => item?.dapil)
    ?.sort((a: number, b: number) => a - b);

  const fileName = dapil
    ? `Data Pemilih Tetap - Dapil ${dapil}`
    : `Data Pemilih Tetap - ${dptData?.data?.data[0]?.kelurahan.name}, ${dptData?.data?.data[0]?.kecamatan.name}, ${dptData?.data?.data[0]?.kabupaten.name}, ${dptData?.data?.data[0]?.propinsi.name}`;

  if (!profileData?.currentTeam) {
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
        <title>Data Pemilih Tetap</title>
      </Head>
      <HeaderPage
        title="Data Pemilih Tetap"
        action={
          <Row gutter={[16, 8]}>
            <Col>
              <ExportToExcel
                element={
                  <Button className="ant-btn-success" onClick={() => {}}>
                    Download Data DPT
                  </Button>
                }
                fileName={fileName}
                apiData={generateDataToExportDataDPT(
                  dapil ? dptDataByDapil?.data?.data : dptData?.data?.data,
                  !!dapil
                )}
                onError={() =>
                  message.error('Tidak dapat mengunduh data kosong', 2)
                }
              />
            </Col>

            <Col>
              <Button onClick={handleOpenModalToImport}>Import Data DPT</Button>
            </Col>
            <Col>
              <Button type="primary" onClick={handleOpenModalCreate}>
                Tambah Data DPT
              </Button>
            </Col>
          </Row>
        }
      />
      <Row className="mt-7" gutter={[6, 24]}>
        <Col xs={24} md={12}>
          <Form layout="vertical" initialValues={{ remember: true }}>
            <FormWilayah
              wilayah={wilayahForTable}
              setWilayah={handleChangeWilayahForTable}
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
            <div className=" w-40">
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
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={
                  dptData?.data?.data || dptDataByDapil?.data?.data || []
                }
                columns={columns}
                scroll={{ x: 1000 }}
                pagination={{
                  total: dptData?.data?.total || dptDataByDapil?.data?.total,
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
        onCancel={handleCloseModal}
        onTogglePemilih={handleTogglePemilih}
        isEdit={isEdit}
        isDetail={isDetail}
        loading={loading}
        onCreate={isPemilih ? onCreatePemilih : onCreate}
        onUpdate={onUpdate}
        provinsiData={provinsiData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        kotaData={kotaData}
        form={formAdd}
        wilayah={wilayah}
        setWilayah={handleChangeWilayah}
        draggerPropsKTP={draggerProps}
        draggerPropsFoto={draggerProps}
        isPemilih={isPemilih}
      />

      <ModalImportDataDPT
        visible={openModalImport}
        onCancel={handleCloseModal}
        provinsiData={provinsiData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        kotaData={kotaData}
        wilayah={wilayah}
        setWilayah={handleChangeWilayah}
        form={formImport}
        onDownloadTemplate={handleDonwloadTemplateDPT}
        onUploadTemplate={handleImportDPT}
        description="Pilih wilayah terlebih dahulu untuk mendownload template atau mengimport data"
        draggerProps={draggerPropsExcel}
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

DataDPTPage.layout = Admin;

export default DataDPTPage;
