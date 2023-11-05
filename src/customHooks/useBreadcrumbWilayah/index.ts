import { useState } from 'react';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from '../../@types/DaerahIndonesia';

interface Option {
  koordinator?: boolean;
}

export const useBreadcrumbWilayah = () => {
  const [tingkatKoordinator, setTingkatKoorinator] = useState<
    'propinsi' | 'kabupaten' | 'kecamatan' | 'kelurahan' | 'rt/rw'
  >('propinsi');
  const [bcWilayah, setBcWilayah] = useState<{
    propinsi_id: ProvinsiInterface;
    kabupaten_id: KotaInterface;
    kecamatan_id: KecamatanInterface;
    kelurahan_id: KelurahanInterface;
    rt: string | number;
    rw: string | number;
  }>({
    propinsi_id: {
      id: '',
      name: ''
    },
    kabupaten_id: {
      id: '',
      id_provinsi: '',
      name: ''
    },
    kecamatan_id: {
      id: '',
      id_kota: '',
      name: ''
    },
    kelurahan_id: {
      id: '',
      id_kecamatan: '',
      name: ''
    },
    rt: '',
    rw: ''
  });

  const resetBcWilayah = (
    category:
      | 'all'
      | 'provinsi'
      | 'kabupaten'
      | 'kecamatan'
      | 'kelurahan'
      | 'rt/rw'
  ) => {
    if (category === 'all') {
      setTingkatKoorinator('propinsi');
      return setBcWilayah({
        propinsi_id: {
          id: '',
          name: ''
        },
        kabupaten_id: {
          id: '',
          id_provinsi: '',
          name: ''
        },
        kecamatan_id: {
          id: '',
          id_kota: '',
          name: ''
        },
        kelurahan_id: {
          id: '',
          id_kecamatan: '',
          name: ''
        },
        rt: '',
        rw: ''
      });
    }

    if (category === 'provinsi') {
      setTingkatKoorinator('kabupaten');
      return setBcWilayah({
        ...bcWilayah,
        kabupaten_id: {
          id: '',
          id_provinsi: '',
          name: ''
        },
        kecamatan_id: {
          id: '',
          id_kota: '',
          name: ''
        },
        kelurahan_id: {
          id: '',
          id_kecamatan: '',
          name: ''
        },
        rt: '',
        rw: ''
      });
    }

    if (category === 'kabupaten') {
      setTingkatKoorinator('kecamatan');
      return setBcWilayah({
        ...bcWilayah,
        kecamatan_id: {
          id: '',
          id_kota: '',
          name: ''
        },
        kelurahan_id: {
          id: '',
          id_kecamatan: '',
          name: ''
        },
        rt: '',
        rw: ''
      });
    }

    if (category === 'kecamatan') {
      setTingkatKoorinator('kelurahan');
      return setBcWilayah({
        ...bcWilayah,
        kelurahan_id: {
          id: '',
          id_kecamatan: '',
          name: ''
        },
        rt: '',
        rw: ''
      });
    }

    if (category === 'rt/rw') {
      setTingkatKoorinator('rt/rw');
      return setBcWilayah({
        ...bcWilayah,
        rt: '',
        rw: ''
      });
    }
  };

  return {
    bcWilayah,
    setBcWilayah,
    resetBcWilayah,
    tingkatKoordinator,
    setTingkatKoorinator
  };
};
