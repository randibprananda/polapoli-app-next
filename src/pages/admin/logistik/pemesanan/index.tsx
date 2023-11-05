import { Row, Col, Button, Table, Typography, Alert } from 'antd';
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
  PemesananLogistikInterface,
  StokLogistikInterface
} from '../../../../@types/Logistik';
import {
  Gap,
  HeaderPage,
  ModalPemesananLogistik,
  Spinner
} from '../../../../components';
import { Admin } from '../../../../layouts';
import {
  useCurrentTeam,
  usePemesananLogistik,
  useProfile,
  useStokLogistik
} from '../../../../swr';
import {
  checkIsPremium,
  currencyFormat,
  currencyToInt,
  dateFormat,
  fetchWrapper,
  responseMessage
} from '../../../../utils';

const { Title } = Typography;

const PemesananLogistik = () => {
  const [refresh, setRefresh] = useState(true);
  const router = useRouter();
  const [form] = useForm();
  const { data: pemesananData, isLoading } = usePemesananLogistik(refresh);
  const { data: stokData } = useStokLogistik(true);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
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

  const hideModal = () => {
    setOpenModal(false);
    setRefresh(false);
    setModalState({
      withWilayah: true,
      jenisWilayah: null
    });
    setTempWilayah({
      provinsi: null,
      kecamatan: null,
      kota: null,
      kelurahan: null
    });
    form.resetFields();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const onUpdate = (values: any) => {
    values.estimasi_harga_total = currencyToInt(values.estimasi_harga_total);
    values.jumlah_pesanan = parseInt(values.jumlah_pesanan);

    setLoading(true);
    fetchWrapper
      .put(`/api/logistik/pemesanan?id=${id}`, values)
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

  const onFinish = (values: any) => {
    values.estimasi_harga_total = currencyToInt(values.estimasi_harga_total);
    values.jumlah_pesanan = parseInt(values.jumlah_pesanan);

    setLoading(true);
    fetchWrapper
      .post('/api/logistik/pemesanan', values)
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

  const getJenisWilayah = (wilayah: any[]) => {
    const tempJenisWilayah = wilayah.filter((item: any) => item).length - 1;

    return tempJenisWilayah === -1 ? 0 : tempJenisWilayah.toString();
  };

  const handleOpenModalToUpdate = (record: PemesananLogistikInterface) => {
    setId(record.id);
    setOpenModal(true);
    setIsEdit(true);

    const tempJenisWilayah: any =
      getJenisWilayah([
        record?.propinsi?.id,
        record?.kabupaten?.id,
        record?.kecamatan?.id,
        record?.kelurahan?.id,
        record?.dapil,
        record?.rt
      ]) + '';

    setModalState({
      ...modalState,
      jenisWilayah: tempJenisWilayah
    });

    let wilayahData = {};
    if (record?.propinsi?.id) {
      wilayahData = {
        propinsi_id: record?.propinsi?.id,
        kabupaten_id: record?.kabupaten?.id,
        kecamatan_id: record?.kecamatan?.id,
        kelurahan_id: record?.kelurahan?.id,
        rt: record?.rt,
        rw: record?.rw
      };

      setTempWilayah({
        provinsi: record?.propinsi?.id,
        kota: record?.kabupaten?.id,
        kecamatan: record?.kecamatan?.id,
        kelurahan: record?.kelurahan?.id
      });
    }

    form.setFieldsValue({
      stok_barang_id: record.stok_barang_id,
      jumlah_pesanan: record.jumlah_pesanan,
      estimasi_harga_total: currencyFormat(record.estimasi_harga_total),
      keterangan: record.keterangan,
      dapil: record.dapil,
      ...wilayahData
    });
  };

  const handleOpenModalToCreate = () => {
    setOpenModal(true);
    setIsEdit(false);
  };

  const handleCancelModal = () => {
    setOpenModal(false);
    form.setFieldsValue({
      stok_barang_id: null,
      jumlah_pesanan: '',
      estimasi_harga_total: ''
    });
  };

  const columns = [
    {
      title: 'Kode',
      dataIndex: 'kode_pemesanan',
      width: 100,
      key: '',
      render: (text: string) => (
        <p>{text.slice(text.indexOf('_') + 1, 18) || '-'}</p>
      )
    },
    {
      title: 'Tanggal Dibuat',
      dataIndex: 'created_at',
      width: 200,
      sorter: (a: any, b: any) => a.created_at.length - b.created_at.length,
      key: '',
      render: (text: string) => <p>{dateFormat(text)}</p>
    },
    {
      title: 'Nama Barang',
      dataIndex: 'stok_barang',
      width: 200,
      sorter: (a: PemesananLogistikInterface, b: PemesananLogistikInterface) =>
        a.stok_barang.nama_barang.length - b.stok_barang.nama_barang.length,
      render: (text: StokLogistikInterface) => <p>{text.nama_barang}</p>
    },
    {
      title: 'Satuan',
      dataIndex: 'stok_barang',
      width: 150,
      sorter: (a: PemesananLogistikInterface, b: PemesananLogistikInterface) =>
        a.stok_barang.nama_satuan.length - b.stok_barang.nama_satuan.length,
      render: (text: StokLogistikInterface) => <p>{text.nama_satuan}</p>
    },
    {
      title: 'Harga Satuan',
      dataIndex: 'stok_barang',
      width: 120,
      sorter: (a: PemesananLogistikInterface, b: PemesananLogistikInterface) =>
        a.stok_barang.harga_satuan.length - b.stok_barang.harga_satuan.length,
      render: (text: StokLogistikInterface) => (
        <p>{currencyFormat(parseInt(text.harga_satuan))}</p>
      )
    },
    {
      title: 'Jumlah Pesanan',
      dataIndex: 'jumlah_pesanan',
      width: 120,
      key: ''
    },
    {
      title: 'Sudah Diterima',
      dataIndex: 'jumlah_diterima',
      width: 120,
      render: (text: string, record: PemesananLogistikInterface) => (
        <p>{`${record.jumlah_diterima} ${record.stok_barang.nama_satuan}`}</p>
      )
    },
    {
      title: 'Sisa Pesanan',
      dataIndex: 'sisa_pesanan',
      width: 120,
      render: (text: string, record: PemesananLogistikInterface) => (
        <p className="text-warning">{`${record.sisa_pesanan} ${record.stok_barang.nama_satuan}`}</p>
      )
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan'
    },
    {
      title: 'Aksi',
      width: 100,
      render: (text: string, record: PemesananLogistikInterface) => {
        return (
          <div>
            <Button
              className="border-success hover:border-success text-success hover:text-success"
              onClick={() => handleOpenModalToUpdate(record)}
              disabled={!checkIsPremium(timRelawanData?.data.is_premium)}
            >
              Edit
            </Button>
          </div>
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
        <title>Pemesanan Barang | Logistik</title>
      </Head>
      <HeaderPage
        title="Daftar Pemesanan Barang"
        action={
          <Button type="primary" onClick={() => handleOpenModalToCreate()}>
            Tambah Pemesanan
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
              dataSource={pemesananData?.data}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey="id"
            />
          </Col>
        )}
      </Row>
      <ModalPemesananLogistik
        isEdit={isEdit}
        visible={openModal}
        loading={loading}
        onCancel={handleCancelModal}
        onCreate={onFinish}
        onUpdate={onUpdate}
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
    </>
  );
};

PemesananLogistik.layout = Admin;

export default PemesananLogistik;
