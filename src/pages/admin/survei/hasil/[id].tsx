import { Alert, Button, Col, message, Row, Table } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { LolaAnswerInterface } from '../../../../@types/Survei';
import {
  ExportToExcel,
  HeaderPage,
  ModalConfirmation,
  Search,
  Spinner
} from '../../../../components';
import { ADD_ON } from '../../../../constant/contract';
import { usePagination, useSearch } from '../../../../customHooks';
import { Admin } from '../../../../layouts';
import { useCurrentTeam, useHasilSurvei, useProfile } from '../../../../swr';
import {
  dateFormat,
  distinctAddOns,
  fetchWrapper,
  generateDataToExportResultSurvey,
  getWindowLastPath,
  responseMessage
} from '../../../../utils';

const HasilSurveiPage = () => {
  const [id, setId] = useState<any>(null);
  const [currentPage, onChangePagination] = usePagination(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [responseId, setResponseId] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const [search, handleSearch] = useSearch('');
  const { data: hasilSurvei, isLoading } = useHasilSurvei(
    refresh,
    id,
    currentPage,
    search
  );
  const { data: userData, role: userRole } = useProfile(true);
  const { data: timRelawanData, listPermission } = useCurrentTeam(true);

  const filterdAddOn = useMemo(
    () => distinctAddOns(timRelawanData?.data?.order_tim),
    [timRelawanData?.data?.order_tim]
  );

  useEffect(() => {
    if (filterdAddOn?.indexOf(ADD_ON.Survey) === -1) {
      router.back();
    }
  }, [filterdAddOn]);

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const hideModal = () => {
    setOpenModalDelete(false);
    setRefresh(false);
  };

  const handleDelete = (id: number | null) => {
    fetchWrapper
      .delete(`/api/survei/answer?id=${id}`)
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

  const confirmDelete = (id: number) => {
    setOpenModalDelete(true);
    setResponseId(id);
  };

  const columns: any = [
    {
      title: 'Nama Responden',
      dataIndex: 'nama_responden'
    },
    {
      title: 'Waktu',
      dataIndex: 'created_at',
      render: (text: string) => <span>{dateFormat(text)}</span>
    },
    {
      title: 'Aksi',
      fixed: 'right',
      width: 300,
      render: (text: string, record: LolaAnswerInterface) => {
        return (
          <Row gutter={[8, 8]}>
            <Col>
              <Button
                onClick={() =>
                  router.push(`/admin/survei/hasil/detail/${record.id}`)
                }
              >
                Detail
              </Button>
            </Col>
            <Col>
              <Button
                className="ant-btn-success"
                onClick={() =>
                  router.push(
                    `/admin/survei/hasil/detail/${record.id}?edit=true`
                  )
                }
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
      },
      key: 'aksi'
    }
  ];

  useEffect(() => {
    setId(getWindowLastPath());
  }, []);

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
        <title>Hasil Survei | Survei</title>
      </Head>
      <HeaderPage
        title="Hasil Survei"
        withArrowBack
        action={
          <ExportToExcel
            apiData={generateDataToExportResultSurvey(hasilSurvei?.data?.data)}
            element={<Button type="primary">Download Hasil Survey</Button>}
            fileName={hasilSurvei?.data?.data[0]?.form_survey?.judul_survey}
            onError={() => message.error('Gagal mengunduh hasil survei', 2)}
          />
        }
      />
      <Row className="mt-7">
        <Col xs={24}>
          <div className="flex justify-end mb-8">
            <Search value={search} onChange={handleSearch} />
          </div>
        </Col>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Table
                dataSource={hasilSurvei?.data?.data}
                columns={columns}
                scroll={{ x: 800 }}
                pagination={{
                  total: hasilSurvei?.data?.total,
                  current: currentPage,
                  onChange: onChangePagination
                }}
              />
            </Col>
          </>
        )}
      </Row>
      {/* Modal Hapus */}
      <ModalConfirmation
        visible={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
        onOk={() => handleDelete(responseId)}
      />
      {/* Modal Hapus */}
    </>
  );
};

HasilSurveiPage.layout = Admin;

export default HasilSurveiPage;
