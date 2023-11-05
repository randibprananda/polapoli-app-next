import { Col, message, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IlGeo, IlLogoNew } from '../../../../assets';
import {
  FormSoalSurvei,
  HeaderSoal,
  ModalConfirmation,
  Spinner
} from '../../../../components';
import { STATUS_GEOLOCATION } from '../../../../constant';
import { Survei } from '../../../../layouts';
import { useDetailSurvei, useProfile, useQuestion } from '../../../../swr';
import {
  cleanObject,
  fetchWrapper,
  getGeoLocation,
  getWindowLastPath,
  responseMessage
} from '../../../../utils';

const SoalSurveiPage = () => {
  const [form] = useForm();
  const router = useRouter();

  const [id, setId] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [textModal, setTextModal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { data: questionSurvei, isLoading } = useQuestion(true, id);
  const { data: detailSurvei } = useDetailSurvei(true, id);
  const { data: profileData } = useProfile(true);

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    beforeUpload: file => {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isPNG) {
        message.error('Format tidak didukung! Masukan file .png atau .jpg', 3);
      }
      return isPNG;
    },
    maxCount: 1
  };

  const getKey = (field: string) => field.substring(field.lastIndexOf('_') + 1);

  const generateFormData = (form: any[]) => {
    let name: string = '';
    let alamat: string = '';
    const formIsu = new FormData();
    Object.entries(form)
      .filter(item => item[0]?.includes(';isu'))
      ?.forEach(item => {
        const key = item[0]?.slice(
          item[0]?.indexOf('_') + 1,
          item[0].indexOf(';')
        );

        if (key === 'jenis_isu_id') {
          item[1].includes('Lapangan')
            ? formIsu.append(key, '1')
            : formIsu.append(key, '2');
          return;
        }
        formIsu.append(key, item[1]);
      });

    const formPendukung = new FormData();
    Object.entries(form)
      .filter(item => item[0]?.includes(';dpt') || !item[0].includes('field'))
      ?.forEach(item => {
        if (item[0].includes('field')) {
          const key = item[0]?.slice(
            item[0]?.indexOf('_') + 1,
            item[0].indexOf(';')
          );

          formPendukung.append(key, item[1]);
          return;
        }

        formPendukung.append(item[0], item[1]);
        return;
      });

    const wilayah = [
      'propinsi_id',
      'kabupaten_id',
      'kecamatan_id',
      'kelurahan_id'
    ];
    const formData = new FormData();
    Object.entries(form)
      .filter(
        item =>
          !item[0]?.includes(';isu') &&
          !item[0]?.includes(';dpt') &&
          wilayah.indexOf(item[0]) === -1
      )
      .forEach((item, index) => {
        const key = getKey(item[0]);
        if (key === 'name') {
          name = item[1];
        } else if (key === 'alamat') {
          alamat = item[1];
        } else {
          formData.append(`field_form_id[${index - 2}]`, key);
          formData.append(`jawaban[${index - 2}]`, item[1]);
        }
      });

    return {
      name,
      alamat,
      formData,
      formIsu,
      formPendukung
    };
  };

  const handleAnswerQuestions = (
    { name, longLat, data, alamat }: any,
    formIsu?: any,
    formPendukung?: any
  ) => {
    setLoading(true);
    const answer = fetchWrapper.post_multipart(
      `/api/survei/answer?id=${id}&longitude_latitude=${longLat}&nama_responden=${name}&alamat=${alamat}`,
      data
    );

    let issues = null;
    if (formIsu?.has('jenis_isu_id')) {
      formIsu.append('nama_pelapor', name);
      formIsu.append('tanggal_isu', moment().format(''));
      issues = fetchWrapper.post_multipart('/api/isu', formIsu);
    }

    let pendukung = null;
    if (formPendukung?.has('nik')) {
      formPendukung.append('alamat', alamat);
      formPendukung.append('is_pendukung', '1');
      pendukung = fetchWrapper.post_multipart(
        '/api/data-pemilih',
        formPendukung
      );
    }

    Promise.all([answer, issues, pendukung])
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Jawaban anda berhasil disimpan',
          onHide: () => {}
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: err?.data?.message || 'Gagal menyimpan jawaban',
          onHide: () => {}
        });
      })
      .finally(() => setLoading(false));
  };

  const onReset = () => form.resetFields();
  const onSubmit = (values: any) => {
    const endDateSurveyString = detailSurvei?.data?.penutupan_survey;

    // Konversi endDateSurveyString ke objek moment
    const endDateSurvey = moment(endDateSurveyString, 'DD-MM-YYYY');

    // Dapatkan tanggal hari ini dengan moment
    const currentDate = moment();

    // Lakukan validasi
    if (currentDate.isAfter(endDateSurvey)) {
      responseMessage({
        type: 'error',
        message: 'Pengisian data sudah melebihi dari tanggal survey',
        onHide: () => {}
      });
      return router.back();
    }

    getGeoLocation()
      .then((res: any) => {
        const { latitude, longitude } = res;
        const tempValues = cleanObject(values);
        const { name, alamat, formData, formIsu, formPendukung } =
          generateFormData(tempValues);

        handleAnswerQuestions(
          {
            name,
            longLat: `${latitude}, ${longitude}`,
            data: formData,
            alamat: alamat
          },
          formIsu,
          formPendukung
        );
        router.back();
      })
      .catch(err => {
        if (err.status === STATUS_GEOLOCATION.Block) {
          setOpenModal(true);
          setTextModal(
            'Anda belum memberi akses untuk Lokasi anda, silahkan aktifkan akses lokasi browser anda.'
          );
          return;
        } else if (err.status === STATUS_GEOLOCATION.BrowserNotSupport) {
          setOpenModal(true);
          setTextModal(
            'Ops.. Kelihatannya browser anda tidak mendukung untuk mengakses lokasi anda. Coba ganti dengan browser yang lain..'
          );
          return;
        } else {
          setOpenModal(true);
          setTextModal(
            'Gagal menambahkan data survey karena sudah melebihi target survey yang sudah ditentukan'
          );
        }
      });
  };

  useEffect(() => {
    setId(getWindowLastPath());
  }, []);

  return (
    <>
      <Head>
        <title>Soal Survei</title>
      </Head>
      <section className="max-w-1200 lg:mx-auto md:mt-6 w-full px-4 pb-6 mt-4">
        <Row gutter={[24, 24]}>
          {isLoading ? (
            <div className="h-96 flex items-center justify-center w-full">
              <Spinner />
            </div>
          ) : (
            <>
              <Col xs={24}>
                <HeaderSoal
                  wilayah={detailSurvei?.data}
                  date={`${detailSurvei?.data?.pembukaan_survey.replaceAll(
                    '-',
                    '/'
                  )} - ${detailSurvei?.data?.penutupan_survey.replaceAll(
                    '-',
                    '/'
                  )}`}
                  title={detailSurvei?.data.judul_survey}
                />
              </Col>
              <Col xs={24}>
                <FormSoalSurvei
                  dataSurvey={detailSurvei?.data}
                  form={form}
                  draggerProps={draggerProps}
                  questions={questionSurvei?.data}
                  onReset={onReset}
                  onSubmit={onSubmit}
                  loading={loading}
                />
              </Col>
              <Col xs={24}>
                <div className="py-6 text-center">
                  <Image
                    src={IlLogoNew}
                    alt="PolaPoli"
                    width={199}
                    height={45}
                  />
                </div>
              </Col>
            </>
          )}
        </Row>
      </section>

      <ModalConfirmation
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        text={textModal}
        textOk="Tutup"
        withBtnCancel={false}
        image={IlGeo}
      />
    </>
  );
};

SoalSurveiPage.layout = Survei;

export default SoalSurveiPage;
