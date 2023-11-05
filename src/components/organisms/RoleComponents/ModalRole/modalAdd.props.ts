type Props = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  loading: boolean;
  form: any;
  isEdit: boolean;
  nameDisabled?: boolean;
};

export default Props;
