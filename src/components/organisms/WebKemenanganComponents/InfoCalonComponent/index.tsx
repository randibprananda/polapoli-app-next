import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useCallback, useState } from 'react';
import { Gap } from '../../../atoms';
import { CardInfoCalonKemenangan } from '../../../moleculs';
import Props from './infoCalon.props';

const InfoCalonComponent: React.FC<Props> = ({
  form,
  onUpdate,
  data,
  isDisable
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    if (!open) {
      form.setFieldsValue({
        motto: data.motto,
        slogan: data.slogan
      });
    }
    setOpen(!open);
  }, [open]);

  return (
    <>
      <CardInfoCalonKemenangan
        onClickEdit={handleToggleModal}
        paslon_name={data.paslon_name}
        paslon_number={data.paslon_number}
        motto={data.motto}
        slogan={data.slogan}
        jenis_pencalonan={data.jenis_pencalonan}
        isDisable={isDisable}
      />
      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Info Calon</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onUpdate(e, () => setOpen(false))}
          form={form}
          layout="vertical"
        >
          {/* <Form.Item name="nama_calon" label="Nama Calon">
            <Input placeholder="Nama Calon" />
          </Form.Item>
          <Form.Item name="jenis_pencalonan_id" label="Jenis Pencalonan">
            <Select
              className="w-full"
              placeholder="Jenis Pencalonan"
              optionFilterProp="children"
            >
              {jenisPencalonan?.map((item: string) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item> */}
          <Form.Item name="slogan" label="Slogan">
            <Input placeholder="Slogan" />
          </Form.Item>
          <Form.Item name="motto" label="Motto">
            <Input placeholder="Motto" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-center">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Edit
              </Button>
              <Gap width={16} height={2} />
              <Button
                size="large"
                type="default"
                ghost
                onClick={handleToggleModal}
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

export default InfoCalonComponent;
