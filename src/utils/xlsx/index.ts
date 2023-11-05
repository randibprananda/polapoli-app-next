import { PaslonInterface } from '../../@types/DataMaster';
import { PartaiInterface } from '../../@types/Partai';
import { DPTInterface } from '../../@types/Pendukung';
import {
  HasilSurveiInterface,
  LolaAnswerInterface,
  PertanyaanInterface
} from '../../@types/Survei';
import { objectToArray } from '../handleObject';
import { dateFormat } from '../stringFormat';

export function generateDataToExportRekapitulasi(
  data: any,
  type:
    | 'dpt'
    | 'dpt-manual'
    | 'tps'
    | 'koordinator'
    | 'relawan'
    | 'saksi'
    | 'pemilih-pendukung'
) {
  if (data && data.data.length !== 0) {
    return data?.data.map((item: any) => {
      const objWilayah: any = {};
      if (item.propinsi) {
        objWilayah['Provinsi'] = item.propinsi.name;
      }

      if (item.kabupaten) {
        objWilayah['Kota/Kabupaten'] = item.kabupaten.name;
      }

      if (item.kecamatan) {
        objWilayah['Kecamatan'] = item.kecamatan.name;
      }

      if (item.kelurahan) {
        objWilayah['Kelurahan'] = item.kelurahan?.name
          ? item.kelurahan.name
          : item.kelurahan;

        if (item.rt) {
          objWilayah['RT'] = item.rt;
        }
      }

      if (
        type === 'koordinator' ||
        type === 'relawan' ||
        type === 'saksi' ||
        type === 'pemilih-pendukung' ||
        type === 'dpt'
      ) {
        return {
          ...objWilayah,
          'Laki-laki': item.laki_laki,
          Perempuan: item.perempuan,
          Total: item.total
        };
      }

      if (type === 'tps') {
        return {
          ...objWilayah,
          'Jumlah TPS': item.total_tps
        };
      }

      if (type === 'dpt-manual') {
        return {
          ...objWilayah,
          'Laki-laki': item.l,
          Perempuan: item.p,
          Total: item.total
        };
      }
    });
  }

  return null;
}

export const generateDataToExportResultSurvey = (data: any) => {
  if (data && data.length !== 0) {
    return data.map((item: HasilSurveiInterface) => {
      const soaljawaban: any = {};
      item.lola_form_answers.forEach(
        (jawaban: LolaAnswerInterface) =>
          (soaljawaban[jawaban.field_form.label_inputan] = jawaban.jawaban)
      );
      return {
        'Nama Responden': item.nama_responden,
        Alamat: item.alamat,
        Waktu: dateFormat(item.created_at),
        ...soaljawaban
      };
    });
  }

  return null;
};

export const generateDataToExportRealCount = (
  realCountData: any,
  paslonData: any
) => {
  if (realCountData && realCountData.length !== 0) {
    const recap = objectToArray(realCountData).map((record: any) => {
      const tempObj: any = {};

      objectToArray(record).forEach((countData: any) => {
        if (countData.propinsi) {
          tempObj['Provinsi'] = countData.propinsi_name;
        }

        if (countData.kabupaten) {
          tempObj['Kota/Kabupaten'] = countData.kabupaten_name;
        }

        if (countData.kecamatan) {
          tempObj['Kecamatan'] = countData.kecamatan_name;
        }

        if (countData.kelurahan) {
          tempObj['Kelurahan'] = countData.kelurahan_name;
        }
        if (countData.nomor_tps) {
          tempObj['TPS'] = countData.nomor_tps[0];
        }

        paslonData?.data.data.forEach((paslon: PaslonInterface) => {
          if (countData.paslon_id === paslon.id) {
            tempObj[`Paslon ${paslon.nomor_urut}`] = countData.total_per_paslon;
          }
        });
      });

      return {
        ...tempObj,
        Total: objectToArray(tempObj)?.reduce(
          (acc: any, curr: any) =>
            typeof curr === 'number' ? acc + curr : acc + 0,
          0
        )
      };
    });

    return recap;
  }

  return null;
};

export const generateDataToExportRealCountPartai = (
  realCountData: any,
  partaiData: any
) => {
  if (realCountData && realCountData.length !== 0) {
    const recap = objectToArray(realCountData).map((record: any) => {
      const tempObj: any = {};

      objectToArray(record).forEach((countData: any) => {
        if (countData.propinsi) {
          tempObj['Provinsi'] = countData.propinsi_name;
        }

        if (countData.kabupaten) {
          tempObj['Kota/Kabupaten'] = countData.kabupaten_name;
        }

        if (countData.kecamatan) {
          tempObj['Kecamatan'] = countData.kecamatan_name;
        }

        if (countData.kelurahan) {
          tempObj['Kelurahan'] = countData.kelurahan_name;
        }
        if (countData.nomor_tps) {
          tempObj['TPS'] = countData.nomor_tps[0];
        }

        partaiData?.data.data.forEach((partai: PartaiInterface) => {
          if (countData.partai_id === partai.id) {
            tempObj[`${partai.nama_partai}`] = countData.total_per_partai;
          }
        });
      });

      return {
        ...tempObj,
        Total: objectToArray(tempObj)?.reduce(
          (acc: any, curr: any) =>
            typeof curr === 'number' ? acc + curr : acc + 0,
          0
        )
      };
    });

    return recap;
  }

  return null;
};

