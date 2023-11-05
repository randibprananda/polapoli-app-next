import CardBackgroundProps from '../../../moleculs/KemenanganComponents/CardBackgroundKemenangan/cardBackgroundKemenangan.props';

type OwnProps = {
  form: any;
  onUpdate: (values: any, callback: () => void) => void;
  isDisable?: boolean;
};

type Props = OwnProps & CardBackgroundProps;

export default Props;
