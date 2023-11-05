import { DraggerProps } from 'antd/lib/upload';
import {
  CalonAnggotaInterface,
  PaslonInterface
} from '../../../../@types/DataMaster';
import { PartaiInterface } from '../../../../@types/Partai';
import FormWilayahRealCountProps from '../FormWilayahRealCount/formWilayahRealCount.props';
type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  draggerProps: DraggerProps;
  loading: boolean;
  form: any;
  isEdit: boolean;
  paslonData: PaslonInterface[];
  isDetail: boolean;
  isLegislatif?: boolean;
  calonAnggotaData: CalonAnggotaInterface[];
  partaiData: PartaiInterface[];
  setPartaiSelected?: any;
};

type Props = OwnProps & FormWilayahRealCountProps;

export default Props;
