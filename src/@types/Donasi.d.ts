import { UserInterface } from './User';

export interface DonasiDonorInterface {
  donation_id: number;
  external_id: string;
  payment_channel: string;
  status: string;
  amount: string;
  email: string;
  name: string;
  message: string;
}

export interface DonasiInterface {
  id: number;
  created_by: UserInterface;
  donation_image: string;
  donation_title: string;
  donation_description: string;
  is_target: number;
  is_batas: number;
  total_amount: string;
  target_amount: string;
  batas_akhir: string;
  is_close: number;
  fluktuatif_penarikan_amount?: string;
  fluktuatif_alokasi_amount?: string;
  donation_donors?: DonasiDonorInterfacep[];
}

export interface AlokasiDonasiInterface {
  donation_id: number;
  bukti_alokasi: string;
  nominal: string;
  keterangan: string;
  created_at: string;
  id: any;
}

export interface PenarikanDonasiInterface {
  donation_id: number;
  external_id: string;
  status: string;
  amount: string;
  account_number: string;
  bank_code: string;
  created_at: string;
}

export interface VirtualAccountInterface {
  code: string;
  is_activated: boolean;
  name: string;
}
