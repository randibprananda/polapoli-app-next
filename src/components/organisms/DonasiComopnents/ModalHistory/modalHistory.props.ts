import { VirtualAccountInterface } from '../../../../@types/Donasi';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  loading: boolean;
  form: any;
  virtualAccounts: any[] | VirtualAccountInterface[];
};

export default Props;
