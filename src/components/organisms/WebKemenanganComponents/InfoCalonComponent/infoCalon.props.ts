type Props = {
  form: any;
  onUpdate: (values: any, callback: () => void) => void;
  data: {
    paslon_name?: string | null;
    paslon_number?: number | null;
    jenis_pencalonan?: string | null;
    slogan?: string | null;
    motto?: string | null;
  };
  jenisPencalonan: string[];
  isDisable?: boolean;
};

export default Props;
