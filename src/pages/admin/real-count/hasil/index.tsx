import { Alert, Button, Col, Row, Table, Typography, message } from 'antd';
import {
  BreadcrumbWilayah,
  ExportToExcel,
  HeaderPage,
  Pie,
  Spinner,
  StatisticBadge
} from '../../../../components';
import React, { useState } from 'react';
import {
  RenderIf,
  dateFormat,
  generateDataToExportRealCount,
  generateDataToExportRealCountPartai
} from '../../../../utils';
import {
  useCurrentTeam,
  usePartai,
  usePasanganCalon,
  useProfile
} from '../../../../swr';
import { useRealCount, useRealCountPartai } from '../../../../swr/real-count';

import { Admin } from '../../../../layouts';
import Head from 'next/head';
import { PaslonInterface } from '../../../../@types/DataMaster';
import { useBreadcrumbWilayah } from '../../../../customHooks';

const { Title } = Typography;

const HasilRealCountPage = () => {
  const [refresh, setRefresh] = useState(true);
  const { bcWilayah, setBcWilayah, resetBcWilayah } = useBreadcrumbWilayah();

  const { data: currentTeam } = useCurrentTeam(true);

  const isLegislatif = currentTeam?.data?.jenis_pencalonan === 1;

  const {
    data: realCountData,
    isLoading,
    meta: metaPaslon
  } = useRealCount(
    !isLegislatif,
    bcWilayah.propinsi_id.id,
    bcWilayah.kabupaten_id.id,
    bcWilayah.kecamatan_id.id,
    bcWilayah.kelurahan_id.id,
    0
  );

  const {
    data: realCountDataPartai,
    isLoading: isLoadingPartai,
    meta: metaPartai
  } = useRealCountPartai(
    isLegislatif,
    bcWilayah.propinsi_id.id,
    bcWilayah.kabupaten_id.id,
    bcWilayah.kecamatan_id.id,
    bcWilayah.kelurahan_id.id,
    1
  );

  const objectToArray = (obj: any): any[] => (obj ? Object.values(obj) : []);
  const sumTotalPaslon = (obj: any): any => {
    const paslons = obj ? Object.values(obj) : [];
    return paslons.reduce(
      (acc: any, curr: any) =>
        isLegislatif
          ? acc + curr.total_per_partai
          : acc + curr.total_per_paslon,
      0
    );
  };

  const { data: paslonData } = usePasanganCalon(!isLegislatif);
  const { data: partaiData } = usePartai(isLegislatif, '1');
  const { data: userData, role: userRole } = useProfile(true);

  const columnsData = paslonData?.data?.data || partaiData?.data?.data;

  const meta = metaPaslon || metaPartai;

  const columns =
    (!isLegislatif ? realCountData?.data : realCountDataPartai?.data) &&
    columnsData
      ? [
          {
            title: () => {
              if (
                !bcWilayah.propinsi_id.id &&
                !bcWilayah.kabupaten_id.id &&
                !bcWilayah.kecamatan_id.id &&
                !bcWilayah.kelurahan_id.id
              ) {
                return <p>Provinsi</p>;
              }
              if (
                !bcWilayah.kabupaten_id.id &&
                !bcWilayah.kecamatan_id.id &&
                !bcWilayah.kelurahan_id.id
              ) {
                return <p>Kota/Kabupaten</p>;
              }
              if (!bcWilayah.kecamatan_id.id && !bcWilayah.kelurahan_id.id) {
                return <p>Kecamatan</p>;
              }
              if (!bcWilayah.kelurahan_id.id) {
                return <p>Kelurahan</p>;
              }

              return 'TPS';
            },
            dataIndex: 'name',
            render: (text: string, record: any) => {
              if (
                !bcWilayah.propinsi_id.id &&
                !bcWilayah.kabupaten_id.id &&
                !bcWilayah.kecamatan_id.id &&
                !bcWilayah.kelurahan_id.id
              ) {
                return (
                  <button
                    className="font-semibold text-primary"
                    onClick={() =>
                      setBcWilayah({
                        ...bcWilayah,
                        propinsi_id: {
                          id: objectToArray(record)[0]?.propinsi,
                          name: objectToArray(record)[0]?.propinsi_name
                        }
                      })
                    }
                  >
                    {objectToArray(record)[0]?.propinsi_name}
                  </button>
                );
              }
              if (
                !bcWilayah.kabupaten_id.id &&
                !bcWilayah.kecamatan_id.id &&
                !bcWilayah.kelurahan_id.id
              ) {
                return (
                  <button
                    className="font-semibold text-primary"
                    onClick={() =>
                      setBcWilayah({
                        ...bcWilayah,
                        kabupaten_id: {
                          id: objectToArray(record)[0]?.kabupaten,
                          id_provinsi: '',
                          name: objectToArray(record)[0]?.kabupaten_name
                        }
                      })
                    }
                  >
                    {objectToArray(record)[0]?.kabupaten_name}
                  </button>
                );
              }
              if (!bcWilayah.kecamatan_id.id && !bcWilayah.kelurahan_id.id) {
                return (
                  <button
                    className="font-semibold text-primary"
                    onClick={() =>
                      setBcWilayah({
                        ...bcWilayah,
                        kecamatan_id: {
                          id: objectToArray(record)[0]?.kecamatan,
                          id_kota: '',
                          name: objectToArray(record)[0]?.kecamatan_name
                        }
                      })
                    }
                  >
                    {objectToArray(record)[0]?.kecamatan_name}
                  </button>
                );
              }

              if (!bcWilayah.kelurahan_id.id) {
                return (
                  <button
                    className="font-semibold text-primary"
                    onClick={() =>
                      setBcWilayah({
                        ...bcWilayah,
                        kelurahan_id: {
                          id: objectToArray(record)[0]?.kelurahan,
                          id_kecamatan: '',
                          name: objectToArray(record)[0]?.kelurahan_name
                        }
                      })
                    }
                  >
                    {objectToArray(record)[0]?.kelurahan_name}
                  </button>
                );
              }

              return <p>{objectToArray(record)[0]?.nomor_tps[0]}</p>;
            },
            key: 'title'
          },
          ...columnsData.map((item: any, index: number) => ({
            title: `${
              isLegislatif ? item?.nama_partai : `Paslon ${item.nomor_urut}`
            }`,
            width: 130,
            render: (text: string, record: any) => {
              const totalKandidat = isLegislatif
                ? objectToArray(record).filter(
                    (kandidat: any) => kandidat.partai_id == item.id
                  )[0]?.total_per_partai
                : objectToArray(record).filter(
                    (kandidat: any) => kandidat.paslon_id == item.id
                  )[0]?.total_per_paslon;
              return <span>{totalKandidat || 0}</span>;
            }
          })),
          {
            title: 'Total',
            width: 200,
            dataIndex: 'total',
            render: (text: string, record: any) => (
              <span>{sumTotalPaslon(record)}</span>
            )
          }
        ]
      : [];

  const mapCountPaslon = () =>
    paslonData?.data?.data.map((item: PaslonInterface) => {
      if (realCountData) {
        const tempPaslon = realCountData?.data?.map((record: any) => {
          const totalKandidat = objectToArray(record).filter(
            (kandidat: any) => kandidat.paslon_id == item.id
          )[0]?.total_per_paslon;

          return {
            id: item.id,
            total: totalKandidat || 0
          };
        });

        return {
          id_paslon: item.id,
          paslon: item.nama_wakil_paslon
            ? `${item.nama_paslon} & ${item.nama_wakil_paslon}`
            : item.nama_paslon,
          total: tempPaslon?.reduce(
            (acc: any, curr: any) => acc + curr.total,
            0
          )
        };
      }
    });

  function generateDataPieChart(wilayah: string = 'Indonesia') {
    if (realCountData) {
      const countPaslon = mapCountPaslon();
      const total = countPaslon?.reduce(
        (acc: any, curr: any) => acc + curr.total,
        0
      );

      return {
        wilayah,
        data: countPaslon?.map((item: any) => ({
          ...item,
          percent: Math.ceil((item.total / total) * 100)
        })),
        total
      };
    }

    return null;
  }

  const pieChartData = generateDataPieChart();

  const tableLoading = !isLegislatif ? isLoading : isLoadingPartai;
  const tableData = !isLegislatif
    ? realCountData?.data
    : realCountDataPartai?.data;
  const exportData = isLegislatif
    ? generateDataToExportRealCountPartai(tableData, partaiData)
    : generateDataToExportRealCount(tableData, paslonData);

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
        <title>Hasil | Real Count</title>
      </Head>
      <HeaderPage
        title="Hasil Real Count"
        action={
          !tableLoading && (
            <ExportToExcel
              element={
                <Button type="primary">Download Hasil Real Count</Button>
              }
              fileName={`Hasil Real Count - ${dateFormat(
                new Date().toLocaleDateString(),
                'lll'
              )}`}
              apiData={exportData}
              onError={() =>
                message.error('Tidak dapat mengunduh data kosong', 2)
              }
            />
          )
        }
      />
      <Row className="mt-7" gutter={[24, 24]}>
        <Col xs={24} className="mt-6">
          <BreadcrumbWilayah
            wilayah={bcWilayah}
            resetWilayah={resetBcWilayah}
          />
        </Col>

        {tableLoading ? (
          <div className="flex items-center justify-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={tableData}
                columns={columns}
                scroll={{ x: 500 }}
              />
            </Col>
            <RenderIf isTrue={pieChartData?.data}>
              <Col xs={24}>
                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <Title level={2} className="text-2xl">
                      Grafik Real Count
                    </Title>
                  </Col>
                  <Col xs={24} lg={16}>
                    <div className="bg-white">
                      <Pie
                        data={pieChartData?.data?.map((item: any) => ({
                          paslon: item.paslon,
                          total: item.percent
                        }))}
                      />
                    </div>
                  </Col>
                  <Col xs={24} lg={8}>
                    <StatisticBadge
                      variant="primary"
                      title="Presentase"
                      value={`${meta?.presentase}%`}
                    />
                    <StatisticBadge
                      variant="secondary"
                      title="Jumlah TPS"
                      value={meta?.jml_tps}
                    />
                    <StatisticBadge
                      variant="secondary"
                      title="TPS Masuk"
                      value={meta?.tps_masuk}
                    />
                  </Col>
                </Row>
              </Col>
            </RenderIf>
          </>
        )}
      </Row>
    </>
  );
};

HasilRealCountPage.layout = Admin;

export default HasilRealCountPage;
