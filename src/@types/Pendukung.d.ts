import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from './DaerahIndonesia';

export interface DPTInterface {
  id: number;
  nik: string | number;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: 'L' | 'P';
  propinsi_id: number;
  propinsi?: ProvinsiInterface;
  kabupaten_id: number;
  kabupaten?: KotaInterface;
  kecamatan_id: number;
  kecamatan?: KecamatanInterface;
  kelurahan_id: number | string;
  kelurahan?: KelurahanInterface;
  tps: number;
  rw: number;
  rt: number;
  alamat: string;
  is_pendukung: 0 | 1;
  agama?: string;
  suku?: string;
  keterangan?: string;
  referal_relawan?: string;
  no_hp?: number;
  no_hp_lainnya?: number;
  email?: string;
  foto?: string;
  foto_ktp?: string;
  dapil?: number;
}
