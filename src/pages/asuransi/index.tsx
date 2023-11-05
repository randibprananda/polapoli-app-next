import { Button, Checkbox, Col, Form, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import { Asuransi, Watermark } from '../../assets';
import { CardBanner, SoalSurveiItem } from '../../components';
import { OBJ_TIPE_SOAL_JAWABAN } from '../../constant';
import { responseMessage } from '../../utils';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const [form] = useForm();
  const [isDetail, setIsDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [setujui, setSetujui] = useState(false);

  const draggerProps: DraggerProps = {};

  const onSubmit = async (values: any) => {
    const url = process.env.NEXT_PUBLIC_API_BACKEND_HOST + '/api/v1/asuransi';

    const payload = new FormData();
    payload.append('nomor_kartu', values.field_no_kartu);
    payload.append('nik', values.field_nik);
    payload.append('nama', values.field_nama);
    payload.append('tanggal_lahir', values.field_tanggal_lahir);
    payload.append('alamat', values.field_alamat);
    payload.append('no_hp', values.field_no_hp);
    payload.append('nama_ahli_waris', values.field_nama_ahli_waris);
    payload.append('no_hp_ahli_waris', values.field_no_ahli_waris);

    setSetujui(false);

    try {
      await axios.post(url, payload);
      responseMessage({
        type: 'success',
        message: 'Berhasil mengsubmit asuransi',
        onHide: () => {
          router.back();
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSetujui(true);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Head>
        <title>Asuransi</title>
      </Head>
      <section className="max-w-1200 lg:mx-auto md:mt-6 flex flex-col justify-center w-full px-4 pb-[100px] mt-4 gap-y-6">
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <CardBanner
              image={Asuransi}
              content={
                <>
                  <h3 className="text-3xl font-bold text-white">
                    AKTIVASI ASURANSI
                  </h3>
                </>
              }
            />
          </Col>
        </Row>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <SoalSurveiItem
                form={form}
                draggerProps={draggerProps}
                type="NUMBER"
                label="Nomor Kartu"
                isRequired={true}
                field_id="no_kartu"
                isDetail={isDetail}
              />
            </Col>
            <Col xs={24}>
              <SoalSurveiItem
                isDetail={isDetail}
                form={form}
                draggerProps={draggerProps}
                type="NUMBER"
                label="NIK"
                isRequired={true}
                field_id="nik"
                rules={{
                  pattern: /^[0-9]{16}$/,
                  message: 'Harus terdiri dari 16 angka'
                }}
              />
            </Col>
            <Col xs={24}>
              <SoalSurveiItem
                isDetail={isDetail}
                form={form}
                draggerProps={draggerProps}
                type="TEXT"
                label="Nama Sesuai KTP"
                isRequired={true}
                field_id="nama"
              />
            </Col>
            <Col xs={24}>
              <SoalSurveiItem
                form={form}
                draggerProps={draggerProps}
                type={OBJ_TIPE_SOAL_JAWABAN.text}
                label="Tanggal Lahir (YYYY-MM-DD)"
                isRequired={true}
                field_id="tanggal_lahir"
                rules={{
                  pattern: /^\d{4}-\d{2}-\d{2}$/,
                  message: 'Harus dalam format YYYY-MM-DD'
                }}
              />
            </Col>
            <Col xs={24}>
              <SoalSurveiItem
                isDetail={isDetail}
                form={form}
                draggerProps={draggerProps}
                type="TEXT"
                label="Alamat"
                isRequired={true}
                field_id="alamat"
              />
            </Col>
            <Col xs={24}>
              <SoalSurveiItem
                isDetail={isDetail}
                form={form}
                draggerProps={draggerProps}
                type="NUMBER"
                label="No. HP"
                isRequired={true}
                field_id="no_hp"
              />
            </Col>
            <Col xs={24}>
              <SoalSurveiItem
                isDetail={isDetail}
                form={form}
                draggerProps={draggerProps}
                type="TEXT"
                label="Nama Ahli Waris"
                isRequired={true}
                field_id="nama_ahli_waris"
              />
            </Col>
            <Col xs={24}>
              <SoalSurveiItem
                isDetail={isDetail}
                form={form}
                draggerProps={draggerProps}
                type="NUMBER"
                label="No HP Nama Ahli Waris"
                isRequired={true}
                field_id="no_ahli_waris"
              />
            </Col>
            <Col xs={24}>
              <Form.Item
                name="kebijakan_privasi"
                valuePropName="checked"
                noStyle
              >
                <Checkbox
                  defaultChecked={false}
                  checked={setujui}
                  onChange={() => setSetujui(prev => !prev)}
                  className="font-medium text-[#C0C6D4]"
                >
                  Ya, Saya menyetujui
                  <span className="text-[#393885] font-medium">
                    {' '}
                    Kebijakan Privasi{' '}
                  </span>
                  aktivasi asuransi
                </Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <div className="flex items-center justify-between">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="px-9"
                  size="large"
                  disabled={setujui === false}
                >
                  Kirim
                </Button>
                <button
                  type="button"
                  className="text-primary text-base font-semibold"
                  onClick={onReset}
                  disabled={loading}
                >
                  Kosongkan isian
                </button>
              </div>
            </Col>
          </Row>
        </Form>
        <Image
          src={Watermark}
          width={200}
          height={45}
          alt="Watermark Pola Poli"
        />
      </section>
    </>
  );
};

export default Page;
