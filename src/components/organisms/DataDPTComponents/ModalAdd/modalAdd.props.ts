import { DraggerProps } from 'antd/lib/upload';
import { DPTInterface } from '../../../../@types/Pendukung';
import FormWilayahProps from '../../../moleculs/FormWilayah/wilayah.props';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  loading: boolean;
  form: any;
  isEdit: boolean;
  isPemilih: boolean;
  isDetail?: boolean;
  draggerPropsFoto: DraggerProps;
  draggerPropsKTP: DraggerProps;
  onTogglePemilih?: () => void;
  withButton?: boolean;
  dptData?: DPTInterface[];
  setNIK?: (val: any) => void | undefined;
  onSearchNIK?: (val: any) => void | undefined;
};

type Props = OwnProps & FormWilayahProps;

export default Props;
