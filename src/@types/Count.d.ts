import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from './DaerahIndonesia';
import {
  CalonAnggotaInterface,
  PaslonInterface,
  TimRelawanInterface
} from './DataMaster';
import { PartaiInterface } from './Partai';
import { UserInterface } from './User';

export interface RespondenInterface {
  id: number;
  tim_relawan_id: number;
  metode_pengambilan: string;
  propinsi_id: number;
  kabupaten_id: number;
  kecamatan_id: number;
  kelurahan_id: number;
  tps: string;
  nama_responden: string;
  nik: string;
  usia: string;
  no_hp: string;
  no_hp_lain: string;
  keterangan: string;
  relawan_id: number;
  kandidat_pilihan_id: number;
  bukti: string;
  created_at: string;
  relawan: UserInterface;
  kandidat_pilihan: PaslonInterface;
  tim_relawan: TimRelawanInterface;
  propinsi: ProvinsiInterface;
  kabupaten: KotaInterface;
  kecamatan: KecamatanInterface;
  kelurahan: KelurahanInterface;
  kandidat_calon_anggota_id?: number;
  kandidat_calon_anggota?: CalonAnggotaInterface;
  kandidat_partai_id?: number;
  kandidat_partai?: PartaiInterface;
}
