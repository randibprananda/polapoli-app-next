import { MisiInterface } from '../../../../@types/Kemenangan';

type OwnProps = {
  onClickEdit?: () => void;
  isDisable?: boolean;
};

type Props = OwnProps & MisiInterface;

export default Props;
