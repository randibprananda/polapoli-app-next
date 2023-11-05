import { DraggerProps } from 'antd/lib/upload';
import { JenisPencalonanInterface } from '../../../../@types/DataMaster';
import { PartaiInterface } from '../../../../@types/Partai';

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
  partaiData?: PartaiInterface[];
};

export default Props;
