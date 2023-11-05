import { RoleInterface } from '../../../../@types/User';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  loading: boolean;
  form: any;
  roleAvailable: RoleInterface[];
  isEdit?: boolean;
};

export default Props;
