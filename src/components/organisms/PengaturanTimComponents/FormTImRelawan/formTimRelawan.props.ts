import { UploadProps } from 'antd';

type Props = {
  avatar: string | null;
  uploadProps: UploadProps;
  form: any;
  onFinish: (values: any) => void;
  loading?: boolean;
  withAvatar?: boolean;
  withName?: boolean;
  withDate?: boolean;
  withYoutube?: boolean;
  withJenisPencalonan?: boolean;
};

export default Props;
