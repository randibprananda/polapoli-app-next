import { KontakInterface } from '../../../../@types/Kemenangan';

type Props = {
  form: any;
  onUpdate: (values: any, callback: () => void) => void;
  data?: KontakInterface;
  isDisable?: boolean;
};

export default Props;
