import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table
} from 'antd';
import React, { useEffect, useState } from 'react';

import { CardPengalamanKerjaKemenangan } from '../../../moleculs';
import { Delete } from 'react-iconly';
import { Gap } from '../../../atoms';
import { PeriodeInterface } from '../../../../@types/Kemenangan';
import Props from './pengalamanKerja.props';
import { colors } from '../../../../theme';
import moment from 'moment';
import { responseMessage } from '../../../../utils/responseMessage/index';

const { Option } = Select;

const defaultPeriode = {
  description: '',
  start: '',
  end: ''
};

const PengalamanKerjaComponent: React.FC<Props> = ({
  visible,
  onCancel,
  onCreate,
  loading,
  form,
  isEdit,
  onUpdate,
  onOpenModal,
  data,
  columns,
  isDisable
}) => {
  const [periode, setPeriode] = useState(defaultPeriode);

  const [pengalamanData, setPengalamanData] = useState<
    PeriodeInterface[] | null
  >(null);

  const handleChangePeriode = (value: any) =>
    setPeriode({
      ...periode,
      ...value
    });

  const push = () => {
    const isPeriodeValid = Object.values(periode).every(value => value !== '');
    if (isPeriodeValid) {
      setPengalamanData(
        pengalamanData ? [...pengalamanData, periode] : [periode]
      );
    } else {
      responseMessage({
        type: 'error',
        message: 'Data tidak boleh kosong',
        onHide: onCancel
      });
    }
  };

  const remove = (index: number) => {
    if (pengalamanData) {
      const temp = pengalamanData?.filter(
        (item: PeriodeInterface, idx) => idx !== index
      );
      setPengalamanData(temp);
    }
  };

  useEffect(() => {
    const data = form.getFieldValue('detail_pengalaman');

    if (data) {
      const tempData = data?.map((item: PeriodeInterface) => ({
        description: item?.description,
        start: moment(item?.start),
        end: moment(item?.end)
      }));
      setPengalamanData(tempData);
    }
  }, [form.getFieldValue('detail_pengalaman')]);

  const onFinish = (e: any) => {
    const tempData = {
      ...e,
      detail_pengalaman: pengalamanData?.map((item: PeriodeInterface) => ({
        ...item,
        start: item.start.format('YYYY'),
        end: item.end.format('YYYY')
      }))
    };
    isEdit ? onUpdate(tempData, onCancel) : onCreate(tempData, onCancel);
  };

  return (
    <>
      <CardPengalamanKerjaKemenangan
        data={data}
        columns={columns}
        onClickEdit={onOpenModal}
        isDisable={isDisable}
      />

      <Modal footer={false} visible={visible} onCancel={onCancel} width={800}>
        <div className="pb-2 mb-6 border-b border-b-grey3">
          <h2 className="text-xl font-bold ">
            {isEdit ? 'Edit' : 'Tambah'} Pengalaman Kerja
          </h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onFinish(e)}
          form={form}
          layout="vertical"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Form.Item
                name="name"
                label="Nama Calon"
                required
                rules={[
                  {
                    required: true,
                    message: 'Masukkan Nama'
                  }
                ]}
                className="mb-0"
              >
                <Input placeholder="Masukkan Nama" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="detail_pengalaman"
                label="Nama Calon"
                required
                className="hidden mb-0"
              >
                <Input placeholder="Masukkan Nama" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Pengalaman Kerja"
                required
                name="pk"
                className="mb-0"
                rules={[
                  {
                    required: !isEdit,
                    message: 'Masukkan Pengalaman Kerja'
                  }
                ]}
              >
                <Input
                  placeholder="Pengalaman Kerja"
                  onChange={e =>
                    handleChangePeriode({ description: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label="Mulai Dari"
                name="mulai"
                required
                rules={[
                  {
                    required: !isEdit,
                    message: 'Tidak boleh kosong!'
                  }
                ]}
                className="mb-0"
              >
                <DatePicker
                  picker="year"
                  placeholder="yyyy"
                  className="w-full"
                  onChange={e => handleChangePeriode({ start: e })}
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label="Sampai"
                name="sampai"
                rules={[
                  {
                    required: !isEdit,
                    message: 'Tidak boleh kosong!'
                  }
                ]}
                required
                className="mb-0"
              >
                <DatePicker
                  picker="year"
                  placeholder="yyyy"
                  className="w-full"
                  onChange={e => handleChangePeriode({ end: e })}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <div className="flex justify-end">
                <Button type="primary" htmlType="button" onClick={push}>
                  Tambah
                </Button>
              </div>
            </Col>
            <Col xs={24}>
              <Table
                dataSource={pengalamanData || []}
                columns={[
                  {
                    title: 'Jabatan',
                    dataIndex: 'description',
                    key: 'jabatan'
                  },
                  {
                    title: 'Periode',
                    key: 'periode',
                    render: (_: any, item: PeriodeInterface) => (
                      <span>{`${item?.start?.format(
                        'YYYY'
                      )} - ${item?.end?.format('YYYY')}`}</span>
                    )
                  },
                  {
                    title: 'Aksi',
                    dataIndex: '',
                    key: '',
                    render: (text, record, index) => (
                      <button className="ml-7" onClick={() => remove(index)}>
                        <Delete
                          set="bold"
                          primaryColor={colors.danger}
                          size={24}
                        />
                      </button>
                    )
                  }
                ]}
              />
            </Col>
            <Col xs={24}>
              <Form.Item>
                <div className="flex justify-center">
                  <Button size="large" type="primary" htmlType="submit">
                    Simpan
                  </Button>
                  <Gap width={16} height={2} />
                  <Button size="large" type="default" ghost onClick={onCancel}>
                    Batal
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default PengalamanKerjaComponent;
