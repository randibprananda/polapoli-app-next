import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../@types/DaerahIndonesia';

type FormWilayahWithJenisWilayahProps = {
  modalState: {
    withWilayah: boolean;
    jenisWilayah: string | null | undefined;
  };
  isCreate?: boolean;
  isEdit?: boolean;
  isDetail?: boolean;
  wilayah: {
    provinsi: number | string | null;
    kecamatan: number | string | null;
    kota: number | string | null;
    kelurahan: number | string | null;
  };
  setWilayah: (name: string, value: any) => void;
  setDynamicModalState: (name: string, value: any) => void;
  provinsiData: ProvinsiInterface[];
  kotaData: KotaInterface[];
  kecamatanData: KecamatanInterface[];
  kelurahanData: KelurahanInterface[];
  title?: string;
  withTitle?: boolean;
  withDapil?: boolean;
  withRTRW?: boolean;
  label?: string;
  customName?: string;
  form?: any;
  width?: '24' | '12';
};

export default FormWilayahWithJenisWilayahProps;
