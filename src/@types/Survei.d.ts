import { TimRelawanInterface } from './DataMaster';
import { UserInterface } from './User';

export interface SurveiInterface {
  id: number;
  tim_relawan_id: number;
  created_by: number;
  judul_survey: string;
  tingkat_survei: string;
  propinsi_id: number;
  kabupaten_id: number;
  kecamatan_id: number;
  kelurahan_id: number;
  dapil: dapil1;
  target_responden: number;
  pembukaan_survey: string;
  penutupan_survey: string;
  status: string;
  created_at: string;
  updated_at: string;
  field_forms_count: number;
  total_answer: number | string;
  propinsi?: ProvinsiInterface;
  kabupaten?: KotaInterface;
  kecamatan?: KecamatanInterface;
  kelurahan: KelurahanInterface;
  dapil?: string;
}

export interface PertanyaanInterface {
  id: number;
  form_survey_id: number;
  tipe: 'PILIHAN GANDA' | 'TEXT' | 'CHECKLIST' | 'GAMBAR';
  label_inputan: string;
  option: string;
}

export interface LolaAnswerInterface {
  created_at: string;
  field_form: PertanyaanInterface;
  field_form_id: number;
  form_survey_id: number;
  id: number;
  jawaban: string;
  lo_la_id: number;
  updated_at: string;
}

export interface HasilSurveiInterface {
  alamat: string;
  created_at: string;
  form_survey: { id: number; judul_survey: string };
  form_survey_id: number;
  id: number;
  lola_form_answers: any[];
  longitude_latitude: string;
  nama_responden: string;
  updated_at: string;
  user_id: number;
}

export interface JadwalKunjunganRelawanInterface {
  id: number;
  jenis_survey: string;
  user_id: number;
  jadwal_kunjungan: string;
  keterangan: string;
  created_at: string;
  tim_relawan: TimRelawanInterface;
  propinsi_id: number;
  kabupaten_id: number;
  kecamatan_id: number;
  kelurahan_id: number;
  propinsi: ProvinsiInterface;
  kabupaten: KotaInterface;
  kelurahan: KelurahanInterface;
  kecamatan: KecamatanInterface;
  user: UserInterface;
  rw: number;
  rt: number;
}
