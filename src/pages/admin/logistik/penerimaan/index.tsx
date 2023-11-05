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
  PenerimaanLogistikInterface,
  StokLogistikInterface
} from '../../../../@types/Logistik';
import { IlWarning } from '../../../../assets';
import {
  Gap,
  HeaderPage,
  ModalConfirmation,
  ModalPenerimaanLogistik,
  Spinner
} from '../../../../components';
import { Admin } from '../../../../layouts';
import {
  useCurrentTeam,
  usePemesananLogistik,
  useProfile,
  useStokLogistik
} from '../../../../swr';
import usePenerimaanLogistik from '../../../../swr/logistik/use-penerimaan';
import { dateFormat, fetchWrapper, responseMessage } from '../../../../utils';

const { Title } = Typography;

const PenerimaanLogistik = () => {
  const [form] = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfir, setOpenModalConfir] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const { data: penerimaanData, isLoading } = usePenerimaanLogistik(refresh);
  const { data: pemesananData } = usePemesananLogistik(true);
  const { data: stokData } = useStokLogistik(true);

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
    form.resetFields();
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const onFinish = () => {
    setOpenModalConfir(true);
    setOpenModal(false);
  };

  const handleAddPenerimaan = () => {
    const formData = {
      ...form.getFieldsValue(),
      jumlah_diterima: parseInt(form.getFieldValue('jumlah_diterima'))
    };

    setLoading(true);
    fetchWrapper
      .post('/api/logistik/penerimaan', formData)
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
  };

  const columns = [
    {
      title: 'Tanggal Dibuat',
      dataIndex: 'created_at',
      width: 200,
      sorter: (a: any, b: any) => a.created_at.length - b.created_at.length,
      render: (text: string) => <p>{dateFormat(text)}</p>
    },
    {
      title: 'Nama Barang',
      dataIndex: 'stok_barang',
      sorter: (
        a: PenerimaanLogistikInterface,
        b: PenerimaanLogistikInterface
      ) => a.stok_barang.nama_barang.length - b.stok_barang.nama_barang.length,
      render: (text: StokLogistikInterface) => <p>{text.nama_barang}</p>
    },
    {
      title: 'Satuan',
      dataIndex: 'stok_barang',
      width: 150,
      sorter: (
        a: PenerimaanLogistikInterface,
        b: PenerimaanLogistikInterface
      ) => a.stok_barang.nama_satuan.length - b.stok_barang.nama_satuan.length,
      key: '',
      render: (text: StokLogistikInterface) => <p>{text.nama_satuan}</p>
    },
    {
      title: 'Harga Satuan',
      dataIndex: 'stok_barang',
      width: 150,
      sorter: (
        a: PenerimaanLogistikInterface,
        b: PenerimaanLogistikInterface
      ) =>
        a.stok_barang.harga_satuan.length - b.stok_barang.harga_satuan.length,
      key: '',
      render: (text: StokLogistikInterface) => <p>{text.harga_satuan}</p>
    },
    {
      title: 'Jumlah Terima',
      dataIndex: 'jumlah_diterima',
      sorter: (
        a: PenerimaanLogistikInterface,
        b: PenerimaanLogistikInterface
      ) => a.jumlah_diterima - b.jumlah_diterima,
      key: '',
      render: (text: string, record: PenerimaanLogistikInterface) => (
        <p>{`${text} ${record.stok_barang.nama_satuan}`}</p>
      )
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan',
      key: ''
    }
  ];

  useEffect(() => {
    if (isSubmit) {
      handleAddPenerimaan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

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
        <title>Penerimaan Barang | Logistik</title>
      </Head>
      <HeaderPage
        title="Daftar Penerimaan Barang"
        action={
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Tambah Penerimaan
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
              dataSource={penerimaanData?.data}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey="id"
            />
          </Col>
        )}
      </Row>

      <ModalPenerimaanLogistik
        visible={openModal}
        loading={loading}
        onCancel={handleCancelModal}
        onCreate={onFinish}
        form={form}
        stokData={stokData ? stokData.data : []}
        pemesananData={pemesananData ? pemesananData.data : []}
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

PenerimaanLogistik.layout = Admin;

export default PenerimaanLogistik;
