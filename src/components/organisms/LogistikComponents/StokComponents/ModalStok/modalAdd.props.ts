import FormWilayahWithJenisWilayahProps from '../../../../moleculs/FormWilayahWithJenisWilayah/wilayah.props';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  loading: boolean;
  form: any;
  isEdit: boolean;
} & FormWilayahWithJenisWilayahProps;

export default Props;
