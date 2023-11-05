import { DraggerProps } from 'antd/lib/upload';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../../../@types/DaerahIndonesia';
import { JenisIsuInterface } from '../../../../@types/Isu';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  draggerProps: DraggerProps;
  loading: boolean;
  form: any;
  tempWilayah: {
    provinsi: number | string | null;
    kecamatan: number | string | null;
    kota: number | string | null;
    kelurahan: number | string | null;
  };
  setTempWilayah: (name: string, value: any) => void;
  provinsiData: ProvinsiInterface[];
  kotaData: KotaInterface[];
  kecamatanData: KecamatanInterface[];
  kelurahanData: KelurahanInterface[];
  jenisIsu: JenisIsuInterface[];
  withWilayah: boolean;
  setWithWilayah: (e: any) => void;
  jenisWilayahIsu: string | undefined | null;
  setJenisWilayahIsu: (e: any) => void;
};

export default Props;
