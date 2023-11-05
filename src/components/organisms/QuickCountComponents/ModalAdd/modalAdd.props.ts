import { DraggerProps } from 'antd/lib/upload';
import {
  CalonAnggotaInterface,
  PaslonInterface
} from '../../../../@types/DataMaster';
import { PartaiInterface } from '../../../../@types/Partai';
import FormWilayahProps from '../../../moleculs/FormWilayah/wilayah.props';
type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  draggerProps: DraggerProps;
  loading: boolean;
  form: any;
  isEdit: boolean;
  isDetail: boolean;
  paslons: PaslonInterface[];
  isLegislatif?: boolean;
  calonAnggotaData: CalonAnggotaInterface[];
  partaiData: PartaiInterface[];
  setPartaiSelected?: any;
};

type Props = OwnProps & FormWilayahProps;

export default Props;
