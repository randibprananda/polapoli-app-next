type FormJumlahSuaraProps = {
  data: { value: number; label: string }[];
  form: any;
  title?: string;
  type?: 'input' | 'select';
  suara_key?: {
    suara_sah: string;
    suara_tidak_sah: string;
  };
  onSelect?: any;
  isDetail?: boolean;
};

export default FormJumlahSuaraProps;
