import { BackgroundInterface } from '../../../../@types/Kemenangan';

type OwnProps = {
  onClickEdit?: () => void;
  isDisable?: boolean;
};

type Props = OwnProps & BackgroundInterface;
export default Props;
