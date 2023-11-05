import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Props from './latLongMap.props';

const containerStyle = {
  width: '100%',
  height: '80vh'
};

const LatLongMap: React.FC<Props> = ({ center, makers, zoom }) => {
  return (
    <GoogleMap zoom={zoom} mapContainerStyle={containerStyle} center={center}>
      {makers?.map((item: any, index: number) => {
        const longlat = item.longitude_latitude.split(',');
        return (
          <Marker
            key={index}
            position={{ lat: +longlat[0], lng: +longlat[1] }}
          />
        );
      })}
    </GoogleMap>
  );
};

export default LatLongMap;
