import { useLoadScript } from '@react-google-maps/api';
import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import { HeatMap, Spinner } from '../../../../components';
import { MAPS_KEY } from '../../../../config';
import { VISUALIZATION_MAP } from '../../../../constant';
import { useHeatmap, useProfile } from '../../../../swr';

const RelawanHeatamp = () => {
  const [parameter, setParameter] = useState<{
    survei: string | null;
    relawan: string | null;
    lat: string | null;
    long: string | null;
    page: string | null;
    token: string | null;
  }>({
    survei: '',
    relawan: '',
    lat: '',
    long: '',
    page: '',
    token: ''
  });

  const { data: heatmapData, isLoading } = useHeatmap({
    mounted: true,
    survei: parameter.survei,
    token: parameter.token,
    relawan: parameter.relawan,
    page: parameter.page
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_KEY,
    id: 'google-map-script',
    libraries: VISUALIZATION_MAP
  });

  useEffect(() => {
    if (window) {
      // admin/relawan/heatmap?survei=1&relawan=3&page=1&lat=-7.6877768&long=111.5939025&token=36%7C8G1hzdiPzcTKEPiOGwgqaL6putBaUoBQg26caKbT
      const urlSearch = new URLSearchParams(window.location.search);
      setParameter({
        survei: urlSearch.get('survei'),
        relawan: urlSearch.get('relawan'),
        lat: urlSearch.get('lat'),
        long: urlSearch.get('long'),
        page: urlSearch.get('page'),
        token: urlSearch.get('token')
      });
    }
  }, []);

  return (
    <>
      {isLoading || !isLoaded ? (
        <div className="flex justify-center items-center w-full h-96">
          <Spinner />
        </div>
      ) : (
        <HeatMap
          center={{
            lat: parameter.lat ? +parameter.lat : 0,
            lng: parameter.long ? +parameter.long : 0
          }}
          data={heatmapData?.data?.data}
        />
      )}
    </>
  );
};

export default RelawanHeatamp;
