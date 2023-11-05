import FormWilayahProps from '../../../moleculs/FormWilayah/wilayah.props';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: any) => void;
  onUpdate: (values: any) => void;
  loading: boolean;
  form: any;
  isEdit: boolean;
  isDetail: boolean;
  isPemilih: boolean;
};

type Props = OwnProps & FormWilayahProps;

export default Props;
