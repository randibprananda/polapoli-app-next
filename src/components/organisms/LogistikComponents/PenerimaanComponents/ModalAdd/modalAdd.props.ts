import {
  PemesananLogistikInterface,
  StokLogistikInterface
} from '../../../../../@types/Logistik';
import FormWilayahWithJenisWilayahProps from '../../../../moleculs/FormWilayahWithJenisWilayah/wilayah.props';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  loading: boolean;
  form: any;
  stokData: StokLogistikInterface[];
  pemesananData: PemesananLogistikInterface[];
};

type Props = OwnProps & FormWilayahWithJenisWilayahProps;

export default Props;
