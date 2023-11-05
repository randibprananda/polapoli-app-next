import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface,
  WilayahInterface
} from '../../../../@types/DaerahIndonesia';
import {
  AGAMA_DI_INDONESIA,
  OBJ_TIPE_SOAL_JAWABAN
} from '../../../../constant';
import { fetchWrapper } from '../../../../utils';
import { FormWilayah, SoalSurveiItem } from '../../../moleculs';
import Props from './formSoalPemilihSurvei.props';

const FormSoalPemilihSurvei: React.FC<Props> = ({
  form,
  draggerProps,
  dataSurvey
}) => {
  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [modalState, setModalState] = useState<{
    withWilayah: boolean;
    jenisWilayah: any;
  }>({
    withWilayah: true,
    jenisWilayah: null
  });
  const [tempWilayah, setTempWilayah] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });

  const setDynamicModalState = (name: string, value: any) => {
    setModalState({
      ...modalState,
      [name]: value
    });
  };

  const handleChangeTempWilayah = (name: string, value: any) => {
    setTempWilayah({
      ...tempWilayah,
      [name]: value
    });
  };

  useEffect(() => {
    fetchWrapper.get('/api/daerah-indonesia/provinsi').then(res => {
      setProvinsiData(res);
    });
  }, []);

  useEffect(() => {
    async function getValues() {
      try {
        if (tempWilayah.provinsi) {
          const resKota = await fetchWrapper.get(
            `/api/daerah-indonesia/kota?id_provinsi=${tempWilayah.provinsi}`
          );

          setKotaData(resKota);
        }

        if (tempWilayah.kota) {
          const resKecamatan = await fetchWrapper.get(
            `/api/daerah-indonesia/kecamatan?id_kota=${tempWilayah.kota}`
          );
          setKecamatanData(resKecamatan);
        }

        if (tempWilayah.kecamatan) {
          const resKelurahan = await fetchWrapper.get(
            `/api/daerah-indonesia/kelurahan?id_kecamatan=${tempWilayah.kecamatan}`
          );
          setKelurahanData(resKelurahan);
        }
      } catch (error) {
        // console.log(error);
      }
    }

    getValues();
  }, [tempWilayah]);

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24}>
        <div className="bg-grey3 flex items-start justify-center p-3 mb-1">
          <h2 className="text-base font-semibold">Data Pemilih/Pendukung</h2>
        </div>
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="NIK (Min. 16 karakter)"
          isRequired={true}
          field_id="nik;dpt"
          rules={{
            pattern: /^[0-9]{16}$/,
            message: 'Harus terdiri dari 16 angka'
          }}
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="Nama"
          isRequired={true}
          field_id="nama;dpt"
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="Tempat Lahir"
          isRequired={true}
          field_id="tempat_lahir;dpt"
        />
      </Col>
      <Col xs={24} lg={12}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="Tanggal Lahir (YYYY-MM-DD)"
          isRequired={true}
          field_id="tanggal_lahir;dpt"
          rules={{
            pattern: /^\d{4}-\d{2}-\d{2}$/,
            message: 'Harus dalam format YYYY-MM-DD'
          }}
        />
      </Col>
      <Col xs={24} lg={12}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.pilihanGanda}
          label="Jenis Kelamin"
          isRequired={true}
          field_id="jenis_kelamin;dpt"
          opsi={['L', 'P']}
        />
      </Col>
      <Col xs={24} lg={12}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.pilihanGanda}
          label="Agama"
          isRequired={false}
          field_id="agama;dpt"
          opsi={[...AGAMA_DI_INDONESIA]}
        />
      </Col>
      <Col xs={24} lg={12}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="Suku"
          isRequired={false}
          field_id="suku;dpt"
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="Keterangan"
          isRequired={false}
          field_id="keterangan;dpt"
        />
      </Col>

      <Col xs={24}>
        <div className="rounded-xl md:py-9 md:px-8 p-5 bg-white">
          <FormWilayah
            dataSurvey={dataSurvey}
            wilayah={tempWilayah}
            setWilayah={handleChangeTempWilayah}
            provinsiData={provinsiData}
            kotaData={kotaData}
            kecamatanData={kecamatanData}
            kelurahanData={kelurahanData}
            withTitle={false}
          />
        </div>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.number}
          label="Dapil"
          isRequired={false}
          field_id="dapil;dpt"
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.number}
          label="TPS"
          isRequired={false}
          field_id="tps;dpt"
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.number}
          label="RW"
          isRequired={false}
          field_id="rw;dpt"
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.number}
          label="RT"
          isRequired={false}
          field_id="rt;dpt"
        />
      </Col>
      <Col xs={24} lg={12}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.number}
          label="No. HP"
          isRequired={true}
          field_id="no_hp;dpt"
        />
      </Col>
      <Col xs={24} lg={12}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="No. HP Lainnya (Opsional)"
          isRequired={false}
          field_id="no_hp_lainnya;dpt"
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.text}
          label="Email"
          isRequired={true}
          field_id="email;dpt"
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.gambar}
          label="Foto"
          isRequired={true}
          field_id="foto;dpt"
        />
      </Col>
      <Col xs={24}>
        <SoalSurveiItem
          form={form}
          draggerProps={draggerProps}
          type={OBJ_TIPE_SOAL_JAWABAN.gambar}
          label="Foto/Scan KTP"
          isRequired={true}
          field_id="foto_ktp;dpt"
        />
      </Col>
    </Row>
  );
};

export default FormSoalPemilihSurvei;
