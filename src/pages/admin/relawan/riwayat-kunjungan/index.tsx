import { useLoadScript } from '@react-google-maps/api';
import { Alert, Button, Col, Form, Row, Select, Table, Tabs } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import {
  KecamatanInterface,
  KelurahanInterface,
  KotaInterface,
  ProvinsiInterface,
  WilayahInterface
} from '../../../../@types/DaerahIndonesia';
import { HasilSurveiInterface } from '../../../../@types/Survei';
import { UserInterface } from '../../../../@types/User';
import {
  FormWilayah,
  HeaderPage,
  HeatMap,
  LatLongMap,
  Search,
  Spinner
} from '../../../../components';
import { MAPS_KEY } from '../../../../config';
import { GOOGLE_MAP_TYPE, VISUALIZATION_MAP } from '../../../../constant';
import { ADD_ON, PERMISSION } from '../../../../constant/contract';
import { usePagination, useSearch } from '../../../../customHooks';
import { Admin } from '../../../../layouts';
import {
  useCurrentTeam,
  useHasilSurveiRelawan,
  useProfile,
  useRelawan
} from '../../../../swr';
import { colors } from '../../../../theme';
import {
  checkPermissionArray,
  dateFormat,
  distinctAddOns,
  fetchWrapper,
  getGeoLocation,
  RenderIf
} from '../../../../utils';

const { TabPane } = Tabs;
const { Option } = Select;

