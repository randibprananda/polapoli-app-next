import { DraggerProps } from 'antd/lib/upload';

type Props = {
  draggerProps: DraggerProps;
  loading: boolean;
  form: any;
  isEdit: boolean;
  name: string;
  isRequired?: boolean;
  title?: string;
  isDetail?: boolean;
};

export default Props;
