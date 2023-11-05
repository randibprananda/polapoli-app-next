import { DraggerProps } from 'antd/lib/upload';
type Props = {
  isRequired?: boolean;
  label?: string;
  type?: 'PILIHAN GANDA' | 'TEXT' | 'CHECKLIST' | 'GAMBAR' | 'NUMBER' | string;
  opsi?: string[];
  field_id?: string | number;
  draggerProps: DraggerProps;
  isDetail?: boolean;
  form?: any;
  rules?: any;
};

export default Props;
