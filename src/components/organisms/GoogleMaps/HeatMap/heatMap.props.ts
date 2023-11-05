type LatLongMapProps = {
  center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  data: any[];
  zoom?: number;
};

export default LatLongMapProps;
