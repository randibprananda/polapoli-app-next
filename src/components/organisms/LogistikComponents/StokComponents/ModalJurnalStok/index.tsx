import { Col, Modal, Row, Table } from 'antd';
import React from 'react';
import { useStokLogistik } from '../../../../../swr';
import { dateFormat } from '../../../../../utils';
import { Spinner } from '../../../../atoms';
import Props from './modalJurnalStok.props';

const ModalJurnalStok: React.FC<Props> = ({ visible, onCancel, id }) => {
  const { data: stokData, isLoading } = useStokLogistik(true, id);

  const columns = [
    {
      title: 'Tanggal transaksi',
      dataIndex: 'created_at',
      key: 'tanggal transaksi',
      render: (text: string) => <p>{dateFormat(text)}</p>
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      key: 'nama',
      render: () => <p>{stokData?.data?.nama_barang}</p>
    },
    {
      title: 'Satuan',
      dataIndex: 'nama_satuan',
      key: 'satuan',
      render: () => <p>{stokData?.data?.nama_satuan}</p>
    },
    {
      title: 'Harga',
      dataIndex: 'harga_satuan',
      key: 'harga',
      render: () => <p>{stokData?.data?.harga_satuan}</p>
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan',
      key: 'keterangan'
    },
    {
      title: 'Stok Awal',
      dataIndex: 'stok_awal',
      key: 'stok_awal',
      render: (text: number) => (
        <p>{text ? `${text} ${stokData?.data?.nama_satuan}` : '-'}</p>
      )
    },
    {
      title: 'Total Masuk',
      dataIndex: 'total_masuk',
      key: 'total masuk',
      render: (text: number) => (
        <p>{text ? `${text} ${stokData?.data?.nama_satuan}` : '-'}</p>
      )
    },
    {
      title: 'Total Keluar',
      dataIndex: 'total_keluar',
      key: 'total keluar',
      render: (text: number) => (
        <p>{text ? `${text} ${stokData?.data?.nama_satuan}` : '-'}</p>
      )
    },
    {
      title: 'Stok Akhir',
      dataIndex: 'stok_akhir',
      key: 'stok akhir',
      render: (text: number) => (
        <p>{text ? `${text} ${stokData?.data?.nama_satuan}` : '-'}</p>
      )
    }
  ];

  return (
    <Modal footer={false} visible={visible} onCancel={onCancel} width={1200}>
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">Jurnal Stok: Master</h2>
      </div>
      <Row>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Table
              dataSource={stokData?.data?.history_logistik_stok}
              columns={columns}
              scroll={{ x: 1500 }}
              rowKey="id"
            />
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default ModalJurnalStok;
