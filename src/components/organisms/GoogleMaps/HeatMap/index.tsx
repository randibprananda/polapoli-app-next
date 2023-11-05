import React from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import Props from './heatMap.props';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const HeatMap: React.FC<Props> = ({ center, data, zoom = 20 }) => {
  return (
    <GoogleMap zoom={zoom} mapContainerStyle={containerStyle} center={center}>
      <HeatmapLayer
        // required
        data={[
          ...data?.map((item: any, index: number) => {
            const longlat = item.longitude_latitude.split(',');
            return new google.maps.LatLng(+longlat[0], +longlat[1]);
          })
        ]}
      />
    </GoogleMap>
  );
};

export default HeatMap;
