import { KodeWarnaInterface } from '../../../../@types/Kemenangan';

type OwnProps = {
  onUpdate: (values: any, callback: () => void) => void;
  form: any;
  isDisable?: boolean;
};

type Props = OwnProps & KodeWarnaInterface;

export default Props;
