import { GTAG_KEY } from '../../config';

export const pageView = (url: any) => {
  window.gtag('config', GTAG_KEY, {
    path_url: url
  });
};
