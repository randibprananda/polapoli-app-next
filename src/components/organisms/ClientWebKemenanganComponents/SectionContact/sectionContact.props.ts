import {
  KontakInterface,
  SocialMedinaInterface,
  ThemeInterface
} from '../../../../@types/Kemenangan';

type OwnProps = {
  contact: KontakInterface;
  socialMedia: SocialMedinaInterface;
};

type Props = OwnProps & ThemeInterface;

export default Props;