const RiwayatKunjunganPage = () => {
  const [formDapil] = useForm();

  const [mapType, setMapType] = useState<
    GOOGLE_MAP_TYPE.Pin | GOOGLE_MAP_TYPE.Heatmap
  >(GOOGLE_MAP_TYPE.Pin);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    lng: 0
  });
  const [zoom, setZoom] = useState(10);
  const [activeTab, setActiveTab] = useState('1');
  const [search, handleSearch] = useSearch('');
  const [searchRelawan, handleSearchRelawan] = useSearch('');
  const [relawan, setRelawan] = useState('');
  const [isGeolocation, setIsGeolocatioin] = useState(false);

  const [provinsiData, setProvinsiData] = useState<ProvinsiInterface[]>([]);
  const [kotaData, setKotaData] = useState<KotaInterface[]>([]);
  const [kecamatanData, setKecamatanData] = useState<KecamatanInterface[]>([]);
  const [kelurahanData, setKelurahanData] = useState<KelurahanInterface[]>([]);
  const [wilayah, setWilayah] = useState<WilayahInterface>({
    provinsi: null,
    kecamatan: null,
    kota: null,
    kelurahan: null
  });
  const [type, setType] = useState('');

  const [currentPage, onChangePagination] = usePagination(1);

  const { data: hasilSurvei, isLoading } = useHasilSurveiRelawan({
    mounted: true,
    page: currentPage,
    search,
    daerah: {
      propinsi: wilayah.provinsi,
      kota: wilayah.kota,
      kecamatan: wilayah.kecamatan,
      kelurahan: wilayah.kelurahan
    },
    type
  });
  const {
    data: currentTeam,
    listPermission,
    isLoading: isLoadingCurrentTeam
  } = useCurrentTeam(true);
  const { data: relawanData } = useRelawan(true, 1, searchRelawan);
  const { data: userData, role: userRole } = useProfile(true);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_KEY,
    id: 'google-map-script',
    libraries: VISUALIZATION_MAP
  });

  const handleDetailLocation = (record: HasilSurveiInterface) => {
    const longlat = record.longitude_latitude.split(',');
    setCurrentPosition({
      lat: +longlat[0],
      lng: +longlat[1]
    });
    setZoom(200);
    setActiveTab('2');
    setMapType(GOOGLE_MAP_TYPE.Pin);
  };

  const filterdAddOn = useMemo(
    () => distinctAddOns(currentTeam?.data?.order_tim),
    [currentTeam?.data?.order_tim]
  );

  const handleChangeRelawan = (e: any) => setRelawan(e);

  const handleChangeWilayah = (name: string, value: any) => {
    setWilayah({
      ...wilayah,
      [name]: value
    });
  };

  const handleChageType = (e: string) => setType(prev => e);

  const columns = [
    {
      title: 'Tanggal Kunjungan',
      dataIndex: 'created_at',
      width: 200,
      render: (text: string) => <span>{dateFormat(text)}</span>
    },
    {
      title: 'Nama Responden',
      width: 250,
      dataIndex: 'nama_responden'
    },
    {
      title: 'Wilayah',
      dataIndex: 'alamat',
      width: 350
    },
    // filterdAddOn?.indexOf(ADD_ON.Geolocation) !== -1
    isGeolocation === true
      ? {
          title: 'Lokasi',
          width: 200,
          render: (text: any, record: HasilSurveiInterface) => (
            <Button type="default" onClick={() => handleDetailLocation(record)}>
              Lihat Lokasi
            </Button>
          )
        }
      : {}
  ];

  const options = relawanData?.data?.data?.map((item: UserInterface) => (
    <Option key={item.id}>{item.name}</Option>
  ));

  useEffect(() => {
    getGeoLocation().then((res: any) =>
      setCurrentPosition({
        lat: res.latitude,
        lng: res.longitude
      })
    );
  }, [currentPosition]);

  useEffect(() => {
    fetchWrapper.get('/api/daerah-indonesia/provinsi').then(res => {
      setProvinsiData(res);
    });
  }, []);

  useEffect(() => {
    async function getValues() {
      try {
        if (wilayah.provinsi) {
          const resKota = await fetchWrapper.get(
            `/api/daerah-indonesia/kota?id_provinsi=${wilayah.provinsi}`
          );

          setKotaData(resKota);
        }

        if (wilayah.kota) {
          const resKecamatan = await fetchWrapper.get(
            `/api/daerah-indonesia/kecamatan?id_kota=${wilayah.kota}`
          );
          setKecamatanData(resKecamatan);
        }

        if (wilayah.kecamatan) {
          const resKelurahan = await fetchWrapper.get(
            `/api/daerah-indonesia/kelurahan?id_kecamatan=${wilayah.kecamatan}`
          );
          setKelurahanData(resKelurahan);
        }
      } catch (error) {}
    }

    getValues();
  }, [wilayah]);

  // Check addon geolocation

  useEffect(() => {
    if (isLoadingCurrentTeam === false) {
      currentTeam?.data?.order_tim[0].order_tim_addon.forEach((addon: any) => {
        if (addon?.title === 'Geolocation') {
          setIsGeolocatioin(true);
        }
      });
    }
  }, [isLoadingCurrentTeam]);

  if (!userData?.currentTeam) {
    return (
      <div>
        <Alert
          message="Anda harus memilih tim terlebih dahulu untuk melihat informasi pada halaman ini"
          type="info"
          showIcon
          className="mb-6"
        />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Riwayat Kunjungan | Relawan</title>
      </Head>
      <HeaderPage title="Riwayat Kunjungan Relawan" />
      <Row className="mt-7" gutter={[6, 12]}>
        <Col xs={24}>
          <div className="flex items-end justify-between mb-8">
            <div className="w-48 ">
              <label className="inline-block mb-2 text-base font-semibold">
                Filter
              </label>

              <Select
                className="w-full"
                placeholder="Filter"
                onChange={handleChageType}
                value={type}
              >
                <Option value="">Semua Survey</Option>
                <Option value="educate">Educate</Option>
                <Option value="survey">Survey</Option>
              </Select>
            </div>
            <Search value={search} onChange={handleSearch} />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Form layout="vertical" initialValues={{ remember: true }}>
            <FormWilayah
              wilayah={wilayah}
              setWilayah={handleChangeWilayah}
              provinsiData={provinsiData}
              kotaData={kotaData}
              kecamatanData={kecamatanData}
              kelurahanData={kelurahanData}
              withKelurahan={true}
              withTitle={false}
            />
          </Form>
        </Col>
        {/* <Col xs={24} md={12}>
          <Form layout="vertical">
            <FormDapil
              form={formDapil}
              mounted={true}
              isActive={!!wilayah.provinsi}
            />
          </Form>
        </Col> */}

        {isLoading || !isLoaded ? (
          <div className="flex items-center justify-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <>
            <Col xs={24}>
              <Tabs
                color={colors.primary}
                activeKey={activeTab}
                onChange={e => setActiveTab(e)}
              >
                <TabPane tab="Tabel" key="1">
                  <Table
                    dataSource={hasilSurvei?.data?.data}
                    columns={columns}
                    scroll={{ x: 1500 }}
                    pagination={{
                      total: hasilSurvei?.data?.total,
                      current: currentPage,
                      onChange: onChangePagination
                    }}
                  />
                </TabPane>
                <TabPane
                  tab="Peta"
                  key="2"
                  disabled={
                    checkPermissionArray({
                      roles: listPermission,
                      idRole: PERMISSION.geolocation_heatmap_kunjungan_relawan
                    }) && filterdAddOn.indexOf(ADD_ON.Geolocation) !== -1
                  }
                >
                  <Row>
                    <Col xs={24} sm={6}>
                      <Form>
                        <Form.Item label="Jenis">
                          <Select
                            defaultValue={GOOGLE_MAP_TYPE.Pin}
                            value={mapType}
                            onChange={(e: GOOGLE_MAP_TYPE) => {
                              setMapType(e);
                            }}
                          >
                            <Option key={GOOGLE_MAP_TYPE.Pin}>Pin</Option>
                            <Option key={GOOGLE_MAP_TYPE.Heatmap}>
                              Heatmap
                            </Option>
                          </Select>
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col xs={24}>
                      <RenderIf isTrue={mapType === GOOGLE_MAP_TYPE.Pin}>
                        <LatLongMap
                          center={currentPosition}
                          makers={hasilSurvei?.data?.data}
                          zoom={zoom}
                        />
                      </RenderIf>
                      <RenderIf isTrue={mapType === GOOGLE_MAP_TYPE.Heatmap}>
                        <HeatMap
                          center={currentPosition}
                          data={hasilSurvei?.data?.data}
                          zoom={zoom}
                        />
                      </RenderIf>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

RiwayatKunjunganPage.layout = Admin;

export default RiwayatKunjunganPage;
