import React from 'react';
import { Button, Form, Input } from 'antd';
import Props from './parameterSimulasi.props';

const FormParameterSimulasi: React.FC<Props> = ({
  estimasiPemilih,
  targetMenang,
  onChangeParameter
}) => {
  return (
    <div className="bg-white rounded-xl p-3 md:p-9">
      <div className="border-b pb-2 border-b-grey3 mb-6">
        <h2 className=" text-xl font-bold">Parameter Simulasi</h2>
      </div>
      <Form layout="vertical">
        <Form.Item label="Estimasi Partisipasi Pemilih(%)">
          <Input
            placeholder="Estimasi Partisipasi Pemilih"
            type="number"
            value={estimasiPemilih}
            onChange={e => onChangeParameter('estimasiPemilih', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Target Menang(%)">
          <Input
            placeholder="Target Menang"
            type="number"
            value={targetMenang}
            onChange={e => onChangeParameter('targetMenang', e.target.value)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormParameterSimulasi;
