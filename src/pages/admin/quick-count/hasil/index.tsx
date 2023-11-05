import React, { useState } from 'react';
import Head from 'next/head';

import {
  Alert,
  Button,
  Col,
  Form,
  message,
  Row,
  Select,
  Space,
  Table,
  Typography
} from 'antd';

import {
  BreadcrumbWilayah,
  ExportToExcel,
  HeaderPage,
  Pie,
  Spinner
} from '../../../../components';
import { Admin } from '../../../../layouts';
import {
  useCurrentTeam,
  usePartai,
  usePasanganCalon,
  useProfile,
  useQuickCount,
  useQuickCountPartai
} from '../../../../swr';
import { useBreadcrumbWilayah } from '../../../../customHooks';
import { PaslonInterface } from '../../../../@types/DataMaster';
import {
  dateFormat,
  generateDataToExportQuickCount,
  generateDataToExportQuickCountPartai,
  RenderIf
} from '../../../../utils';

const { Option } = Select;
const { Title } = Typography;

const HasilQuickCountPage = () => {
  const [refresh, setRefresh] = useState(true);
  const { bcWilayah, setBcWilayah, resetBcWilayah } = useBreadcrumbWilayah();

  const { data: currentTeam } = useCurrentTeam(true);

  const isLegislatif = currentTeam?.data?.jenis_pencalonan === 1;

  const { data: quickCountData, isLoading } = useQuickCount(
    !isLegislatif,
    bcWilayah.propinsi_id.id,
    bcWilayah.kabupaten_id.id,
    bcWilayah.kecamatan_id.id,
    bcWilayah.kelurahan_id.id
  );

  const { data: quickCountDataPartai, isLoading: isLoadingPartai } =
    useQuickCountPartai(
      isLegislatif,
      bcWilayah.propinsi_id.id,
      bcWilayah.kabupaten_id.id,
      bcWilayah.kecamatan_id.id,
      bcWilayah.kelurahan_id.id
    );

  const { data: paslonData } = usePasanganCalon(!isLegislatif);
  const { data: partaiData } = usePartai(isLegislatif, '1');
  const { data: userData, role: userRole } = useProfile(true);

  const columnsData = paslonData?.data?.data || partaiData?.data?.data;

  const objectToArray = (obj: any): any[] => (obj ? Object.values(obj) : []);

  const mapCountPaslon = () =>
    columnsData?.map((item: any) => {
      if (quickCountData || quickCountDataPartai) {
        const tempData = quickCountData?.data || quickCountDataPartai?.data;
        const tempPaslon = objectToArray(tempData || {}).map((record: any) => {
          if (record?.paslon) {
            const totalKandidat = record?.paslon.filter(
              (kandidat: any) =>
                (isLegislatif
                  ? kandidat?.kandidat_partai_id
                  : kandidat.kandidat_pilihan_id) == item.id
            )[0];

            const total = isLegislatif
              ? totalKandidat?.total_partai
              : totalKandidat?.total_kandidat;
            return {
              id: item.id,
              total: total || 0
            };
          }

          return {
            id: 0,
            total: 0
          };
        });

        return {
          id_paslon: item.id,
          paslon: isLegislatif
            ? item?.nama_partai
            : item.nama_wakil_paslon
            ? `${item.nama_paslon} & ${item.nama_wakil_paslon}`
            : item.nama_paslon,
          total: tempPaslon?.reduce((acc, curr) => acc + curr?.total || 0, 0)
        };
      }
    });

  function generateDataPieChart(wilayah: string = 'Indonesia') {
    if (quickCountData || quickCountDataPartai) {
      const countPaslon = mapCountPaslon() || [];
      const total = countPaslon?.reduce(
        (acc: any, curr: any) => acc + curr?.total || 0,
        0
      );

      return {
        wilayah,
        data: countPaslon?.map((item: any) => ({
          ...item,
          percent: item?.total ? Math.ceil((item.total / total) * 100) : 0
        })),
        total
      };
    }

    return null;
  }

  const columns =
    (quickCountData?.data || quickCountDataPartai?.data) && columnsData
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
              // dibenahi
              if (
                !bcWilayah.propinsi_id.id &&
                !bcWilayah.kabupaten_id.id &&
                !bcWilayah.kecamatan_id.id &&
                !bcWilayah.kelurahan_id.id
              ) {
                return (
                  <button
                    className="text-primary font-semibold"
                    onClick={() =>
                      setBcWilayah({
                        ...bcWilayah,
                        propinsi_id: record?.paslon[0]?.propinsi
                      })
                    }
                  >
                    {record?.paslon[0]?.propinsi.name}
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
                    className="text-primary font-semibold"
                    onClick={() =>
                      setBcWilayah({
                        ...bcWilayah,
                        kabupaten_id: record?.paslon[0]?.kabupaten
                      })
                    }
                  >
                    {record?.paslon[0]?.kabupaten?.name}
                  </button>
                );
              }
              if (!bcWilayah.kecamatan_id.id && !bcWilayah.kelurahan_id.id) {
                return (
                  <button
                    className="text-primary font-semibold"
                    onClick={() =>
                      setBcWilayah({
                        ...bcWilayah,
                        kecamatan_id: record?.paslon[0]?.kecamatan
                      })
                    }
                  >
                    {record?.paslon[0]?.kecamatan?.name}
                  </button>
                );
              }

              if (!bcWilayah.kelurahan_id.id) {
                return (
                  <button
                    className="text-primary font-semibold"
                    onClick={() =>
                      setBcWilayah({
                        ...bcWilayah,
                        kelurahan_id: record?.paslon[0]?.kelurahan
                      })
                    }
                  >
                    {record?.paslon[0]?.kelurahan?.name}
                  </button>
                );
              }

              return <p>{record?.paslon[0]?.tps}</p>;
            },
            key: 'title'
          },
          ...columnsData?.map((item: any, index: 1) => ({
            title: `${
              isLegislatif ? item?.nama_partai : `Paslon ${item.nomor_urut}`
            }`,
            width: 130,
            render: (text: string, record: any) => {
              if (record?.paslon) {
                const totalKandidat = record?.paslon.filter(
                  (kandidat: any) =>
                    (isLegislatif
                      ? kandidat?.kandidat_partai_id
                      : kandidat.kandidat_pilihan_id) == item.id
                )[0];

                const total = isLegislatif
                  ? totalKandidat?.total_partai
                  : totalKandidat?.total_kandidat;
                return <span>{total || 0}</span>;
              }

              return <span>0</span>;
            }
          })),
          {
            title: 'Total',
            width: 200,
            dataIndex: 'total'
          }
        ]
      : [];

  const pieChartData = generateDataPieChart();

  const tableLoading = !isLegislatif ? isLoading : isLoadingPartai;
  const tableData = quickCountData?.data || quickCountDataPartai?.data;

  const exportData = isLegislatif
    ? generateDataToExportQuickCountPartai(tableData, partaiData)
    : generateDataToExportQuickCount(tableData, paslonData);

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
        <title>Hasil | Quick Count</title>
      </Head>
      <HeaderPage
        title="Hasil Quick Count"
        action={
          !tableLoading && (
            <ExportToExcel
              element={
                <Button type="primary">Download Hasil Quick Count</Button>
              }
              fileName={`Hasil Quick Count - ${dateFormat(
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
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={objectToArray(tableData)}
                columns={columns}
                scroll={{ x: 500 }}
              />
            </Col>
            <RenderIf isTrue={pieChartData?.data}>
              <Col xs={24}>
                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <Title level={2} className="text-2xl">
                      Grafik Quick Count
                    </Title>
                  </Col>
                  <Col xs={24} lg={14}>
                    <div className="bg-white">
                      <Pie
                        data={pieChartData?.data?.map((item: any) => ({
                          paslon: item.paslon,
                          total: item.percent
                        }))}
                      />
                    </div>
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

HasilQuickCountPage.layout = Admin;

export default HasilQuickCountPage;
