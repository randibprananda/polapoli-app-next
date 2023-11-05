import { DraggerProps } from 'antd/lib/upload';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  draggerProps: DraggerProps;
  loading: boolean;
  form: any;
  isEdit: boolean;
  isDetail: boolean;
};

export default Props;