export const generateDataToExportQuickCount = (
  quickCountData: any,
  paslonData: any
) => {
  if (
    quickCountData &&
    paslonData &&
    objectToArray(quickCountData).length !== 0
  ) {
    const recap = objectToArray(quickCountData)?.map((record: any) => {
      const tempObj: any = {};

      paslonData?.data?.data.forEach((paslon: PaslonInterface) => {
        record?.paslon?.forEach((recordPaslon: any) => {
          if (recordPaslon.propinsi) {
            tempObj['Provinsi'] = recordPaslon.propinsi.name;
          }

          if (recordPaslon.kabupaten) {
            tempObj['Kota/Kabupaten'] = recordPaslon.kabupaten.name;
          }

          if (recordPaslon.kecamatan) {
            tempObj['Kecamatan'] = recordPaslon.kecamatan.name;
          }

          if (recordPaslon.kelurahan) {
            tempObj['Kelurahan'] = recordPaslon.kelurahan?.name
              ? recordPaslon.kelurahan.name
              : recordPaslon.kelurahan;
          }

          if (recordPaslon.tps) {
            tempObj['TPS'] = recordPaslon.tps;
          }

          if (recordPaslon.kandidat_pilihan_id === paslon.id) {
            tempObj[`Paslon ${paslon.nomor_urut}`] =
              recordPaslon.total_kandidat;
          } else {
            tempObj[`Paslon ${paslon.nomor_urut}`] = 0;
          }
        });
      });

      tempObj['Total'] = record.total;

      return tempObj;
    });

    return recap;
  }

  return null;
};

export const generateDataToExportQuickCountPartai = (
  quickCountData: any,
  partaiData: any
) => {
  if (
    quickCountData &&
    partaiData &&
    objectToArray(quickCountData).length !== 0
  ) {
    const recap = objectToArray(quickCountData)?.map((record: any) => {
      const tempObj: any = {};

      partaiData?.data?.data.forEach((partai: PartaiInterface) => {
        record?.paslon?.forEach((recordItem: any) => {
          if (recordItem.propinsi) {
            tempObj['Provinsi'] = recordItem.propinsi.name;
          }

          if (recordItem.kabupaten) {
            tempObj['Kota/Kabupaten'] = recordItem.kabupaten.name;
          }

          if (recordItem.kecamatan) {
            tempObj['Kecamatan'] = recordItem.kecamatan.name;
          }

          if (recordItem.kelurahan) {
            tempObj['Kelurahan'] = recordItem.kelurahan?.name
              ? recordItem.kelurahan.name
              : recordItem.kelurahan;
          }

          if (recordItem.tps) {
            tempObj['TPS'] = recordItem.tps;
          }

          if (recordItem.kandidat_partai_id === partai.id) {
            tempObj[`${partai.nama_partai}`] = recordItem.total_partai;
          } else {
            tempObj[`${partai.nama_partai}`] = 0;
          }
        });
      });

      tempObj['Total'] = record.total;

      return tempObj;
    });

    return recap;
  }

  return null;
};

export const generateDataToExportDataDPT = (
  data: DPTInterface[],
  isDapil: boolean
) => {
  if (data?.length !== 0) {
    const recap = data?.map((record: DPTInterface) => {
      const tempObj: any = {};
      tempObj['NIK'] = record.nik;
      tempObj['Nama Lengkap'] = record.nama;
      tempObj['Jenis Kelamin'] = record.jenis_kelamin;
      tempObj['Email'] = record.email;
      tempObj['No HP'] = record.no_hp;
      tempObj['No HP Lainnya'] = record.no_hp_lainnya;
      tempObj['Alamat'] = record.alamat;
      if (isDapil) {
        tempObj['Provinsi'] = record.propinsi?.name;
        tempObj['Kabupaten'] = record.kabupaten?.name;
        tempObj['Kecamatan'] = record.kecamatan?.name;
        tempObj['Keluarahan'] = record.kelurahan?.name;
      }
      tempObj['RT'] = record.rt;
      tempObj['RW'] = record.rw;
      tempObj['TPS'] = record.tps;
      tempObj['Keterangan'] = record.keterangan;

      return tempObj;
    });

    return recap;
  }

  return null;
};
