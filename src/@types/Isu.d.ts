import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from './DaerahIndonesia';

export interface IsuInterface {
  id: number;
  jenis_isu_id: 1 | 2;
  dampak_isu: 'Negatif' | 'Positif';
  tanggal_isu: string;
  keterangan_isu: string;
  nama_pelapor: string;
  propinsi_id: number;
  judul_isu: string;
  url_isu: string;
  kabupaten_id: number;
  kelurahan_id: number;
  kecamatan_id: number;
  propinsi: ProvinsiInterface;
  kabupaten: KotaInterface;
  kelurahan: KelurahanInterface;
  kecamatan: KecamatanInterface;
  kind_of_issue: JenisIsuInterface;
  dapil?: number | string;
  tanggapan_isu: string;
  ditanggapi_pada: string;
  is_abaikan: 0 | 1;
  foto_isu: any;
}

export interface JenisIsuInterface {
  id: number;
  nama_jenis_isu: string;
}
