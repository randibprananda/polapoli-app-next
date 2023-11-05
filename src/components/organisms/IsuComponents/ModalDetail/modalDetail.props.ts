import { JenisIsuInterface } from '../../../../@types/Isu';
import FormImageProps from '../FormImage/formImage.props';
import FormTanggapanProps from '../FormTanggapan/tanggapan.props';
import FormWilayahProps from '../FormWilayahWithJenisIsu/wilayah.props';

type OwnProps = {
  visible: boolean;
  isEdit: boolean;
  onCancel: () => void;
  onFinish: (values: any, isUpdate: boolean) => void;
  loading: boolean;
  form: any;
  jenisIsu: JenisIsuInterface[];
};

type Props = FormImageProps & FormTanggapanProps & FormWilayahProps & OwnProps;

export default Props;
