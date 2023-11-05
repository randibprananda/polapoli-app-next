import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Col, message } from 'antd';
import { Form, Input, Button, Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Auth } from '../../../layouts';
import { useRouter } from 'next/router';
import { fetchWrapper, useForm } from '../../../utils';
import Image from 'next/image';
import { IlCampaign, IcMail } from '../../../assets';
import axios, { AxiosError } from 'axios';

const ForgotPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDisable, setIsDiable] = useState(true);
  const [form, setForm] = useForm({
    email: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm(name, value);

    if (form.email === '') {
      setIsDiable(true);
      return;
    }
    setIsDiable(false);
  };

  const onFinish = () => {
    axios
      .post('/api/auth/forgot-password', form)
      .then(() => {
        localStorage.setItem('email', JSON.stringify(form));
        router.push('/auth/forgot-password/email-verification');
      })
      .catch(err => {
        const error = err as AxiosError;
        message.error(
          error?.response?.data?.data?.error || 'Gagal melakukan lupa password'
        );
      });
  };

  const handleCloseError = () => {
    setErrorVisible(false);
    setErrorMsg('');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Forgot Password</title>
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
                <Title level={2} className="text-primary mb-9 text-left">
                  Lupa Kata Sandi
                </Title>
                <Form
                  name="normal_login"
                  className="w-full"
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
                  <Form.Item>
                    <Button
                      disabled={isDisable}
                      block
                      size="large"
                      type="primary"
                      htmlType="submit"
                      className=" mt-4"
                      loading={loading}
                    >
                      Reset Kata Sandi
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

ForgotPassword.layout = Auth;

export default ForgotPassword;
