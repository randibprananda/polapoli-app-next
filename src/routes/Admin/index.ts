import {
  Activity,
  Bag,
  Category,
  Folder,
  Send,
  TwoUsers,
  User,
  Wallet,
  Document,
  People,
  Paper,
  Star,
  Chart,
  Setting,
  Graph
} from 'react-iconly';
import { ADD_ON, PERMISSION } from '../../constant/contract';

const AdminRoutes = [
  {
    superParent: true,
    name: 'Menu'
  },
  {
    path: '/',
    icon: Category,
    name: 'Dashboard',
    miniName: 'D',
    layout: '/admin/dashboard'
  },
  {
    collapse: true,
    name: 'Master Data',
    icon: Folder,
    views: [
      {
        path: '/tps',
        name: 'Data TPS',
        miniName: 'T',
        layout: '/admin/master-data',
        permission: PERMISSION.crud_data_tps
      },
      {
        path: '/jumlah-dpt',
        name: 'Data Jumlah DPT',
        miniName: 'DPT',
        layout: '/admin/master-data',
        permission: PERMISSION.crud_data_jumlah_dpt
      }
    ]
  },
  {
    path: '/',
    icon: TwoUsers,
    name: 'Pasangan Calon',
    miniName: 'PC',
    layout: '/admin/pasangan-calon',
    permission: PERMISSION.crud_data_paslon,
    isLegislatif: 0
  },
  {
    path: '/',
    icon: User,
    name: 'Calon Anggota',
    miniName: 'PC',
    layout: '/admin/calon-anggota',
    permission: PERMISSION.crud_data_paslon,
    isLegislatif: 1
  },
  {
    path: '/',
    icon: People,
    name: 'Partai',
    miniName: 'P',
    layout: '/admin/partai',
    permission: PERMISSION.crud_data_paslon,
    isLegislatif: 1
  },
  {
    path: '/',
    icon: Wallet,
    name: 'Donasi',
    miniName: 'F',
    layout: '/admin/donasi',
    permission: PERMISSION.crud_donasi,
    addOn: ADD_ON.Donasi
  },
  {
    collapse: true,
    icon: People,
    name: 'Koordinator',
    views: [
      {
        path: '/',
        miniName: 'DP',
        name: 'List Koordinator',
        layout: '/admin/koordinator',
        permission: PERMISSION.crud_koordinator
      },
      {
        path: '/jadwal-kunjungan-relawan',
        name: 'Pembagian Rute Relawan',
        miniName: 'PR',
        layout: '/admin/koordinator',
        permission: PERMISSION.crud_koordinator
      }
    ]
  },
  {
    collapse: true,
    icon: People,
    name: 'Relawan',
    views: [
      {
        path: '/list-relawan',
        name: 'List Relawan',
        miniName: 'LR',
        layout: '/admin/relawan',
        permission: PERMISSION.crud_relawan
      },
      {
        path: '/riwayat-kunjungan',
        name: 'Riwayat Kunjungan',
        miniName: 'PM',
        layout: '/admin/relawan',
        permission: PERMISSION.riwayat_kunjungan_relawan
      },
      {
        path: '/rute-harian',
        name: 'Rute Harian',
        miniName: 'RH',
        layout: '/admin/relawan',
        permission: PERMISSION.riwayat_kunjungan_relawan
      }
    ]
  },
  {
    path: '/',
    icon: People,
    name: 'Saksi',
    miniName: 'S',
    layout: '/admin/saksi',
    permission: PERMISSION.crud_saksi
  },
  {
    path: '/',
    icon: Send,
    name: 'Feed',
    miniName: 'F',
    layout: '/admin/feed',
    permission: PERMISSION.crud_feed
  },
  {
    path: '/',
    icon: People,
    name: 'Data DPT',
    miniName: 'DT',
    layout: '/admin/data-dpt',
    permission: PERMISSION.crud_data_dpt
  },
  {
    path: '/',
    icon: People,
    name: 'Data Pemilih',
    miniName: 'DP',
    layout: '/admin/data-pemilih',
    permission: PERMISSION.crud_data_pemilih_pendukung
  },
  {
    path: '/',
    icon: Star,
    name: 'Kemenangan',
    miniName: 'K',
    layout: '/admin/simulasi-kemenangan',
    permission: PERMISSION.data_simulasi_kemenangan
  },
  {
    path: '/',
    icon: Activity,
    name: 'Monitoring Isu',
    miniName: 'MI',
    layout: '/admin/monitoring-isu',
    permission: PERMISSION.crud_data_isu
  },
  {
    collapse: true,
    icon: Bag,
    name: 'Logistik',
    views: [
      {
        path: '/stok',
        name: 'Daftar Stok Barang',
        miniName: 'SB',
        layout: '/admin/logistik',
        permission: PERMISSION.manajemen_logistik
      },
      {
        path: '/pemesanan',
        name: 'Pemesanan Barang',
        miniName: 'PM',
        layout: '/admin/logistik',
        permission: PERMISSION.manajemen_pemesanan_logistik
      },
      {
        path: '/penerimaan',
        name: 'Penerimaan Barang',
        miniName: 'PR',
        layout: '/admin/logistik',
        permission: PERMISSION.manajemen_penerimaan_logistik
      },
      {
        path: '/pengeluaran',
        name: 'Pengeluaran Barang',
        miniName: 'PL',
        layout: '/admin/logistik',
        permission: PERMISSION.manajemen_pengeluaran_logistik
      }
    ]
  },
  {
    superParent: true,
    name: 'PolaPoli'
  },
  {
    collapse: true,
    icon: Paper,
    name: 'Rekapitulasi',
    views: [
      {
        path: '/koordinator',
        name: 'Koordinator',
        miniName: 'RK',
        layout: '/admin/rekapitulasi',
        permission: PERMISSION.rekapitulasi_koordinator
      },
      {
        path: '/relawan',
        name: 'Relawan',
        miniName: 'RR',
        layout: '/admin/rekapitulasi',
        permission: PERMISSION.rekapitulasi_relawan
      },
      {
        path: '/saksi',
        name: 'Saksi',
        miniName: 'RS',
        layout: '/admin/rekapitulasi',
        permission: PERMISSION.rekapitulasi_saksi
      },
      {
        path: '/pemilih-pendukung',
        name: 'Pemilih/Pendukung',
        miniName: 'RP',
        layout: '/admin/rekapitulasi',
        permission: PERMISSION.rekapitulasi_pemilih
      },
      {
        path: '/dpt',
        name: 'DPT',
        miniName: 'RD',
        layout: '/admin/rekapitulasi',
        permission: PERMISSION.rekapitulasi_pemilih
      },
      {
        path: '/dpt-manual',
        name: 'DPT Manual',
        miniName: 'RD',
        layout: '/admin/rekapitulasi',
        permission: PERMISSION.rekapitulasi_pemilih
      },
      {
        path: '/tps',
        name: 'TPS',
        miniName: 'RT',
        layout: '/admin/rekapitulasi',
        permission: PERMISSION.rekapitulasi_pemilih
      }
    ]
  },
  {
    collapse: true,
    icon: Graph,
    name: 'Survei',
    path: '/',
    miniName: 'F',
    layout: '/admin/survei',
    permission: PERMISSION.crud_survey,
    addOn: ADD_ON.Survey,
    views: [
      {
        name: 'Educate',
        path: '/educate',
        miniName: 'F',
        layout: '/admin/survei',
        permission: PERMISSION.crud_survey
      },
      {
        name: 'Survei',
        path: '/',
        miniName: 'F',
        layout: '/admin/survei',
        permission: PERMISSION.crud_survey
      }
    ]
  },
  {
    collapse: true,
    icon: Chart,
    name: 'Quick Count',
    views: [
      {
        path: '/input-data',
        name: 'Input Data',
        miniName: 'IQ',
        layout: '/admin/quick-count',
        permission: PERMISSION.perhitungan_quick_count
      },
      {
        path: '/hasil',
        name: 'Hasil Quick Count',
        miniName: 'HQ',
        layout: '/admin/quick-count',
        permission: PERMISSION.hasil_perhitungan_quick_count
      }
    ]
  },
  {
    collapse: true,
    icon: Chart,
    name: 'Real Count',
    views: [
      {
        path: '/input-data',
        name: 'Input Data',
        miniName: 'IR',
        layout: '/admin/real-count',
        permission: PERMISSION.perhitungan_real_count
      },
      {
        path: '/hasil',
        name: 'Hasil Real Count',
        miniName: 'HR',
        layout: '/admin/real-count',
        permission: PERMISSION.hasil_perhitungan_real_count
      }
    ]
  },
  {
    superParent: true,
    name: 'Pengaturan'
  },
  {
    collapse: true,
    icon: User,
    name: 'User & Hak Akses',
    views: [
      {
        path: '/',
        name: 'Admin & Konsultan',
        miniName: 'U',
        layout: '/admin/user',
        permission: PERMISSION.crud_user_konsultan
      },
      {
        path: '/',
        name: 'Role',
        miniName: 'R',
        layout: '/admin/role',
        permission: PERMISSION.crud_role
      }
    ]
  },
  {
    path: '/',
    icon: Document,
    name: 'Web Kemenangan',
    miniName: 'WK',
    layout: '/admin/web-kemenangan',
    permission: PERMISSION.view_halaman_kemenangan
  },
  {
    path: '/',
    icon: Setting,
    name: 'Pengaturan Tim',
    miniName: 'PT',
    layout: '/admin/pengaturan-tim',
    permission: PERMISSION.ubah_nama_tim
  }
];

export default AdminRoutes;
