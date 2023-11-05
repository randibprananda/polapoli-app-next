import { VisiInterface } from '../../../../@types/Kemenangan';

type OwnProps = {
  form: any;
  onUpdate: (values: any, callback: () => void) => void;
  isDisable?: boolean;
};

type Props = OwnProps & VisiInterface;

export default Props;
