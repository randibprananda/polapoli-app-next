import { UserInterface } from '../../../../@types/User';
import FormWilayahProps from '../../../moleculs/FormWilayah/wilayah.props';

type ModalAddJadwalKunjunganProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  loading: boolean;
  form: any;
  isEdit: boolean;
  isDetail: boolean;
  relawanData: UserInterface[];
  onSearchRelawan: (val: any, type: any) => void;
} & FormWilayahProps;

export default ModalAddJadwalKunjunganProps;
