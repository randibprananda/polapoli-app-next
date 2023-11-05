import { StokLogistikInterface } from '../../../../../@types/Logistik';
import FormWilayahWithJenisWilayahProps from '../../../../moleculs/FormWilayahWithJenisWilayah/wilayah.props';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  loading: boolean;
  form: any;
  isEdit: boolean;
  stokData: StokLogistikInterface[];
};

type Props = OwnProps & FormWilayahWithJenisWilayahProps;

export default Props;
