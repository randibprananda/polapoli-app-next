import { KontakInterface } from '../../../../@types/Kemenangan';

type OwnProps = {
  onClickEdit?: () => void;
  isDisable?: boolean;
};

type Props = OwnProps & KontakInterface;

export default Props;
