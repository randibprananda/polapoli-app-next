import { STATUS_GEOLOCATION } from '../../constant';

export const getGeoLocation = () =>
  new Promise((resolve, reject) => {
    {
      if (!navigator.geolocation) {
        reject({
          status: STATUS_GEOLOCATION.BrowserNotSupport,
          latitude: null,
          longitude: null
        });
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              status: STATUS_GEOLOCATION.Grant,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          () => {
            reject({
              status: STATUS_GEOLOCATION.Block,
              latitude: null,
              longitude: null
            });
          }
        );
      }
    }
  });
