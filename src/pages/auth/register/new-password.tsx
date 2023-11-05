import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Col, message } from 'antd';
import { Form, Input, Button, Card, Checkbox } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useRouter } from 'next/router';
import { fetchWrapper } from '../../../utils';
import Image from 'next/image';
import { IcMail, IcPadlock, IcUser, IlCampaign } from '../../../assets';

const CreatePassword = () => {
  const router = useRouter();
  const [antForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<any>(null);

  const onFinish = (values: any) => {
    if (values.password !== values.password_confirmation) {
      message.error('Konfirmasi Password tidak sesuai', 2);
      return;
    }
    values.token = token;

    setLoading(true);
    fetchWrapper
      .post(`/api/auth/reset-password`, values)
      .then(() => {
        message.success('Berhasil buat password', 2);

        setTimeout(() => {
          router.push('/auth/login');
        }, 1500);
      })
      .catch(err => {
        message.error('Gagal buat password');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search);
    setToken(urlSearch.get('token'));
    localStorage.removeItem('email');
  }, []);

  return (
    <>
      <Head>
        <title>Buat Password</title>
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
              <div className="flex flex-col items-start justify-center w-full max-w-sm lg:max-w-md md:pl-9 mx-auto">
                <Title level={2} className="text-primary mb-9">
                  Buat Kata Sandi
                </Title>

                <Form
                  form={antForm}
                  name="normal_register"
                  className="w-full"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Kata sandi minimal 8 karakter!',
                        pattern: new RegExp(/.{8,}$/)
                      }
                    ]}
                    className="mb-4"
                  >
                    <Input.Password
                      prefix={
                        <Image
                          src={IcPadlock}
                          alt="lock"
                          width={20}
                          height={20}
                          objectFit="contain"
                        />
                      }
                      type="password"
                      placeholder="Kata Sandi"
                      name="password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password_confirmation"
                    rules={[
                      {
                        required: true,
                        message: 'Kata sandi minimal 8 karakter!',
                        pattern: new RegExp(/.{8,}$/)
                      }
                    ]}
                    className="mb-4"
                  >
                    <Input.Password
                      prefix={
                        <Image
                          src={IcPadlock}
                          alt="lock"
                          width={20}
                          height={20}
                          objectFit="contain"
                        />
                      }
                      type="password"
                      placeholder="Ulangi Kata Sandi"
                      name="password"
                    />
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
                      Buat Kata Sandi
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

export default CreatePassword;
