import { Alert, Button, Col, Row, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { FormSoalSurvei, HeaderPage, Spinner } from '../../../../../components';
import { ADD_ON } from '../../../../../constant/contract';
import { Admin } from '../../../../../layouts';
import {
  useCurrentTeam,
  useDetailAnswer,
  useProfile
} from '../../../../../swr';
import {
  RenderIf,
  distinctAddOns,
  fetchWrapper,
  getWindowLastPath,
  responseMessage
} from '../../../../../utils';

const Detail = () => {
  const router = useRouter();

  const [id, setId] = useState<any>(null);
  const [formId, setFormId] = useState<any>(null);
  const [form] = useForm();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [longlat, setLonglat] = useState('');

  const { data: answerData, isLoading } = useDetailAnswer(refresh, id);
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

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    beforeUpload: file => {
      const isSupportedFormat =
        file.type === 'image/png' || file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 <= 2; // Mengecek apakah ukuran file kurang dari atau sama dengan 2MB

      if (!isSupportedFormat) {
        message.error('Format tidak didukung! Masukan file .png atau .jpg', 3);
        return false; // Tolak unggahan jika format tidak didukung
      }

      if (!isLt2M) {
        message.error('Gambar harus kurang dari 2MB!', 3);
        return false; // Tolak unggahan jika ukuran melebihi 2MB
      }

      return true; // Terima unggahan jika format dan ukuran sesuai
    },
    maxCount: 1
  };

  const onReset = () => {};
  const onSubmit = (values: any) => {};

  const getKey = (field: string) => field.substring(field.lastIndexOf('_') + 1);

  const generateFormData = (form: any[]) => {
    let name: string = '';
    let alamat: string = '';
    const formData = new FormData();
    Object.entries(form).forEach((item, index) => {
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
      formData,
      alamat
    };
  };

  const onUpdate = () => {
    const { name, alamat, formData } = generateFormData(form.getFieldsValue());

    setLoading(true);
    fetchWrapper
      .post_multipart(
        `/api/survei/update-answer?id=${formId}&longitude_latitude=${longlat}&nama_responden=${name}&alamat=${alamat}&lo_la_id=${id}`,
        formData
      )
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Jawaban anda berhasil diubah',
          onHide: () => {}
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal mengubah jawaban',
          onHide: () => {}
        });
      })
      .finally(() => setLoading(false));
  };

  const setAnswerForm = useCallback(() => {
    const initForm: any = {};
    answerData?.data?.lola_form_answers.forEach((item: any) => {
      initForm[`field_${item.field_form.id}`] = item.jawaban;
    });
    initForm['field_name'] = answerData?.data?.nama_responden;
    initForm['field_alamat'] = answerData?.data?.alamat;
    setLonglat(answerData?.data?.longitude_latitude);
    setFormId(answerData?.data?.form_survey_id);

    form.setFieldsValue({ ...initForm });
  }, [answerData, form]);

  useEffect(() => {
    setId(getWindowLastPath());

    setAnswerForm();
  }, [setAnswerForm]);

  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search);

    setIsEdit(urlSearch.get('edit') === 'true');

    return () => setIsEdit(false);
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
        <title>Survei</title>
      </Head>
      <HeaderPage title="Data Survei" withArrowBack />
      <Row className="mt-7">
        {isLoading ? (
          <div className="h-96 flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <FormSoalSurvei
              form={form}
              draggerProps={draggerProps}
              questions={answerData?.data?.lola_form_answers}
              onReset={onReset}
              onSubmit={onSubmit}
              loading={loading}
              isDetail={!isEdit}
              showImage={!isEdit}
            />
            <RenderIf isTrue={isEdit}>
              <Col xs={24}>
                <div className="mt-9 flex items-center justify-between">
                  <Button size="large" type="primary" onClick={onUpdate}>
                    Simpan
                  </Button>
                  <Button
                    size="large"
                    type="default"
                    ghost
                    onClick={() => router.back()}
                  >
                    Batal
                  </Button>
                </div>
              </Col>
            </RenderIf>
          </>
        )}
      </Row>
    </>
  );
};

Detail.layout = Admin;

export default Detail;
