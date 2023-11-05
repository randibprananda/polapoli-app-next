export const JENIS_PENCALONAN_NON_LEGISLATIF = [
  'Calon Presiden dan Wakil Presiden',
  'Calon Gubernur dan Wakil Gubernur',
  'Lainnya'
];

export const JENIS_PENCALONAN_LEGISLATIF = [
  'DPRD Pusat',
  'DPRD Provinsi',
  'DPRD Kota/Kabupaten',
  'DPD'
];

export const JENIS_PENCALONAN = [
  'Calon Presiden dan Wakil Presiden',
  'Calon Gubernur dan Wakil Gubernur',
  'DPRD Pusat',
  'DPRD Provinsi',
  'DPRD Kota/Kabupaten',
  'DPD',
  'Lainnya'
];

export const JENIS_KELAMIN = [
  {
    key: 'L',
    value: 'Laki-laki'
  },
  {
    key: 'P',
    value: 'Perempuan'
  }
];

export const AGAMA_DI_INDONESIA = [
  'islam',
  'kristen',
  'katholik',
  'hindu',
  'budha',
  'konghucu'
];

export const TINGKAT_KOORDINATOR = [
  {
    key: 'propinsi',
    label: 'Provinsi'
  },
  {
    key: 'kabupaten',
    label: 'Kota/Kabupaten'
  },
  {
    key: 'kecamatan',
    label: 'Kecamatan'
  },
  {
    key: 'kelurahan',
    label: 'Kelurahan/Desa'
  },
  {
    key: 'rt/rw',
    label: 'RT/RW'
  }
];

export const DAMPAK_ISU = ['Netral', 'Positif', 'Negatif'];

export const METODE_PENGAMBILAN_COUNT = ['Tatap Muka', 'Telepon'];

export const TINGKAT_SURVEI = [
  'Provinsi',
  'Kota/Kab',
  'Kecamatan',
  'Kelurahan',
  'Dapil'
];

export const TINGKAT_KOORDINATOR_INDEX = [
  'Provinsi',
  'Kota/Kab',
  'Kecamatan',
  'Kelurahan',
  'RT/RW'
];

export const TIPE_SOAL_JAWABAN = [
  {
    key: 'TEXT',
    value: 'Teks'
  },
  {
    key: 'PILIHAN GANDA',
    value: 'Pilihan Ganda'
  },
  {
    key: 'CHECKLIST',
    value: 'Checklist'
  },
  {
    key: 'GAMBAR',
    value: 'Gambar'
  }
];

export const OBJ_TIPE_SOAL_JAWABAN = {
  text: 'TEXT',
  pilihanGanda: 'PILIHAN GANDA',
  checklist: 'CHECKLIST',
  gambar: 'GAMBAR',
  number: 'NUMBER'
};

export const STATUS_SURVEI = {
  draft: 'draft',
  publish: 'publish'
};

export enum STATUS_GEOLOCATION {
  BrowserNotSupport = 'Browser Not Support',
  Grant = 'Grant',
  Block = 'Block'
}

export enum GOOGLE_MAP_TYPE {
  Pin = 'PIN',
  Heatmap = 'HEATMAP'
}

export enum STATUS_PAYMENT {
  Pending = 'PENDING',
  Claimed = 'APPROVED',
  Rejected = 'REJECTED'
}

export const VISUALIZATION_MAP: any[] = ['visualization'];

export const METODE_GAJI = [
  'Per Periode',
  'Per Bulan',
  'Per Minggu',
  'Per Responden'
];

export enum SOCIAL_MEDIA_TYPE {
  Instagram = 'instagram',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Youtube = 'youtube',
  Tiktok = 'tiktok'
}

export const TIPE_SURVEI = ['educate', 'survei'];

export const JENIS_PENCALONAN_TIM = ['legislatif', 'eksekutif'];

export enum JENIS_SURVEY {
  All = 'all',
  Survei = 'survei',
  Educate = 'educate'
}
