export interface ProvinsiInterface {
  id: number | string;
  name: string;
}

export interface KotaInterface {
  id: number | string;
  id_provinsi: string;
  name: string;
}

export interface KecamatanInterface {
  id: number | string;
  id_kota: string;
  name: string;
}

export interface KelurahanInterface {
  id: number | string;
  id_kecamatan: string;
  name: string;
}

export interface WilayahInterface {
  provinsi: number | string | null;
  kecamatan: number | string | null;
  kota: number | string | null;
  kelurahan: number | string | null;
}
