import { Row, Col, Button, Table, Typography, Alert } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  ProvinsiInterface,
  KotaInterface,
  KecamatanInterface,
  KelurahanInterface,
  WilayahInterface
} from '../../../../@types/DaerahIndonesia';
import {
  PemesananLogistikInterface,
  StokLogistikInterface
} from '../../../../@types/Logistik';
import {
  Gap,
  HeaderPage,
  ModalJurnalStok,
  ModalStok,
  Spinner
} from '../../../../components';
import { Admin } from '../../../../layouts';
import { useCurrentTeam, useProfile, useStokLogistik } from '../../../../swr';
import {
  checkIsPremium,
  currencyFormat,
  fetchWrapper,
  responseMessage
} from '../../../../utils';

const { Title } = Typography;

const StokLogistik = () => {
  const [form] = useForm();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openJurnalModal, setOpenJurnalModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const { data: stokData, isLoading } = useStokLogistik(refresh);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);

  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [tempWilayah, setTempWilayah] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });

  const [modalState, setModalState] = useState<{
    withWilayah: boolean;
    jenisWilayah: any;
  }>({
    withWilayah: true,
    jenisWilayah: null
  });

  const { data: userData, role: userRole } = useProfile(true);

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
  const getJenisWilayah = (wilayah: any[]) => {
    const tempJenisWilayah = wilayah.filter((item: any) => item).length - 1;

    return tempJenisWilayah === -1 ? null : tempJenisWilayah.toString();
  };

  const hideModal = () => {
    setOpenModal(false);
    setRefresh(false);
    form.resetFields();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onFinish = (values: any) => {
    setLoading(true);
    fetchWrapper
      .post('/api/logistik/stok', values)
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
          onHide: () => {}
        });
      })
      .finally(() => hideLoading());
  };

  const onUpdate = (values: any) => {
    setLoading(true);
    fetchWrapper
      .put(`/api/logistik/stok?id=${id}`, values)
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
          onHide: () => {}
        });
      })
      .finally(() => hideLoading());
  };

  const handleOpenModalToUpdate = (record: StokLogistikInterface) => {
    const tempJenisWilayah = getJenisWilayah([
      record.propinsi_id,
      record.kabupaten_id,
      record.kecamatan_id,
      record.kelurahan_id,
      record.dapil,
      record.rt
    ]);

    setId(record.id);
    setOpenModal(true);
    setIsEdit(true);

    setTempWilayah({
      provinsi: record.propinsi_id,
      kota: record.kabupaten_id,
      kecamatan: record.kecamatan_id,
      kelurahan: record.kelurahan_id
    });

    setModalState({
      ...modalState,
      withWilayah: !!record.propinsi_id,
      jenisWilayah: tempJenisWilayah
    });
    form.setFieldsValue({
      ...record,
      harga_satuan: parseInt(record.harga_satuan).toFixed()
    });
  };

  const handleOpenModalToCreate = () => {
    setOpenModal(true);
    setIsEdit(false);
  };

  const columns: any = [
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      width: 200,
      sorter: (a: StokLogistikInterface, b: StokLogistikInterface) =>
        a.nama_barang.length - b.nama_barang.length,
      key: 'nama_barang'
    },
    {
      title: 'Satuan',
      dataIndex: 'nama_satuan',
      width: 150,
      sorter: (a: StokLogistikInterface, b: StokLogistikInterface) =>
        a.nama_satuan.length - b.nama_satuan.length,
      key: 'satuan'
    },
    {
      title: 'Harga',
      dataIndex: 'harga_satuan',
      width: 150,
      render: (text: number) => <p>{currencyFormat(text)}</p>,
      key: 'harga'
    },
    {
      title: 'Total Masuk',
      dataIndex: 'total_masuk',
      width: 150,
      key: 'total masuk',
      render: (text: string, record: StokLogistikInterface) => {
        if (text && +text !== 0) {
          return (
            <p className="text-info">{`${text || 0} ${record.nama_satuan}`}</p>
          );
        }

        return <p className="text-info">-</p>;
      }
    },
    {
      title: 'Total Keluar',
      dataIndex: 'total_keluar',
      width: 150,
      key: 'total keluar',
      render: (text: string, record: StokLogistikInterface) => {
        if (text && +text !== 0) {
          return (
            <p className="text-danger">{`${text || 0} ${
              record.nama_satuan
            }`}</p>
          );
        }

        return <p className="text-danger">-</p>;
      }
    },
    {
      title: 'Dalam Proses Pemesanan',
      dataIndex: '',
      width: 250,
      render: (text: number, record: StokLogistikInterface) => {
        if (text !== 0) {
          return (
            <p className="text-warning">{`${
              record.pemesanan_barangs.length > 0
                ? record.pemesanan_barangs[0]?.sisa_pesanan
                : 0
            } ${record.nama_satuan}`}</p>
          );
        }

        return <p className="text-warning">-</p>;
      },
      key: 'proses_pemesanan'
    },
    {
      title: 'Persediaan/Stok',
      dataIndex: 'stok_akhir',
      width: 200,
      render: (text: number, record: StokLogistikInterface) =>
        text !== 0 ? <p>{`${text} ${record.nama_satuan}`}</p> : <p>-</p>,
      key: 'persediaan'
    },
    {
      title: 'Aksi',
      width: 250,
      fixed: 'right',
      render: (text: string, record: StokLogistikInterface) => {
        return (
          <div>
            <Button
              onClick={() => {
                setId(record.id);
                setOpenJurnalModal(true);
              }}
            >
              Jurnal Stok
            </Button>

            <Gap width={16} height={2} />
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record)}
              disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
            >
              Edit
            </Button>
          </div>
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
        <title>Stok Barang | Logistik</title>
      </Head>
      <HeaderPage
        title="Daftar Stok Barang"
        action={
          <Button type="primary" onClick={() => handleOpenModalToCreate()}>
            Tambah Barang
          </Button>
        }
      />
      <Row className="mt-7">
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={stokData?.data}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey="id"
            />
          </Col>
        )}
      </Row>

      <ModalStok
        isEdit={isEdit}
        visible={openModal}
        loading={loading}
        onCancel={() => setOpenModal(false)}
        onCreate={onFinish}
        onUpdate={onUpdate}
        form={form}
        modalState={modalState}
        wilayah={tempWilayah}
        provinsiData={provinsiData}
        setWilayah={handleChangeTempWilayah}
        kotaData={kotaData}
        kecamatanData={kecamatanData}
        kelurahanData={kelurahanData}
        setDynamicModalState={setDynamicModalState}
      />

      <ModalJurnalStok
        visible={openJurnalModal}
        onCancel={() => {
          setOpenJurnalModal(false);
          setId(0);
        }}
        id={id}
      />
    </>
  );
};

StokLogistik.layout = Admin;

export default StokLogistik;
