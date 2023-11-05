import { MisiInterface } from '../../../../@types/Kemenangan';

type OwnProps = {
  form: any;
  onUpdate: (values: any, callback: () => void) => void;
  isDisable?: boolean;
};

type Props = OwnProps & MisiInterface;

export default Props;
