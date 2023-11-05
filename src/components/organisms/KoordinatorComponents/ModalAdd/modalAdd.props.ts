import FormWilayahWithJenisWilayahProps from '../../../moleculs/FormWilayahWithJenisWilayah/wilayah.props';
import { UserInterface } from '../../../../@types/User';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  loading: boolean;
  form: any;
  isEdit: boolean;
  isDetail: boolean;
  relawanData: UserInterface[];
  saksiData: UserInterface[];
  anggotaRelawan: any[];
  setAnggotaRelawan: (values: any) => void;
  setKelurahanId: (values: any) => void;
  anggotaSaksi: any[];
  setAnggotaSaksi: (values: any) => void;
  onSearchRelawan: (val: any, type: any) => void;
  onSearchSaksi: (val: any, type: any) => void;
  isCreate: boolean;
};

type Props = OwnProps & FormWilayahWithJenisWilayahProps;

export default Props;
