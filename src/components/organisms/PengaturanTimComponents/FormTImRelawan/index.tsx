import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Upload,
  Select,
  Switch
} from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { Camera } from 'react-iconly';
import { IcUserDefault } from '../../../../assets';
import { JENIS_PENCALONAN_TIM } from '../../../../constant';
import { colors } from '../../../../theme';
import { Gap } from '../../../atoms';
import Props from './formTimRelawan.props';

const { Option } = Select;

const FormTimRelawan: React.FC<Props> = ({
  loading = false,
  avatar,
  form,
  uploadProps,
  onFinish,
  withAvatar = true,
  withName = true,
  withDate = true,
  withYoutube = true,
  withJenisPencalonan = true
}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="bg-white rounded-xl py-5 px-6">
      <div className="border-b pb-2 border-b-grey3">
        <h2 className="font-bold text-xl">Tim Relawan</h2>
      </div>
      <div>
        {withAvatar && (
          <div className="flex justify-center mt-11 mb-9">
            <div className="relative">
              <Image
                src={avatar ? avatar : IcUserDefault}
                width={150}
                height={150}
                objectFit="contain"
                loading="eager"
                alt="Image Profile"
                className="rounded-3xl"
              />
              <Upload {...uploadProps}>
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  className="flex justify-center items-center absolute bottom-2 right-0"
                >
                  <Camera set="bold" primaryColor={colors.white} />
                </Button>
              </Upload>
            </div>
          </div>
        )}
        <Form
          form={form}
          layout="vertical"
          onFinish={e => {
            onFinish(e);
            setIsEdit(false);
          }}
        >
          {withName && (
            <Form.Item
              className=" mb-4"
              name="nama_tim_relawan"
              label="Nama Tim"
              rules={[
                {
                  required: true,
                  message: 'Tidak boleh kosong!'
                }
              ]}
            >
              <Input disabled={!isEdit} />
            </Form.Item>
          )}

          {/* {withJenisPencalonan && (
            <Form.Item
              className=" mb-4"
              name="jenis_pencalonan"
              label="Jenis Pencalonan"
            >
              <Select placeholder="Jenis Pencalonan" disabled={!isEdit}>
                {JENIS_PENCALONAN_TIM?.map((item: string) => (
                  <Option key={item} className="capitalize">
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )} */}

          {withDate && (
            <Form.Item
              className=" mb-4"
              name="tanggal_pemilihan"
              label="Tanggal Pemilihan"
              rules={[
                {
                  required: true,
                  message: 'Tidak boleh kosong!'
                }
              ]}
            >
              <DatePicker
                showTime
                disabled={!isEdit}
                placeholder="Masukan Tanggal Pemilihan"
                className="w-full"
              />
            </Form.Item>
          )}

          {withYoutube && (
            <Form.Item className=" mb-4" name="link_video" label="Link Youtube">
              <Input disabled={!isEdit} />
            </Form.Item>
          )}

          <Form.Item>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-base">Pencalonan Legislatif</p>{' '}
              <Form.Item
                name="jenis_pencalonan"
                valuePropName="checked"
                noStyle
              >
                <Switch defaultChecked={false} disabled={!isEdit} />
              </Form.Item>
            </div>
          </Form.Item>

          <Gap height={16} width={10} />
          {isEdit && (
            <div className="flex justify-center">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Simpan
              </Button>
              <Gap width={16} height={10} />
              <Button
                size="large"
                type="default"
                htmlType="button"
                onClick={() => setIsEdit(false)}
              >
                Batal
              </Button>
            </div>
          )}
        </Form>
        {!isEdit && (
          <div className="flex justify-center">
            <Gap height={32} width={10} />
            <Button
              size="large"
              type="primary"
              htmlType="button"
              onClick={() => setIsEdit(true)}
            >
              Ubah Tim
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormTimRelawan;
