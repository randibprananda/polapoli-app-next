import { Modal, Form, Input, Button, Row, Col } from 'antd';
import React, { useCallback, useState } from 'react';
import { Gap } from '../../../atoms';
import { CardSocialMediaKemenangan } from '../../../moleculs';
import Props from './socialMedia.props';

const SocialMediaComponent: React.FC<Props> = ({
  form,
  onUpdate,
  data,
  isDisable
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    if (!open) {
      form.setFieldsValue({
        instagram: data?.instagram,
        url_instagram: data?.url_instagram,
        facebook: data?.facebook,
        url_facebook: data?.url_facebook,
        youtube: data?.youtube,
        url_youtube: data?.url_youtube,
        twitter: data?.twitter,
        url_twitter: data?.url_twitter,
        tiktok: data?.tiktok,
        url_tiktok: data?.url_tiktok,
        linkedin: data?.linkedin,
        url_linkedin: data?.url_linkedin
      });
    }
    setOpen(!open);
  }, [open]);

  return (
    <>
      <CardSocialMediaKemenangan
        instagram={data?.instagram}
        url_instagram={data?.url_instagram}
        facebook={data?.facebook}
        url_facebook={data?.url_facebook}
        youtube={data?.youtube}
        url_youtube={data?.url_youtube}
        twitter={data?.twitter}
        url_twitter={data?.url_twitter}
        tiktok={data?.tiktok}
        url_tiktok={data?.url_tiktok}
        linkedin={data?.linkedin}
        url_linkedin={data?.url_linkedin}
        onClickEdit={handleToggleModal}
        isDisable={isDisable}
      />
      <Modal footer={false} visible={open} onCancel={handleToggleModal}>
        <div className="border-b pb-2 border-b-grey3 mb-6">
          <h2 className=" text-xl font-bold">Sosial Media</h2>
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={e => onUpdate(e, () => setOpen(false))}
          form={form}
          layout="vertical"
        >
          <Row gutter={[8, 24]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="instagram"
                label="Akun Instagram"
                className="mb-0"
              >
                <Input placeholder="Akun Instagram" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="url_instagram" label="URL" className="mb-0">
                <Input placeholder="URL" type="url" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="facebook" label="Akun Facebook" className="mb-0">
                <Input placeholder="Akun Facebook" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="url_facebook" label="URL" className="mb-0">
                <Input placeholder="URL" type="url" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="youtube" label="Akun Youtube" className="mb-0">
                <Input placeholder="Akun Youtube" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="url_youtube" label="URL" className="mb-0">
                <Input placeholder="URL" type="url" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="twitter" label="Akun Twitter" className="mb-0">
                <Input placeholder="Akun Twitter" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="url_twitter" label="URL" className="mb-0">
                <Input placeholder="URL" type="url" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="tiktok" label="Akun Tiktok" className="mb-0">
                <Input placeholder="Akun Tiktok" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="url_tiktok" label="URL" className="mb-0">
                <Input placeholder="URL" type="url" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="linkedin" label="Akun Linkedin" className="mb-0">
                <Input placeholder="Akun Linkedin" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="url_linkedin" label="URL" className="mb-0">
                <Input placeholder="URL" type="url" />
              </Form.Item>
            </Col>
          </Row>

          <Gap height={24} width={12} />

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

export default SocialMediaComponent;
