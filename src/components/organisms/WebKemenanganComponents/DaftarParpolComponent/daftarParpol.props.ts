import { DraggerProps } from 'antd/lib/upload';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any, callback: () => void) => void;
  onUpdate: (values: any, callback: () => void) => void;
  draggerProps: DraggerProps;
  loading: boolean;
  form: any;
  isEdit: boolean;
  onOpenModal: () => void;
  data: any[];
  columns: any[];
  isDisable?: boolean;
};

export default Props;
