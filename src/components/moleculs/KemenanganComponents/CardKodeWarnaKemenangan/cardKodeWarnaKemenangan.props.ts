import { KodeWarnaInterface } from '../../../../@types/Kemenangan';

type OwnProps = {
  onClickEdit?: () => void;
  isDisable?: boolean;
};

type Props = OwnProps & KodeWarnaInterface;

export default Props;
