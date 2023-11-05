type Props = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  loading: boolean;
  form: any;
  amount: any;
  setAmount: (e: any) => void;
};

export default Props;
