import { UserInterface } from '../../../../@types/User';

type DaftarAnggotaKoordinatorProps = {
  title?: string;
  data: UserInterface[];
  customNameField?: string;
  anggota: any[];
  setAnggota: (values: any) => void;
  onSearch: (val: any, type: any) => void;
  isDetail?: boolean;
};

export default DaftarAnggotaKoordinatorProps;
