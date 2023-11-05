import FormWilayahProps from '../../../moleculs/FormWilayah/wilayah.props';

type OwnProps = {
  isPemilih: boolean;
  form: any;
  mounted: boolean;
  isDetail?: boolean;
};

type Props = OwnProps & FormWilayahProps;

export default Props;
