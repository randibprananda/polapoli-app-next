import { StokLogistikInterface } from '../../../../../@types/Logistik';
import WilayahProps from '../../../../moleculs/FormWilayahWithJenisWilayah/wilayah.props';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  loading: boolean;
  form: any;
  stokData: StokLogistikInterface[];
};

type Props = OwnProps & WilayahProps;

export default Props;
