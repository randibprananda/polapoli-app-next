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
  optionalState: {
    withTarget: boolean;
    withDateline: boolean;
  };
  setOptionalState: (name: 'withTarget' | 'withDateline', value: any) => void;
};

export default Props;
