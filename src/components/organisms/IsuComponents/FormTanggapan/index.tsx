import { Row, Col, Button, Form, Input } from 'antd';
import React from 'react';
import { Gap, Label } from '../../../atoms';
import Props from './tanggapan.props';

const FormTanggapan: React.FC<Props> = ({
  isEdit,
  withTanggapan,
  form,
  handleAbaikan,
  handleBatalAbaikan,
  setDynamicModalState
}) => {
  return (
    <Row gutter={[16, 8]}>
      <Col xs={24}>
        <div className="bg-grey3 p-3 flex justify-center items-start mb-1">
          <p className="font-semibold text-base">Tanggapan</p>
        </div>
      </Col>
      <Col xs={24} className="flex pt-2">
        {isEdit &&
          !withTanggapan &&
          form.getFieldValue('is_abaikan') === 0 &&
          (form.getFieldValue('tanggapan_isu') === '-' ||
            !form.getFieldValue('tanggapan_isu')) && (
            <>
              <Button
                size="large"
                type="primary"
                className="login-form-button"
                block
                onClick={() => setDynamicModalState('withTanggapan', true)}
              >
                Beri Tanggapan
              </Button>
              <Gap width={16} height={2} />
              <Button
                size="large"
                type="primary"
                danger
                block
                onClick={handleAbaikan}
              >
                Abaikan
              </Button>
            </>
          )}
        {isEdit && withTanggapan && (
          <div className="flex flex-col w-full">
            <Form.Item name="tanggapan_isu" label="Tanggapan" className="mb-1">
              <Input.TextArea
                placeholder="Keterangan/Laporan"
                rows={5}
                disabled={!isEdit}
              />
            </Form.Item>
            <div className="text-right">
              <button
                className="text-danger italic text-xs font-semibold"
                onClick={() => {
                  form.setFieldsValue({
                    ...form.getFieldsValue(),
                    tanggapan_isu: '-'
                  });
                }}
              >
                Hapus Tanggapan
              </button>
            </div>
          </div>
        )}
        {isEdit && form.getFieldValue('is_abaikan') === 1 && (
          <Button
            size="large"
            type="default"
            danger
            block
            onClick={handleBatalAbaikan}
          >
            Batal Mengabaikan Isu
          </Button>
        )}
        {!isEdit && form.getFieldValue('is_abaikan') === 1 && (
          <Label type="danger" text="Isu ini diabaikan" />
        )}
        {!isEdit && form.getFieldValue('tanggapan_isu') !== '-' && (
          <Label type="info" text={form.getFieldValue('tanggapan_isu') || ''} />
        )}
      </Col>
    </Row>
  );
};

export default FormTanggapan;
