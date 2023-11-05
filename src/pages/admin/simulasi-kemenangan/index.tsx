import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Alert, Button, Col, Form, Row, Select, Table } from 'antd';

import { BreadcrumbWilayah, HeaderPage, Spinner } from '../../../components';
import { Admin } from '../../../layouts';
import {
  DataSimulasi,
  FormParameterSimulasi
} from '../../../components/organisms';
import { useBreadcrumbWilayah } from '../../../customHooks';
import { useProfile, useSimulasiKemenangan } from '../../../swr';

const SimulasiKemenanganPage = () => {
  const [parameterSimulasi, setParameterSimulasi] = useState({
    estimasiPemilih: 0,
    targetMenang: 0
  });
  const [dataSimulasi, setDataSimulasi] = useState({
    totalJumlahDPT: 0,
    jumlahPaslon: 0,
    totalPemilih: 0,
    targetSuara: 0,
    targetKemenangan: 0
  });

  const { bcWilayah, setBcWilayah, resetBcWilayah } = useBreadcrumbWilayah();

  const { data: kemenanganData, isLoading } = useSimulasiKemenangan(
    true,
    bcWilayah.propinsi_id.id,
    bcWilayah.kabupaten_id.id,
    bcWilayah.kecamatan_id.id
  );
  const { data: userData, role: userRole } = useProfile(true);

  const calculateSimulasiData = (
    parameter: 'estimasiPemilih' | 'targetMenang',
    value: any
  ) => {
    let tempTargetKemenangan: number = 0;
    let tempTotalPemilih: number = 0;

    const { totalJumlahDPT, jumlahPaslon, totalPemilih } = dataSimulasi;
    const { targetMenang, estimasiPemilih } = parameterSimulasi;

    if (parameter === 'estimasiPemilih') {
      tempTotalPemilih = (value * totalJumlahDPT) / 100;
      tempTargetKemenangan = value / jumlahPaslon + targetMenang;
      setDataSimulasi({
        ...dataSimulasi,
        totalPemilih: tempTotalPemilih,
        targetKemenangan: tempTargetKemenangan,
        targetSuara: (tempTotalPemilih * tempTargetKemenangan) / 100
      });
    }

    if (parameter === 'targetMenang') {
      tempTargetKemenangan = estimasiPemilih / jumlahPaslon + value;
      setDataSimulasi({
        ...dataSimulasi,
        targetKemenangan: tempTargetKemenangan,
        targetSuara: (totalPemilih * tempTargetKemenangan) / 100
      });
    }
  };

  const handleChangeParameter = (
    name: 'estimasiPemilih' | 'targetMenang',
    value: string
  ) => {
    if (+value <= 100) {
      if (value[0] === '0' && value.length > 1) {
        value = value.substring(value.lastIndexOf('0') + 1);
      }
      const tempValue = +value;

      calculateSimulasiData(name, tempValue);

      return setParameterSimulasi({
        ...parameterSimulasi,
        [name]: tempValue
      });
    }
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
          !bcWilayah.propinsi_id.id &&
          !bcWilayah.kabupaten_id.id &&
          !bcWilayah.kecamatan_id.id
        ) {
          return <p>Provinsi</p>;
        }
        if (!bcWilayah.kabupaten_id.id && !bcWilayah.kecamatan_id.id) {
          return <p>Kota/Kabupaten</p>;
        }
        if (!bcWilayah.kecamatan_id.id) {
          return <p>Kecamatan</p>;
        }

        return 'Kelurahan/Desa';
      },
      dataIndex: 'name',
      render: (text: string, record: any) => {
        // dibenahi
        if (
          !bcWilayah.propinsi_id.id &&
          !bcWilayah.kabupaten_id.id &&
          !bcWilayah.kecamatan_id.id
        ) {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() =>
                setBcWilayah({
                  ...bcWilayah,
                  propinsi_id: record?.propinsi
                })
              }
            >
              {record?.propinsi?.name}
            </button>
          );
        }
        if (!bcWilayah.kabupaten_id.id && !bcWilayah.kecamatan_id.id) {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() =>
                setBcWilayah({
                  ...bcWilayah,
                  kabupaten_id: record?.kabupaten
                })
              }
            >
              {record?.kabupaten?.name}
            </button>
          );
        }
        if (!bcWilayah.kecamatan_id.id) {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() =>
                setBcWilayah({
                  ...bcWilayah,
                  kecamatan_id: record?.kecamatan
                })
              }
            >
              {record?.kecamatan?.name}
            </button>
          );
        }

        return <p>{record?.kelurahan?.name}</p>;
      },
      key: 'title'
    },
    {
      title: 'Jumlah DPT',
      dataIndex: 'jumlah_dpt'
    },
    {
      title: `Estimasi Pemilih (${parameterSimulasi.estimasiPemilih}%)`,
      dataIndex: 'jumlah_dpt',
      render: (text: string) => (
        <span>{(+text * parameterSimulasi.estimasiPemilih) / 100}</span>
      )
    },
    {
      title: 'Target Suara',
      dataIndex: 'jumlah_dpt',
      render: (text: string) => (
        <span>{(+text * dataSimulasi.targetKemenangan) / 100}</span>
      )
    },
    {
      title: 'Jumlah Pendukung',
      dataIndex: 'jumlah_pendukung'
    },
    {
      title: 'Presentase',
      dataIndex: 'jumlah_dpt',
      render: (text: string, record: any) => {
        if (
          parameterSimulasi.estimasiPemilih === 0 &&
          parameterSimulasi.targetMenang === 0
        ) {
          return <span>%</span>;
        }

        let targetSuara = (+text * dataSimulasi.targetKemenangan) / 100;
        let presentase = Number(
          (+record.jumlah_pendukung / targetSuara) * 100
        ).toFixed(2);
        return <span>{presentase}%</span>;
      }
    }
  ];

  useEffect(() => {
    setDataSimulasi({
      ...dataSimulasi,
      totalJumlahDPT: kemenanganData?.total_jumlah_dpt?.total_jumlah_dpt,
      jumlahPaslon: kemenanganData?.total_paslon
    });
  }, [kemenanganData]);

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
        <title>Simulasi Target Suara Kemenangan</title>
      </Head>
      <HeaderPage title="Simulasi Target Suara Kemenangan" />
      <Row className="mt-7" gutter={[24, 24]}>
        <Col xs={24}>
          <Row gutter={[12, 12]}>
            <Col xs={24} md={12} lg={10}>
              <FormParameterSimulasi
                estimasiPemilih={parameterSimulasi.estimasiPemilih}
                targetMenang={parameterSimulasi.targetMenang}
                onChangeParameter={handleChangeParameter}
              />
            </Col>
            <Col xs={24} md={12} lg={14}>
              <DataSimulasi
                totalJumlahDPT={dataSimulasi.totalJumlahDPT}
                jumlahPaslon={dataSimulasi.jumlahPaslon}
                totalPemilih={dataSimulasi.totalPemilih}
                targetSuara={dataSimulasi.targetSuara}
                targetKemenangan={dataSimulasi.targetKemenangan}
                estimasiPemilih={parameterSimulasi.estimasiPemilih}
                targetMenang={parameterSimulasi.targetMenang}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} className="mt-6">
          <BreadcrumbWilayah
            wilayah={bcWilayah}
            resetWilayah={resetBcWilayah}
          />
        </Col>

        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table dataSource={kemenanganData?.data} columns={columns} />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

SimulasiKemenanganPage.layout = Admin;

export default SimulasiKemenanganPage;
