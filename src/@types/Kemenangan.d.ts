import { JenisPencalonanInterface } from './DataMaster';

export interface BackgroundInterface {
  backgroundSrc?: string;
}

export interface FotoCalonInterface {
  foto_calon?: string | null;
}

export interface InfoCalonInterface {
  paslon_name?: string | null;
  paslon_number?: number | null;
  jenis_pencalonan?: number | null;
  tentang_paslon?: {
    paslon_id?: number;
    background?: string | null;
    tema_warna?: string | null;
    slogan?: string | null;
    motto?: string | null;
    link?: string | null;
    visi?: string | null;
    proker_paslons?: any[] | null;
    misi_paslons?: any[] | null;
    parpol_paslons?: any[] | null;
  };
}

export interface KodeWarnaInterface {
  tema_warna?: string | any;
}

export interface KontakInterface {
  alamat?: string | null;
  email?: string | null;
  telepon?: number | null;
  whatsapp?: number | null;
}

export interface SocialMedinaInterface {
  instagram?: string | null;
  url_instagram?: string | null;
  facebook?: string | null;
  url_facebook?: string | null;
  youtube?: string | null;
  url_youtube?: string | null;
  twitter?: string | null;
  url_twitter?: string | null;
  tiktok?: string | null;
  url_tiktok?: string | null;
  linkedin?: string | null;
  url_linkedin?: string | null;
}

export interface ThemeInterface {
  color: string;
}

export interface MisiInterface {
  misi_paslons?: any[] | null;
}

export interface ProkerInterface {
  proker_paslons?: any[] | null;
}

export interface VisiInterface {
  visi?: string | null;
}

export interface GaleriInterface {
  id: number;
  foto_galeri_paslon: string;
  keterangan: string;
}

export interface ParpolInterface {
  id: number;
  foto_parpol: string;
  nama_parpol: string;
}

export interface PeriodeInterface {
  id?: number;
  description: string;
  start: any;
  end: any;
}

export interface PengalamanKerjaInterface {
  id: number;
  name: string;
  detail_pengalaman: PeriodeInterface[];
}
