import FormWilayahProps from '../../../moleculs/FormWilayah/wilayah.props';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  form: any;
  loading: boolean;
  onFinish: (values: any) => void;
};

type Props = OwnProps & FormWilayahProps;

export default Props;
