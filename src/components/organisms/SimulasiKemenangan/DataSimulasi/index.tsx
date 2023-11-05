import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import Props from './dataSimulasi.props';

const DataSimulasi: React.FC<Props> = ({
  totalJumlahDPT = 0,
  jumlahPaslon = 0,
  totalPemilih = 0,
  targetSuara = 0,
  targetKemenangan = 0,
  estimasiPemilih = 0,
  targetMenang = 0
}) => {
  return (
    <div className="bg-white rounded-xl p-3 md:p-9">
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">Data Simulasi</h2>
      </div>
      <Form layout="vertical">
        <Row gutter={[12, 12]}>
          <Col xs={14}>
            <Form.Item label="Jumlah DPT">
              <span className="text-base">{totalJumlahDPT}</span>
            </Form.Item>
          </Col>
          <Col xs={10}>
            <Form.Item label="Jumlah Paslon">
              <span className="text-base">{jumlahPaslon}</span>
            </Form.Item>
          </Col>
          <Col xs={14}>
            <Form.Item
              label={`Estimasi Partisipasi Pemilih (${estimasiPemilih}%)`}
            >
              <span className="text-base">{totalPemilih}</span>
            </Form.Item>
          </Col>
          <Col xs={10}>
            <Form.Item label={`Target Suara(${targetMenang}%)`}>
              <span className="text-base">{targetSuara}</span>
            </Form.Item>
          </Col>
        </Row>
        <div className="text-center">
          <p className="text-sm">Target Kemenangan</p>
          <span className="font-bold text-primary text-3xl">
            {targetKemenangan} %
          </span>
        </div>
      </Form>
    </div>
  );
};

export default DataSimulasi;
