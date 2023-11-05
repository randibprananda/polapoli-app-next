import { PartaiInterface } from './Partai';

export interface TPSInterface {
  id: number;
  propinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  jumlah_tps: number;
  keterangan: any;
}

export interface PaslonInterface {
  id: number;
  tim_relawan_id: number;
  nomor_urut: string;
  nama_paslon: string;
  nama_wakil_paslon: string;
  paslon_profile_photo: strict;
  jenis_pencalonan: string;
  is_usung: number;
}

export interface JenisPencalonanInterface {
  id: number;
  nama_jenis_pencalonan: string;
}

export interface TimRelawanInterface {
  id: number;
  nama_tim_relawan: string;
  photo_tim_relawan: string;
}

export interface CalonAnggotaInterface {
  id: number;
  no_urut: string | number;
  nama_calon: string;
  foto: strict;
  jenis_pencalonan: string;
  is_usung: number;
  keterangan?: string;
  partai: PartaiInterface;
}
