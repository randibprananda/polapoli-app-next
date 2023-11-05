import { Alert, Button, Col, Row, Table, Typography, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import axios, { AxiosError } from 'axios';
import FileSaver from 'file-saver';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../../@types/DaerahIndonesia';
import {
  BreadcrumbWilayah,
  Gap,
  HeaderPage,
  ModalAddDPT,
  ModalConfirmation,
  ModalImportDPT,
  Spinner
} from '../../../../components';
import { getDapil, setDapil } from '../../../../components/moleculs/FormDapil';
import { PERMISSION } from '../../../../constant/contract';
import { Admin } from '../../../../layouts';
import { useCurrentTeam, useJumlahDPT, useProfile } from '../../../../swr';
import {
  RenderIf,
  checkPermissionArray,
  fetchWrapper,
  handleErrorByCode,
  responseMessage
} from '../../../../utils';

const { Title } = Typography;

const DPTPage = () => {
  const [formImport] = useForm();
  const [formAdd] = useForm();

  const router = useRouter();

  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tempWilayah, setTempWilayah] = useState<{
    propinsi_id: ProvinsiInterface;
    kabupaten_id: KotaInterface;
    kecamatan_id: KecamatanInterface;
  }>({
    propinsi_id: {
      id: '',
      name: ''
    },
    kabupaten_id: {
      id: '',
      id_provinsi: '',
      name: ''
    },
    kecamatan_id: {
      id: '',
      id_kota: '',
      name: ''
    }
  });
  const { data: jumlahDPTData, isLoading } = useJumlahDPT(
    refresh,
    tempWilayah.propinsi_id.id,
    tempWilayah.kabupaten_id.id,
    tempWilayah.kecamatan_id.id
  );
  const [id, setId] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
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

  // swr
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);
  const { data: userData, role: userRole } = useProfile(true);

  const onReset = () => {
    setWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    formImport.resetFields();
    formAdd.resetFields();
    setId(null);
  };

  const hideModal = () => {
    setOpenModalCreate(false);
    setOpenModalImport(false);
    setOpenModalDelete(false);
    onReset();
    setRefresh(false);
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const handleAddDPT = (values: any) => {
    values.dapil = setDapil(values);
    fetchWrapper
      .post('/api/data-master/dpt', values)
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

  const handleDonwloadTemplateDPT = () => {
    const formData = formImport.getFieldsValue();
    delete formData.template_file_jumlah_dpt;

    axios
      .post(`/api/data-master/dpt/template-download`, formData, {
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
    values.dapil = setDapil(values);
    const formData = new FormData();
    formData.append('propinsi_id', values.propinsi_id);
    formData.append('kabupaten_id', values.kabupaten_id);
    formData.append('kecamatan_id', values.kecamatan_id);
    formData.append('dapil', values.dapil);
    formData.append(
      'template_file_jumlah_dpt',
      values.template_file_jumlah_dpt
    );

    setLoading(true);
    axios
      .post('/api/data-master/dpt/import-file', formData)
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
          message: err.response.data.data.message,
          onHide: hideModal
        });
      })
      .finally(() => {
        hideLoading();
        // setRefresh(true);

        // setTimeout(() => {
        //   router.reload();
        // }, 2000);
      });
  };

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/data-master/dpt?id=${id}`)
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

  const handleOpenModalToUpdate = (record: any) => {
    setId(record.id);
    setOpenModalCreate(true);
    setIsEdit(true);

    setWilayah({
      provinsi: record.propinsi_id,
      kota: record.kabupaten_id,
      kecamatan: record.kecamatan_id,
      kelurahan: record.kelurahan_id
    });

    formAdd.setFieldsValue({
      ...record,
      ...getDapil(record.dapil)
    });
  };

  const handleUpdate = (values: any) => {
    values.dapil = setDapil(values);

    setLoading(true);
    fetchWrapper
      .put(`/api/data-master/dpt?id=${id}`, values)
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

  const handleChangeWilayah = (name: string, value: any) => {
    setWilayah({
      ...wilayah,
      [name]: value
    });
  };

  const resetTempWilayah = (category: any) => {
    if (category === 'all') {
      return setTempWilayah({
        propinsi_id: {
          id: '',
          name: ''
        },
        kabupaten_id: {
          id: '',
          id_provinsi: '',
          name: ''
        },
        kecamatan_id: {
          id: '',
          id_kota: '',
          name: ''
        }
      });
    }

    if (category === 'provinsi') {
      return setTempWilayah({
        ...tempWilayah,
        kabupaten_id: {
          id: '',
          id_provinsi: '',
          name: ''
        },
        kecamatan_id: {
          id: '',
          id_kota: '',
          name: ''
        }
      });
    }

    if (category === 'kabupaten') {
      return setTempWilayah({
        ...tempWilayah,
        kecamatan_id: {
          id: '',
          id_kota: '',
          name: ''
        }
      });
    }
  };

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'text',
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

  const columns: any = [
    {
      title: 'No',
      key: 'no',
      dataIndex: 'no',
      width: 60,
      render: (_: any, record: any, index: number) => <span>{index + 1}</span>
    },
    {
      title: () => {
        if (
          !tempWilayah.propinsi_id.id &&
          !tempWilayah.kabupaten_id.id &&
          !tempWilayah.kecamatan_id.id
        ) {
          return <p>Provinsi</p>;
        }
        if (!tempWilayah.kabupaten_id.id && !tempWilayah.kecamatan_id.id) {
          return <p>Kota/Kabupaten</p>;
        }
        if (!tempWilayah.kecamatan_id.id) {
          return <p>Kecamatan</p>;
        }

        return 'Kelurahan';
      },
      dataIndex: 'name',
      render: (text: string, record: any) => {
        if (
          !tempWilayah.propinsi_id.id &&
          !tempWilayah.kabupaten_id.id &&
          !tempWilayah.kecamatan_id.id
        ) {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() =>
                setTempWilayah({
                  ...tempWilayah,
                  propinsi_id: record?.propinsi
                })
              }
            >
              {record?.propinsi?.name}
            </button>
          );
        }
        if (!tempWilayah.kabupaten_id.id && !tempWilayah.kecamatan_id.id) {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() =>
                setTempWilayah({
                  ...tempWilayah,
                  kabupaten_id: record?.kabupaten
                })
              }
            >
              {record?.kabupaten?.name}
            </button>
          );
        }
        if (!tempWilayah.kecamatan_id.id) {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() =>
                setTempWilayah({
                  ...tempWilayah,
                  kecamatan_id: record?.kecamatan
                })
              }
            >
              {record?.kecamatan?.name}
            </button>
          );
        }

        return <p>{record?.kelurahan?.name}</p>;
      }
    },
    {
      title: 'Laki-laki',
      dataIndex: 'l'
    },
    {
      title: 'Perempuan',
      dataIndex: 'p'
    },
    {
      title: 'Total',
      dataIndex: 'total'
    },
    tempWilayah.propinsi_id.id &&
    tempWilayah.kabupaten_id.id &&
    tempWilayah.kecamatan_id.id
      ? {
          title: 'Aksi',
          width: 200,
          render: (text: string, record: any) => {
            return (
              <div>
                <Button
                  className="border-success hover:border-success text-success hover:text-success"
                  onClick={() => {
                    const newRecord = {
                      propinsi_id: tempWilayah.propinsi_id.id,
                      kabupaten_id: tempWilayah.kabupaten_id.id,
                      kecamatan_id: tempWilayah.kecamatan_id.id,
                      kelurahan_id: record.kelurahan.id,
                      lakilaki: record.l,
                      perempuan: record.p,
                      id: record.id,
                      dapil: record.dapil
                    };

                    handleOpenModalToUpdate(newRecord);
                  }}
                >
                  Edit
                </Button>
                <Gap width={16} height={2} />
                <Button danger onClick={() => confirmDelete(record.id)}>
                  Hapus
                </Button>
              </div>
            );
          }
        }
      : {}
  ];

  const confirmDelete = (id: number) => {
    setOpenModalDelete(true);
    setId(id);
  };

  const handleOpenModalToCreate = () => {
    setOpenModalCreate(true);
    setIsEdit(false);
  };

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
        <title>Jumlah DPT | Master Data</title>
      </Head>
      <HeaderPage
        title="Data Jumlah Daftar Pemilih Tetap"
        action={
          <>
            <RenderIf
              isTrue={checkPermissionArray({
                roles: listPermission,
                idRole: PERMISSION.import_data_jumlah_dpt
              })}
            >
              <Button onClick={() => setOpenModalImport(true)}>
                Import Data Jumlah DPT
              </Button>
              <Gap width={16} height={10} />
            </RenderIf>
            <Button type="primary" onClick={handleOpenModalToCreate}>
              Tambah DPT
            </Button>
          </>
        }
      />
      <Col xs={24} className="mt-6">
        <BreadcrumbWilayah
          wilayah={tempWilayah}
          resetWilayah={resetTempWilayah}
        />
      </Col>
      <Row className="mt-7">
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={jumlahDPTData?.data}
              columns={columns}
              scroll={{ x: 800 }}
            />
          </Col>
        )}
      </Row>

      {/* Modal Tambah Data */}
      <ModalAddDPT
        visible={openModalCreate}
        onCancel={() => {
          setOpenModalCreate(false);
          onReset();
        }}
        provinsiData={provinsiData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        kotaData={kotaData}
        form={formAdd}
        wilayah={wilayah}
        setWilayah={handleChangeWilayah}
        onFinish={isEdit ? handleUpdate : handleAddDPT}
        loading={loading}
        isEdit={isEdit}
      />
      {/* Modal Tambah Data */}

      {/* Modal Import DPT */}
      <ModalImportDPT
        visible={openModalImport}
        onCancel={() => {
          setOpenModalImport(false);
          onReset();
        }}
        provinsiData={provinsiData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        kotaData={kotaData}
        wilayah={wilayah}
        setWilayah={handleChangeWilayah}
        form={formImport}
        onDownloadTemplate={handleDonwloadTemplateDPT}
        onUploadTemplate={handleImportDPT}
        draggerProps={draggerProps}
        description="Pilih wilayah terlebih dahulu untuk mendownload template atau mengimport data"
      />
      {/* Modal Import DPT */}

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

DPTPage.layout = Admin;

export default DPTPage;
