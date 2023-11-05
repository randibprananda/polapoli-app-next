import { Alert, Button, Col, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FormPertanyaanSurvei,
  HeaderPage,
  ModalConfirmation,
  Spinner
} from '../../../../components';
import TambahPertanyaan from '../../../../components/organisms/SurveiComponents/TambahPertanyaan';
import { STATUS_SURVEI } from '../../../../constant';
import { ADD_ON } from '../../../../constant/contract';
import { Admin } from '../../../../layouts';
import {
  useCurrentTeam,
  useDetailSurvei,
  useProfile,
  useQuestion
} from '../../../../swr';
import {
  distinctAddOns,
  fetchWrapper,
  RenderIf,
  responseMessage
} from '../../../../utils';

const BuatPertanyaanPage = () => {
  const [form] = useForm();
  const router = useRouter();

  const [listPertanyaan, setListPertanyaan] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(true);
  const [id, setId] = useState<any>(router.query.id);
  const [loading, setLoading] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);

  const { data: detailSurvei } = useDetailSurvei(refresh, id);
  console.log('api', detailSurvei);
  const { data: questionSurvei } = useQuestion(refresh, id);
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

  const handleNewPertanyaan = () =>
    setListPertanyaan([
      ...listPertanyaan,
      {
        id: listPertanyaan.length + 1,
        type: 'TEXT'
      }
    ]);

  const handleUpdateType = (key: number, type: string) => {
    const tempArray = [...listPertanyaan];
    const arrIndex = tempArray.findIndex(item => item.id === key);
    tempArray[arrIndex].type = type;

    setListPertanyaan(tempArray);
  };

  const handleRemovePertanyaan = (index: number) => {
    const arrTemp = listPertanyaan.filter((item: any) => item.id !== index);
    setListPertanyaan(arrTemp);
  };

  const generatePertanyaan = (idSoal: string[], form: any) => {
    const soal: any[] = [];
    idSoal.forEach(id => {
      const obj: any = {
        option: {}
      };
      Object.entries(form.getFieldsValue()).map((field, index) => {
        if (`tipe_${id}` === field[0]) {
          obj['tipe'] = field[1] ? field[1] : 'TEXT';
        }
        if (`label_inputan_${id}` === field[0]) {
          obj[`label_inputan`] = field[1] ? field[1] : '';
        }

        if (`required_${id}` === field[0]) {
          obj.option['required'] = field[1] ? field[1] : false;
        }

        if (`pilihan_${id}` === field[0]) {
          obj.option['pilihan'] = field[1] ? field[1] : [];
        }
      });
      soal.push(obj);
    });
    return soal;
  };

  const generateSetIdSoal = (form: any) => {
    const mapIdSoal = Object.keys(form.getFieldsValue()).map((item: string) =>
      item.substring(item.lastIndexOf('_') + 1)
    );
    const idSoal = Array.from(new Set(mapIdSoal));
    return idSoal;
  };

  const generateSoal = () => {
    const idSoal = generateSetIdSoal(form);
    const soal = generatePertanyaan(idSoal, form);

    return soal;
  };

  const hideLoading = () => {
    setLoading(false);
    setRefresh(true);
  };

  const hideModal = () => {
    setRefresh(false);
    setOpenPublish(false);
  };

  const handlePublishSurvey = () => {
    const soal = generateSoal();
    if (soal.length === 0) {
      return responseMessage({
        type: 'error',
        message: 'Minimal 1 pertanyaan',
        onHide: () => {}
      });
    }

    setLoading(true);
    fetchWrapper
      .post(`/api/survei/question?id=${id}`, soal)
      .then(() => {
        fetchWrapper.post(`/api/survei/publish?id=${id}`, {}).then(() => {
          responseMessage({
            type: 'success',
            message: 'Pertanyaan berhasil dipublish',
            onHide: hideModal
          });

          setTimeout(() => {
            router.back();
          }, 1500);
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal publish pertanyaan',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const handleSaveDraftSurvey = () => {
    const soal = generateSoal();

    setLoading(true);
    fetchWrapper
      .post(`/api/survei/question?id=${id}`, soal)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Pertanyaan berhasil disimpan sebagai draft',
          onHide: hideModal
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal menyimpan sebagai draft',
          onHide: hideModal
        });
      })
      .finally(() => hideLoading());
  };

  const ifContainQuestion = () => {
    const tempList: any[] = [];
    let tempForm = {};
    if (questionSurvei?.data.length !== 0) {
      questionSurvei?.data.forEach((item: any, index: number) => {
        const optionParse = JSON.parse(item.option);
        const tempId = index + 1;

        tempList.push({
          id: tempId,
          type: item.tipe
        });
        tempForm = {
          ...tempForm,
          ...{
            ...{
              [`tipe_${tempId}`]: item.tipe,
              [`label_inputan_${tempId}`]: item.label_inputan,
              [`required_${tempId}`]: optionParse?.required
            },
            ...(optionParse.pilihan
              ? {
                  [`pilihan_${tempId}`]: optionParse?.pilihan
                }
              : {})
          }
        };
      });

      setListPertanyaan([...tempList]);
      form.setFieldsValue({
        ...tempForm
      });
    }
  };
  useEffect(() => {
    ifContainQuestion();
  }, [questionSurvei]);

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
        <title>Buat Pertanyaan | Survei</title>
      </Head>
      <HeaderPage
        title="Pertanyaan"
        subTitle={
          <span
            className={`pl-4 capitalize ${
              detailSurvei?.data.status === 'draft'
                ? 'text-warning'
                : detailSurvei?.data.status === 'publish'
                ? 'text-info'
                : 'text-success'
            } font-medium`}
          >
            ({detailSurvei?.data.status})
          </span>
        }
        withArrowBack
        action={
          <RenderIf isTrue={detailSurvei?.data.status == STATUS_SURVEI.draft}>
            <Row gutter={[16, 16]}>
              <Col>
                <Button
                  disabled={loading}
                  onClick={handleSaveDraftSurvey}
                  type="primary"
                >
                  Simpan
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={loading}
                  onClick={() => setOpenPublish(true)}
                  type="default"
                  className="ant-btn-rose"
                >
                  Publish
                </Button>
              </Col>
            </Row>
          </RenderIf>
        }
      />
      <Row className="mt-7">
        {false ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <div className="max-w-1000 relative w-full">
                <RenderIf
                  isTrue={detailSurvei?.data.status == STATUS_SURVEI.draft}
                >
                  <TambahPertanyaan onCreate={handleNewPertanyaan} />
                </RenderIf>
                <FormPertanyaanSurvei
                  form={form}
                  listPertanyaan={listPertanyaan}
                  onDeleteItem={handleRemovePertanyaan}
                  onUpdateTypeItem={handleUpdateType}
                />
              </div>
            </Col>
          </>
        )}
      </Row>

      {/* Modal Hapus */}
      <ModalConfirmation
        visible={openPublish}
        onCancel={() => setOpenPublish(false)}
        onOk={() => handlePublishSurvey()}
        text="Survei tidak dapat dimodifikasi atau dihapus lagi. Apakah Anda yakin ingin publish survei ini?"
        textOk="Lanjutkan"
        textPublish="Apakah kamu yakin untuk mempublish survei?"
        customStyleCancel={{
          danger: true,
          type: 'default',
          size: 'large'
        }}
        customStyleOk={{
          type: 'primary',
          size: 'large'
        }}
      />
      {/* Modal Hapus */}
    </>
  );
};

BuatPertanyaanPage.layout = Admin;

export default BuatPertanyaanPage;
