import React, { useState } from 'react';
import Head from 'next/head';

import { Alert, Button, Col, Form, message, Row, Select, Table } from 'antd';

import {
  BreadcrumbWilayah,
  ExportToExcel,
  HeaderPage,
  Spinner
} from '../../../../components';
import { Admin } from '../../../../layouts';
import { useBreadcrumbWilayah } from '../../../../customHooks';
import { useRekapitulasiKoordinator } from '../../../../swr/rekapitulasi';
import { generateDataToExportRekapitulasi } from '../../../../utils';
import { useProfile } from '../../../../swr';

const { Option } = Select;

const KoordinatorPage = () => {
  const { bcWilayah, setBcWilayah, resetBcWilayah } = useBreadcrumbWilayah();
  const [tingkatKoordinator, setTingkatKoordinator] = useState('propinsi');

  const { data: koordinatorData, isLoading } = useRekapitulasiKoordinator(
    true,
    tingkatKoordinator,
    bcWilayah.propinsi_id.id,
    bcWilayah.kabupaten_id.id,
    bcWilayah.kecamatan_id.id,
    bcWilayah.kelurahan_id.id
  );
  const { data: userData, role: userRole } = useProfile(true);

  const columns = [
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

        return 'RT/RW';
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
              onClick={() => {
                setBcWilayah({
                  ...bcWilayah,
                  propinsi_id: record?.propinsi
                });
                setTingkatKoordinator('kabupaten');
              }}
            >
              {record?.propinsi?.name}
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
              onClick={() => {
                setBcWilayah({
                  ...bcWilayah,
                  kabupaten_id: record?.kabupaten
                });
                setTingkatKoordinator('kecamatan');
              }}
            >
              {record?.kabupaten?.name}
            </button>
          );
        }
        if (!bcWilayah.kecamatan_id.id && !bcWilayah.kelurahan_id.id) {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() => {
                setBcWilayah({
                  ...bcWilayah,
                  kecamatan_id: record?.kecamatan
                });
                setTingkatKoordinator('kelurahan');
              }}
            >
              {record?.kecamatan?.name}
            </button>
          );
        }

        if (!bcWilayah.kelurahan_id.id) {
          return (
            <button
              className="text-primary font-semibold"
              onClick={() => {
                setBcWilayah({
                  ...bcWilayah,
                  kelurahan_id: record?.kelurahan
                });
                setTingkatKoordinator('rt/rw');
              }}
            >
              {record?.kelurahan?.name}
            </button>
          );
        }

        return <p>{record?.rt}</p>;
      },
      key: 'title'
    },
    {
      title: 'Laki-laki',
      dataIndex: 'laki_laki',
      render: (text: string) => <span>{text || 0}</span>
    },
    {
      title: 'Perempuan',
      dataIndex: 'perempuan',
      render: (text: string) => <span>{text || 0}</span>
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (text: string) => <span>{text || 0}</span>
    }
  ];

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
        <title>Koordinator | Rekapitulasi</title>
      </Head>
      <HeaderPage
        title="Rekapitulasi Koordinator"
        action={
          <ExportToExcel
            element={<Button type="primary">Download Rekapitulasi</Button>}
            fileName="Rekapitulasi Relawan"
            apiData={generateDataToExportRekapitulasi(
              koordinatorData,
              'koordinator'
            )}
            onError={() =>
              message.error('Tidak dapat mengunduh data kosong', 2)
            }
          />
        }
      />
      <Row className="mt-7">
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
              <Table
                dataSource={koordinatorData?.data}
                columns={columns}
                scroll={{ x: 500 }}
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

KoordinatorPage.layout = Admin;

export default KoordinatorPage;
