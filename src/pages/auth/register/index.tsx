import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Col, message } from 'antd';
import { Form, Input, Button, Card, Checkbox } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Auth } from '../../../layouts';
import { useRouter } from 'next/router';
import { fetchWrapper, useForm } from '../../../utils';
import Link from 'next/link';
import Text from 'antd/lib/typography/Text';
import Image from 'next/image';
import { IcMail, IcPadlock, IcUser, IlCampaign } from '../../../assets';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Register = () => {
  const router = useRouter();
  const [antForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDiable] = useState(true);
  const [cookies, setCookie] = useCookies(['user', '_r']);
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    term: false
  });

  const handleInputChange = (e: any) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target;
      setForm(name, checked);
      return;
    }

    const { name, value } = e.target;
    setForm(name, value);

    if (
      form.name === '' ||
      form.email === '' ||
      form.password === '' ||
      !form.term
    ) {
      setIsDiable(true);
      return;
    }
    setIsDiable(false);
  };

  const onFinish = (values: any) => {
    // router.push('/dashboard');
    const newForm = {
      ...form,
      password_confirmation: form.password
    };
    delete newForm.term;
    setLoading(true);
    fetchWrapper
      .post('/api/auth/register', newForm)
      .then(res => {
        setCookie('user', JSON.stringify(res), {
          maxAge: 60 * 60 * 12,
          path: '/'
        });
        setCookie('_r', true, {
          maxAge: 60 * 60 * 6,
          path: '/'
        });

        fetchWrapper.post('/api/auth/email-verification', null).then(() => {
          router.push('/auth/register/email-verification');
        });
      })
      .catch(err => {
        if (err?.data?.error?.email) {
          message.error('Email telah terdaftar');
          return;
        }
        message.error('Something went wrong!');
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Head>
        <title>Register</title>
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
                  Daftar
                </Title>

                <Form
                  form={antForm}
                  name="normal_register"
                  className="w-full"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Masukkan nama anda!'
                      }
                    ]}
                  >
                    <Input
                      prefix={
                        <Image
                          src={IcUser}
                          alt="name"
                          width={20}
                          height={20}
                          objectFit="contain"
                        />
                      }
                      placeholder="Nama"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </Form.Item>
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
                          alt="lock"
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
                  <Form.Item className=" mb-8">
                    <Form.Item name="term" valuePropName="checked" noStyle>
                      <Checkbox
                        name="term"
                        defaultChecked={false}
                        onChange={handleInputChange}
                      >
                        Saya setuju dengan Syarat ketentuan
                        {/* <Link href="/">
                          <a className="text-primary underline font-medium">
                          </a>
                        </Link> */}{' '}
                        yang berlaku
                      </Checkbox>
                    </Form.Item>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      disabled={isDisable && !form.term}
                      block
                      size="large"
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={loading}
                    >
                      Daftar
                    </Button>
                  </Form.Item>
                  <Form.Item className="mt--4 text-center">
                    <Text>Sudah punya akun? </Text>
                    <Link href="/auth/login">
                      <a className="text-primary font-semibold" href="">
                        Login
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

Register.layout = Auth;

export default Register;
