import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { ChevronLeft, Plus } from 'react-iconly';
import Image from 'next/image';
import { IcImageDefault } from '../../../assets';
import { colors } from '../../../theme';
import { Gap, RelawanItem, Spinner } from '../../atoms';
import { TimRelawanInterface } from '../../../@types/DataMaster';
import Dragger from 'antd/lib/upload/Dragger';

import Props from './relawanMenuModal.props';

const RelawanMenuModal: React.FC<Props> = ({
  openRelawan,
  setOpenRelawan,
  setIsModalVisible,
  isLoading,
  isModalVisible,
  isDisable = false,
  handleChooseTeam,
  onFinish,
  draggerProps,
  timRelawanData
}) => {
  return (
    <>
      <div
        className={`fixed top-24 sm:top-28 -left-12 sm:left-52 w-72 min-h-max translate-x-16 bg-white p-4 rounded-r-xl z-60 ${
          openRelawan ? 'block' : 'hidden'
        } shadow-md`}
      >
        <div className="flex items-center justify-between pb-5 mb-4 border-b border-b-grey3">
          <h2 className="text-xl font-bold ">Tim Anda</h2>
          <button
            className="flex items-center justify-center p-1 transition-all duration-150 rounded-full opacity-100 bg-primary hover:opacity-80"
            onClick={() => setOpenRelawan(false)}
          >
            <ChevronLeft set="light" primaryColor={colors.white} size={16} />
          </button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Spinner />
          </div>
        ) : (
          <>
            <Button
              size="large"
              className="flex justify-start mb-6"
              onClick={() => setIsModalVisible(true)}
            >
              <Plus set="bold" size={24} primaryColor={colors.primary} />
              <Gap width={8} height={8} /> Tambah Tim Relawan
            </Button>
            <div>
              {timRelawanData?.map((item: TimRelawanInterface) => (
                <RelawanItem
                  key={item.id}
                  image={item.photo_tim_relawan}
                  name={item.nama_tim_relawan}
                  onClick={() => handleChooseTeam(item.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Modal
        footer={false}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="pb-2 mb-6 border-b border-b-grey3">
          <h2 className="text-xl font-bold ">Tambah Tim Relawan</h2>
        </div>
        <Form initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="image"
            getValueFromEvent={({ file }) => file.originFileObj}
            required
          >
            <Dragger {...draggerProps} height={200} className="bg-white">
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
                <span className="font-semibold text-primary">Pilih File</span>
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Masukkan nama tim relawan'
              }
            ]}
          >
            <Input placeholder="Nama Tim Relawan*" name="name" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-center">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isDisable}
              >
                Simpan
              </Button>
              <Gap width={16} height={2} />
              <Button
                size="large"
                type="default"
                onClick={() => setIsModalVisible(false)}
              >
                Batal
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RelawanMenuModal;
