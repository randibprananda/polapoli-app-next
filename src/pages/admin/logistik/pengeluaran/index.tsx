import { Row, Col, Button, Table, Alert } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  ProvinsiInterface,
  KotaInterface,
  KecamatanInterface,
  KelurahanInterface
} from '../../../../@types/DaerahIndonesia';
import {
  PengeluaranLogistikInterface,
  StokLogistikInterface
} from '../../../../@types/Logistik';
import { IlWarning } from '../../../../assets';
import {
  Gap,
  HeaderPage,
  ModalConfirmation,
  ModalPengeluaranLogistik,
  Spinner
} from '../../../../components';
import { Admin } from '../../../../layouts';
import { useCurrentTeam, useProfile, useStokLogistik } from '../../../../swr';
import usePengeluaranLogistik from '../../../../swr/logistik/use-pengeluaran';
import { dateFormat, fetchWrapper, responseMessage } from '../../../../utils';

const PengeluaranLogistik = () => {
  const [form] = useForm();
  const router = useRouter();
  const [refresh, setRefresh] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModalConfir, setOpenModalConfir] = useState(false);
  const { data: pengeluaranData, isLoading } = usePengeluaranLogistik(refresh);
  const { data: stokData } = useStokLogistik(true);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);

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
  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [modalState, setModalState] = useState<{
    withWilayah: boolean;
    jenisWilayah: string | null | undefined;
  }>({
    withWilayah: false,
    jenisWilayah: null
  });
  const { data: userData, role: userRole } = useProfile(true);

  const onReset = () => {
    form.resetFields();
    setTempWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    setModalState({
      withWilayah: false,
      jenisWilayah: null
    });
  };

  const setDynamicModalState = (name: string, value: any) => {
    setModalState({
      ...modalState,
      [name]: value
    });
  };

  const hideModal = () => {
    setOpenModal(false);
    setRefresh(false);
    onReset();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const handleCancelModal = () => {
    setOpenModal(false);
    onReset();
  };

  const handleChangeTempWilayah = (name: string, value: any) => {
    setTempWilayah({
      ...tempWilayah,
      [name]: value
    });
  };

  const onFinish = () => {
    setOpenModalConfir(true);
    setOpenModal(false);
  };

  const handleAddPengeluaran = () => {
    const temp = {
      ...form.getFieldsValue(),
      jumlah_pengeluaran: parseInt(form.getFieldValue('jumlah_pengeluaran'))
    };

    const formData = temp?.isu_wilayah
      ? temp
      : {
          jumlah_pengeluaran: temp.jumlah_pengeluaran,
          keterangan: temp.keterangan,
          stok_barang_id: temp.stok_barang_id
        };

    formData?.isu_wilayah && delete formData.isu_wilayah;

    setLoading(true);
    fetchWrapper
      .post('/api/logistik/pengeluaran', formData)
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
      .finally(() => {
        hideLoading();
        setIsSubmit(false);
        setOpenModalConfir(false);
      });

    setIsSubmit(false);
    setOpenModalConfir(false);
  };

  const columns = [
    {
      title: 'Tanggal Dibuat',
      dataIndex: 'created_at',
      width: 200,
      render: (text: string) => <span>{dateFormat(text)}</span>
    },
    {
      title: 'Nama Barang',
      dataIndex: 'stok_barang',
      width: 450,
      sorter: (
        a: PengeluaranLogistikInterface,
        b: PengeluaranLogistikInterface
      ) => a.stok_barang.nama_barang.length - b.stok_barang.nama_barang.length,
      key: 'nama barang',
      render: (stok: StokLogistikInterface) => <span>{stok.nama_barang}</span>
    },
    {
      title: 'Satuan',
      dataIndex: 'stok_barang',
      width: 150,
      sorter: (
        a: PengeluaranLogistikInterface,
        b: PengeluaranLogistikInterface
      ) => a.stok_barang.nama_satuan.length - b.stok_barang.nama_satuan.length,
      key: 'nama satuan',
      render: (stok: StokLogistikInterface) => <span>{stok.nama_satuan}</span>
    },
    {
      title: 'Harga Satuan',
      dataIndex: 'stok_barang',
      width: 150,
      sorter: (
        a: PengeluaranLogistikInterface,
        b: PengeluaranLogistikInterface
      ) =>
        a.stok_barang.harga_satuan.length - b.stok_barang.harga_satuan.length,
      key: 'harga satuan',
      render: (stok: StokLogistikInterface) => <span>{stok.harga_satuan}</span>
    },
    {
      title: 'Jumlah Keluar',
      dataIndex: 'jumlah_pengeluaran',
      sorter: (
        a: PengeluaranLogistikInterface,
        b: PengeluaranLogistikInterface
      ) => a.jumlah_pengeluaran - b.jumlah_pengeluaran,
      key: ''
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan'
    }
  ];

  useEffect(() => {
    fetchWrapper.get('/api/daerah-indonesia/provinsi').then(res => {
      setProvinsiData(res);
    });
  }, []);

  useEffect(() => {
    if (isSubmit) {
      handleAddPengeluaran();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

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
        console.log(error);
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
        <title>Pengeluaran Barang | Logistik</title>
      </Head>
      <HeaderPage
        title="Daftar Pengeluaran Barang"
        action={
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Tambah Pengeluaran
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
              dataSource={pengeluaranData.data}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey="id"
            />
          </Col>
        )}
      </Row>
      <ModalPengeluaranLogistik
        visible={openModal}
        loading={loading}
        onCancel={handleCancelModal}
        onFinish={onFinish}
        form={form}
        stokData={stokData ? stokData.data : []}
        wilayah={tempWilayah}
        setWilayah={handleChangeTempWilayah}
        kecamatanData={kecamatanData}
        provinsiData={provinsiData}
        kotaData={kotaData}
        kelurahanData={kelurahanData}
        modalState={modalState}
        setDynamicModalState={setDynamicModalState}
      />

      <ModalConfirmation
        image={IlWarning}
        text="Data tidak dapat dimodifikasi atau dihapus lagi. Apakah Anda yakin ingin menyimpan data ini?"
        visible={openModalConfir}
        onCancel={() => setOpenModalConfir(false)}
        onOk={() => setIsSubmit(true)}
        customStyleOk={{
          danger: false,
          type: 'primary',
          size: 'large'
        }}
        customStyleCancel={{
          danger: true,
          type: 'default',
          size: 'large'
        }}
        textOk="Lanjutkan"
        textCancel="Batal"
      />
    </>
  );
};

PengeluaranLogistik.layout = Admin;

export default PengeluaranLogistik;
