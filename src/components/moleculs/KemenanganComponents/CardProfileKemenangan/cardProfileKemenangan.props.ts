import { ParpolInterface, ThemeInterface } from '../../../../@types/Kemenangan';

type OwnProps = {
  jenis_pencalonan: string;
  nama_paslon: string;
  nama_wakil_paslon: string;
  nomor_urut: string;
  paslon_profile_photo: string;
  motto: string;
  slogan: string;
  parpol: ParpolInterface[];
};

type Props = OwnProps & ThemeInterface;

export default Props;
