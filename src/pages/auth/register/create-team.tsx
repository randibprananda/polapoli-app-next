import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Alert } from 'antd';
import { Form, Input, Button, Card } from 'antd';
import { Gap } from '../../../components';
import Title from 'antd/lib/typography/Title';
import { Auth } from '../../../layouts';
import { useRouter } from 'next/router';
import Text from 'antd/lib/typography/Text';
import Image from 'next/image';
import { IcImageDefault, IlCampaign } from '../../../assets';
import Dragger from 'antd/lib/upload/Dragger';
import { DraggerProps, RcFile } from 'antd/lib/upload';
import { useForm } from 'antd/lib/form/Form';
import { fetchWrapper, responseMessage } from '../../../utils';

const CreateTeam = () => {
  const router = useRouter();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append('nama_tim_relawan', values.nama_tim_relawan);
    formData.append('photo_tim_relawan', values.photo_tim_relawan);

    setLoading(true);
    fetchWrapper
      .post_multipart('/api/tim-relawan', formData)
      .then(() => {
        responseMessage({
          type: 'success',
          message: 'Berhasil membuat tim!',
          onHide: () => {
            router.push('/admin/dashboard');
          }
        });
      })
      .catch(err => {
        responseMessage({
          type: 'error',
          message: 'Gagal membuat tim!',
          onHide: () => {}
        });
      })
      .finally(() => setLoading(false));
  };

  const handleCloseError = () => {
    setErrorVisible(false);
    setErrorMsg('');
  };

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    maxCount: 1
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Create your first team</title>
      </Head>
      <Row justify="center" align="middle" className="h-screen bg-light">
        <Col xs={24} md={22} lg={20} xl={18} xxl={14}>
          <Card className="py-1 md:py-16 border-none">
            <div className="flex flex-col sm:flex-row justify-center">
              <Image
                src={IlCampaign}
                objectFit="contain"
                width={429}
                height={481}
                alt="Campaign"
              />
              <div className="w-full max-w-sm lg:max-w-md md:pl-9 mx-auto">
                <Text>Selangkah lagi untuk menyelesaikan pendaftaran,</Text>
                <Title level={2} className="text-primary mb-9">
                  Buat Tim Relawan
                </Title>
                {errorVisible ? (
                  <>
                    <Alert
                      showIcon
                      message={errorMsg}
                      type="error"
                      closable
                      afterClose={handleCloseError}
                    />

                    <Gap height={20} width={12} />
                  </>
                ) : null}

                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  form={form}
                >
                  <Form.Item
                    name="photo_tim_relawan"
                    getValueFromEvent={({ file }) => file.originFileObj}
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Masukkan foto tim'
                      }
                    ]}
                  >
                    <Dragger
                      {...draggerProps}
                      height={200}
                      className="bg-white upload-list-inline"
                    >
                      <p className="ant-upload-drag-icon">
                        {/* <InboxOutlined /> */}
                        <Image
                          src={IcImageDefault}
                          width={50}
                          height={50}
                          objectFit="contain"
                          alt="icon dragger"
                        />
                      </p>
                      <p className="ant-upload-text">
                        Tarik foto atau,{' '}
                        <span className=" text-primary font-semibold">
                          Pilih File
                        </span>
                      </p>
                    </Dragger>
                  </Form.Item>
                  <Form.Item
                    name="nama_tim_relawan"
                    rules={[
                      {
                        required: true,
                        message: 'Masukkan nama tim relawan'
                      }
                    ]}
                    required
                  >
                    <Input placeholder="Nama Tim Relawan" name="nama" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      block
                      size="large"
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={loading}
                    >
                      Simpan
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

CreateTeam.layout = Auth;

export default CreateTeam;
