import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface
} from './DaerahIndonesia';

export interface StokLogistikInterface {
  id: number;
  nama_barang: string;
  harga_satuan: string;
  nama_satuan: string;
  stok_awal: number;
  stok_akhir: number;
  pemesanan_barangs: PemesananLogistikInterface[];
  propinsi_id: number;
  kabupaten_id: number;
  kecamatan_id: number;
  kelurahan_id: number;
  propinsi: ProvinsiInterface;
  kabupaten: KotaInterface;
  kelurahan: KelurahanInterface;
  kecamatan: KecamatanInterface;
  rt: number;
  rw: number;
  dapil: number;
}

export interface PemesananLogistikInterface {
  id: number;
  stok_barang_id: number;
  jumlah_pesanan: number;
  jumlah_diterima: number;
  sisa_pesanan: number;
  estimasi_harga_total: number;
  stok_barang: StokLogistikInterface;
  keterangan: string;
  created_at: string;
  propinsi_id: number;
  kabupaten_id: number;
  kecamatan_id: number;
  kelurahan_id: number;
  propinsi: ProvinsiInterface;
  kabupaten: KotaInterface;
  kelurahan: KelurahanInterface;
  kecamatan: KecamatanInterface;
  rt: number;
  rw: number;
  dapil: number;
  penerimaan_barangs: [];
}

export interface PenerimaanLogistikInterface {
  id: number;
  pemesanan_barang_id: number;
  stok_barang_id: number;
  jumlah_diterima: number;
  keterangan: string;
  created_at: string;
  stok_barang: StokLogistikInterface;
}

export interface PengeluaranLogistikInterface {
  id: number;
  propinsi_id: number;
  kabupaten_id: number;
  kecamatan_id: number;
  kelurahan_id: number;
  stok_barang_id: number;
  jumlah_pengeluaran: number;
  keterangan: string;
  stok_barang: StokLogistikInterface;
}
