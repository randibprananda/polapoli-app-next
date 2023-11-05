import {
  ProvinsiInterface,
  KotaInterface,
  KecamatanInterface,
  KelurahanInterface
} from '../../../@types/DaerahIndonesia';

type Props = {
  resetWilayah: (
    category:
      | 'all'
      | 'provinsi'
      | 'kabupaten'
      | 'kecamatan'
      | 'kelurahan'
      | 'rt/rw'
  ) => void;
  wilayah: {
    propinsi_id: ProvinsiInterface;
    kabupaten_id: KotaInterface;
    kecamatan_id: KecamatanInterface;
    kelurahan_id?: KelurahanInterface;
  };
};

export default Props;
