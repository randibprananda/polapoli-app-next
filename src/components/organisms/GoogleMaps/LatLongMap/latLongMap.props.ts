type LatLongMapProps = {
  center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  makers: any[];
  zoom?: number;
};

export default LatLongMapProps;
