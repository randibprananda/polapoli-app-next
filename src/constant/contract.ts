export const LIST_ROLE = [
  {
    id: 1,
    name: 'Project Manager'
  },
  {
    id: 2,
    name: 'Konsultan'
  },
  {
    id: 3,
    name: 'Koordinator'
  },
  {
    id: 4,
    name: 'Relawan'
  },
  {
    id: 5,
    name: 'Saksi'
  }
];

export enum ROLE {
  ProjectManager = 1,
  Konsultan = 2,
  Koordinator = 3,
  Relawan = 4,
  Saksi = 5
}

export enum ADD_ON {
  Donasi = 'donasi',
  Geolocation = 'geolocation',
  MobileApp = 'mobile',
  OCR = 'ocr',
  Survey = 'survey'
}

export enum PERMISSION {
  buat_tim_relawan = 1,
  pembelian_akun_premium = 2,
  status_pembayaran_tim_relawan = 3,
  crud_data_tps = 4,
  import_data_tps = 5,
  crud_data_jumlah_dpt = 6,
  import_data_jumlah_dpt = 7,
  crud_data_paslon = 8,
  crud_donasi = 9,
  riwayat_hasil_donasi = 10,
  crud_alokasi_dana = 11,
  create_request_wd_donasi = 12,
  pemberian_donasi = 13,
  crud_koordinator = 14,
  daftar_koordinator_under_koordinator = 15,
  daftar_relawan_under_koordinator = 16,
  daftar_saksi_under_koordinator = 17,
  log_aktifitas_koordinator = 18,
  crud_relawan = 19,
  riwayat_kunjungan_relawan = 20,
  geolocation_heatmap_kunjungan_relawan = 21,
  riwayat_pendistribusian_logistik = 22,
  log_aktifitas_relawan = 23,
  crud_saksi = 24,
  lokasi_tps_under_saksi = 25,
  hasil_quick_count = 26,
  hasil_real_count = 27,
  log_aktifitas_saksi = 28,
  crud_data_dpt = 29,
  crud_data_pemilih_pendukung = 30,
  data_simulasi_kemenangan = 31,
  perhitungan_simulasi = 32,
  manajemen_logistik = 33,
  manajemen_pemesanan_logistik = 34,
  manajemen_penerimaan_logistik = 35,
  manajemen_pengeluaran_logistik = 36,
  crud_feed = 37,
  read_share_feed = 38,
  crud_data_isu = 39,
  verifikasi_data_isu = 40,
  rekapitulasi_koordinator = 41,
  rekapitulasi_relawan = 42,
  rekapitulasi_saksi = 43,
  rekapitulasi_pemilih = 44,
  crud_survey = 45,
  crud_pertanyaan = 46,
  input_jawaban_survey = 47,
  hasil_survey = 48,
  geolocation = 49,
  perhitungan_quick_count = 50,
  hasil_perhitungan_quick_count = 51,
  perhitungan_real_count = 52,
  hasil_perhitungan_real_count = 53,
  crud_user_konsultan = 54, // mulai lagi
  crud_role = 55,
  manajemen_permission = 56,
  pengaturan_gaji = 57,
  tambah_background = 58,
  info_calon = 59,
  slug_halaman_profil_kemenangan = 60,
  crud_parpol = 61,
  tambah_visi_paslon = 62,
  crud_misi_paslon = 63,
  crud_program_kerja = 64,
  crud_galeri_paslon = 65,
  crud_contact = 66,
  crud_social_media = 67,
  view_halaman_kemenangan = 68,
  ubah_profil = 69,
  ubah_password = 70,
  ubah_foto = 71,
  ubah_nama_tim = 72,
  timeline_pilkada = 73,
  link_youtube_sambutan_paslon = 74
}
