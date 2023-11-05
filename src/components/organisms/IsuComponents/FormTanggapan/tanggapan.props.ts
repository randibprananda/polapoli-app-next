type Props = {
  isEdit: boolean;
  withTanggapan: boolean;
  form: any;
  setDynamicModalState: (name: string, value: any) => void;
  handleAbaikan: () => void;
  handleBatalAbaikan: () => void;
};

export default Props;
