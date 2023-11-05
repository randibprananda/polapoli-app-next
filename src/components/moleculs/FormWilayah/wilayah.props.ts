import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../@types/DaerahIndonesia';

export type KeyValueFormWilayahProps = {
  provinsi: 'id' | 'name';
  kecamatan: 'id' | 'name';
  kota: 'id' | 'name';
  kelurahan: 'id' | 'name';
  dataSurvey?: any;
};

type FormWilayahProps = {
  withTitle?: boolean;
  withWilayah?: boolean;
  withKelurahan?: boolean;
  isEdit?: boolean;
  wilayah: {
    provinsi: number | string | null;
    kecamatan: number | string | null;
    kota: number | string | null;
    kelurahan: number | string | null;
  };
  dataSurvey?: any;
  setWilayah: (name: string, value: any) => void;
  setWithWilayah?: (value: any) => void;
  disableAllInput?: boolean;
  provinsiData: ProvinsiInterface[];
  kotaData: KotaInterface[];
  kecamatanData: KecamatanInterface[];
  kelurahanData: KelurahanInterface[];
  description?: string;
  keyValue?: KeyValueFormWilayahProps;
  withBorder?: boolean;
  title?: string;
  customLayout?: {
    provinsi: {
      xs: any;
      sm: any;
      md: any;
      lg: any;
      xl: any;
    };
    kota: {
      xs: any;
      sm: any;
      md: any;
      lg: any;
      xl: any;
    };
    kecamatan: {
      xs: any;
      sm: any;
      md: any;
      lg: any;
      xl: any;
    };
    kelurahan: {
      xs: any;
      sm: any;
      md: any;
      lg: any;
      xl: any;
    };
  };
};

export default FormWilayahProps;
