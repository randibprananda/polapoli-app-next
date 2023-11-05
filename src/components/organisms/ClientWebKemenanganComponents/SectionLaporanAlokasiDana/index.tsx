import { Button, Col, message, Row, Table } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { DraggerProps } from 'antd/lib/upload';
import React, { useState } from 'react';
import { AlokasiDonasiInterface } from '../../../../@types/Donasi';
import { currencyFormat, dateFormat } from '../../../../utils';
import { SectionWrapper } from '../../../moleculs';
import {
  ModalAlokasiDonasi,
  ModalAlokasiPublicDonasi
} from '../../DonasiComopnents';
import Props from './sectionLaporanAlokasiDana.props';

const SectionLaporanAlokasiDana: React.FC<Props> = ({ color, data }) => {
  const [formAlocation] = useForm();
  const [openModalAlocation, setOpenModalAlocation] = useState(false);

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    listType: 'picture',
    showUploadList: true,
    beforeUpload: file => {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isPNG) {
        message.error('Format tidak didukung! Masukan file .png atau .jpg', 3);
      }
      return isPNG;
    },
    maxCount: 1
  };

  const handleOpenModaltoDetail = (record: AlokasiDonasiInterface) => {
    formAlocation.setFieldsValue({
      bukti_alokasi: record?.bukti_alokasi,
      nominal: +record?.nominal,
      keterangan: record?.keterangan
    });
    setOpenModalAlocation(true);
  };

  const handleCloseModal = () => {
    setOpenModalAlocation(false);
    formAlocation.resetFields();
  };

  const alocationColumns = [
    {
      title: 'Tanggal',
      key: 'tanggal',
      dataIndex: 'created_at',
      render: (text: string) => <span>{dateFormat(text)}</span>
    },
    {
      title: 'Keterangan',
      key: 'keterangan',
      dataIndex: 'keterangan'
    },
    {
      title: 'Nominal',
      key: 'nominal',
      dataIndex: 'nominal',
      render: (text: string) => <span>{currencyFormat(+text)}</span>
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_: any, record: AlokasiDonasiInterface) => (
        <Row gutter={[16, 16]}>
          <Col>
            <Button onClick={() => handleOpenModaltoDetail(record)}>
              Lihat Bukti
            </Button>
          </Col>
        </Row>
      )
    }
  ];
  return (
    <>
      <SectionWrapper
        title="Laporan Alokasi Dana"
        titleColor={color}
        titleStyle="text-left"
      >
        <Table dataSource={data} columns={alocationColumns} />
      </SectionWrapper>

      <ModalAlokasiPublicDonasi
        visible={openModalAlocation}
        onCancel={handleCloseModal}
        form={formAlocation}
        color={color}
      />
    </>
  );
};

export default SectionLaporanAlokasiDana;
