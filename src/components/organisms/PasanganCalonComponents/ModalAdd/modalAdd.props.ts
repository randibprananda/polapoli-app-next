import { DraggerProps } from 'antd/lib/upload';
import { JenisPencalonanInterface } from '../../../../@types/DataMaster';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  jenisPencalonan: string;
  setJenisPencalonan: (jenis: string) => void;
  draggerProps: DraggerProps;
  loading: boolean;
  form: any;
  isEdit: boolean;
  isLegislatif: boolean;
};

export default Props;
