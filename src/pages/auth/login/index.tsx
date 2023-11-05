import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Row, Col, message } from 'antd';
import { Form, Input, Button, Card, Checkbox } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Auth } from '../../../layouts';
import { useRouter } from 'next/router';
import { fetchWrapper, useForm } from '../../../utils';
import Link from 'next/link';
import Text from 'antd/lib/typography/Text';
import Image from 'next/image';
import { IcMail, IcPadlock, IlCampaign } from '../../../assets';
import { useCookies } from 'react-cookie';
import { GetServerSideProps } from 'next';

const Login = (props: any) => {
  const router = useRouter();
  const [formLogin] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDiable] = useState(true);
  const [cookies, setCookie] = useCookies(['remember', 'user', '_r']);
  const [form, setForm] = useForm({
    email: '',
    password: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm(name, value);

    if (form.email === '' || form.password === '') {
      setIsDiable(true);
      return;
    }
    setIsDiable(false);
  };

  const onFinish = (values: any) => {
    setLoading(true);
    axios
      .post('/api/auth/login', form)
      .then(res => {
        if (values.remember && !cookies.remember) {
          setCookie('remember', form.email, {
            maxAge: 60 * 60 * 24 * 30 // 1 bulan
          });
        }

        setCookie('user', JSON.stringify(res.data), {
          maxAge: 60 * 60 * 12,
          path: '/'
        });

        if (!res.data.isVerified) {
          return fetchWrapper
            .post('/api/auth/email-verification', null)
            .then(() => {
              router.push('/auth/register/email-verification');
            });
        }

        router.push('/admin/pilih-tim-relawan');
      })
      .catch(() => {
        message.error('Email atau kata sandi salah');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (cookies.remember) {
      formLogin.setFieldsValue({
        email: cookies.remember
      });
      setForm('email', cookies.remember);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.token && cookies._r) {
      router.push('/auth/register/email-verification');
      return;
    }
    if (props.token) {
      router.push('/admin/dashboard');
      return;
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Row justify="center" align="middle" className="h-screen bg-light">
        <Col xs={24} md={22} lg={20} xl={18} xxl={14}>
          <Card className="py-1 md:py-16 border-none">
            <div className="flex flex-col sm:flex-row justify-center">
              <div className=" w-max h-max relative flex items-end">
                <Image
                  src={IlCampaign}
                  objectFit="contain"
                  width={429}
                  height={481}
                  alt="Campaign"
                />
                {/* hide logo */}
                <span className="bg-white absolute bottom-0 left-0 right-0 h-[30%]"></span>
              </div>
              <div className="w-full max-w-sm lg:max-w-md md:pl-9 mx-auto">
                <Title level={2} className="text-primary mb-9">
                  Masuk
                </Title>
                <Form
                  form={formLogin}
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Format email tidak valid!',
                        type: 'email'
                      }
                    ]}
                  >
                    <Input
                      prefix={
                        <Image
                          src={IcMail}
                          alt="email"
                          width={20}
                          height={20}
                          objectFit="contain"
                        />
                      }
                      placeholder="Email"
                      name="email"
                      type="email"
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Kata sandi minimal 8 karakter!',
                        pattern: new RegExp(/.{8,}$/)
                      }
                    ]}
                  >
                    <Input.Password
                      prefix={
                        <Image
                          src={IcPadlock}
                          alt="email"
                          width={20}
                          height={20}
                          objectFit="contain"
                        />
                      }
                      type="password"
                      placeholder="Kata Sandi"
                      name="password"
                      onChange={handleInputChange}
                    />
                  </Form.Item>

                  <Form.Item className="mt--4 text-right">
                    <Link href="/auth/forgot-password">
                      <a className="login-form-forgot text-primary" href="">
                        Lupa kata sandi?
                      </a>
                    </Link>
                  </Form.Item>
                  <Form.Item className=" mb-8">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox defaultChecked={false}>
                        Simpan Kata Sandi
                      </Checkbox>
                    </Form.Item>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      disabled={isDisable}
                      block
                      size="large"
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={loading}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                  <Form.Item className="mt--4 text-center">
                    <Text>Belum punya akun? </Text>
                    <Link href="/auth/register">
                      <a className="text-primary font-semibold" href="">
                        Daftar
                      </a>
                    </Link>
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

Login.layout = Auth;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies;
  return {
    props: {
      token: token || null
    }
  };
};

export default Login;
