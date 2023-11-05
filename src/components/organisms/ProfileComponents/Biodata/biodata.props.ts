import { UploadProps } from 'antd';

type Props = {
  avatar: string | null;
  uploadProps: UploadProps;
  form: any;
  onFinish: (values: any) => void;
  loading?: boolean;
};

export default Props;
