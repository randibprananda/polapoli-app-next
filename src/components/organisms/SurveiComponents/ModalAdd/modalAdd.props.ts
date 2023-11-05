import FormWilayahWithJenisWilayahProps from '../../../moleculs/FormWilayahWithJenisWilayah/wilayah.props';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  loading: boolean;
  form: any;
  isDetail?: boolean;
};

type Props = OwnProps & FormWilayahWithJenisWilayahProps;

export default Props;
