import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../../@types/DaerahIndonesia';

type Props = {
  withWilayah: boolean;
  jenisWilayahIsu: string | null | undefined;
  isEdit: boolean;
  tempWilayah: {
    provinsi: number | string | null;
    kecamatan: number | string | null;
    kota: number | string | null;
    kelurahan: number | string | null;
  };
  setTempWilayah: (name: string, value: any) => void;
  setDynamicModalState: (name: string, value: any) => void;
  provinsiData: ProvinsiInterface[];
  kotaData: KotaInterface[];
  kecamatanData: KecamatanInterface[];
  kelurahanData: KelurahanInterface[];
  form: any;
  visible: boolean;
};

export default Props;
