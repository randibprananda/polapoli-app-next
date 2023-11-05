import { Button, Col, Form, Row, Switch } from 'antd';
import React, { useState } from 'react';
import { RenderIf } from '../../../../utils';
import { SoalSurveiItem } from '../../../moleculs';
import FormSoalIsuSurvei from '../FormSoalIsuSurvei';
import FormSoalPemilihSurvei from '../FormSoalPemilihSurvei';
import Props from './formSoalSurvei.props';

const FormSoalSurvei: React.FC<Props> = ({
  form,
  draggerProps,
  questions,
  onReset,
  onSubmit,
  loading,
  isDetail = false,
  showImage = false,
  dataSurvey
}) => {
  const [option, setOption] = useState({
    withPemilih: false,
    withIsu: false
  });

  const handleChangeOption = (name: string, value: any) =>
    setOption(prev => ({
      ...prev,
      [name]: value
    }));

  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <SoalSurveiItem
            form={form}
            draggerProps={draggerProps}
            type="TEXT"
            label="Masukkan nama"
            isRequired={true}
            field_id="name"
            isDetail={isDetail}
          />
        </Col>
        <Col xs={24}>
          <SoalSurveiItem
            isDetail={isDetail}
            form={form}
            draggerProps={draggerProps}
            type="TEXT"
            label="Masukkan alamat"
            isRequired={true}
            field_id="alamat"
          />
        </Col>
        {questions?.map((item: any, index: number) => {
          if (isDetail) {
            const option = JSON.parse(item.field_form.option);
            return (
              <Col xs={24} key={index}>
                <SoalSurveiItem
                  form={form}
                  field_id={item.field_form.id}
                  draggerProps={draggerProps}
                  type={item.field_form.tipe}
                  label={item.field_form.label_inputan}
                  isRequired={true}
                  opsi={option?.pilihan}
                  isDetail={showImage}
                />
              </Col>
            );
          }

          const option = item.option_parse;
          return (
            <Col xs={24} key={index}>
              <SoalSurveiItem
                form={form}
                field_id={item.id}
                draggerProps={draggerProps}
                type={item.tipe}
                label={item.label_inputan}
                isRequired={true}
                opsi={option?.pilihan}
              />
            </Col>
          );
        })}
        <RenderIf isTrue={option.withPemilih}>
          <Col xs={24}>
            <FormSoalPemilihSurvei
              dataSurvey={dataSurvey}
              form={form}
              draggerProps={draggerProps}
            />
          </Col>
        </RenderIf>
        <RenderIf isTrue={option.withIsu}>
          <Col xs={24}>
            <FormSoalIsuSurvei form={form} draggerProps={draggerProps} />
          </Col>
        </RenderIf>
        <Col xs={24}>
          <RenderIf isTrue={!isDetail}>
            <Form.Item>
              <div className="flex items-center justify-start">
                <Form.Item valuePropName="checked" noStyle>
                  <Switch
                    defaultChecked={false}
                    checked={option.withPemilih}
                    onChange={e => handleChangeOption('withPemilih', e)}
                  />
                </Form.Item>
                <span className="ml-3 font-medium">
                  Jadikan Data Pemilih/Pendukung
                </span>{' '}
              </div>
            </Form.Item>
          </RenderIf>
          <RenderIf isTrue={!isDetail}>
            <Form.Item>
              <div className="flex items-center justify-start">
                <Form.Item valuePropName="checked" noStyle>
                  <Switch
                    defaultChecked={false}
                    checked={option.withIsu}
                    onChange={e => handleChangeOption('withIsu', e)}
                  />
                </Form.Item>
                <span className="ml-3 font-medium">
                  Tambahkan Monitoring Isu
                </span>{' '}
              </div>
            </Form.Item>
          </RenderIf>
        </Col>
        <RenderIf isTrue={!isDetail}>
          <Col xs={24}>
            <div className="flex items-center justify-between">
              <Button
                htmlType="submit"
                type="primary"
                className="px-9"
                size="large"
                disabled={loading}
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
        </RenderIf>
      </Row>
    </Form>
  );
};

export default FormSoalSurvei;
