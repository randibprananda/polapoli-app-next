import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const API_BACKEND_HOST =
  serverRuntimeConfig.api_backend_host || 'http:127.0.0.1:80';

export const API_XENDIT =
  serverRuntimeConfig.api_xendit || 'https://api.xendit.co';
export const USERNAME_XENDIT = serverRuntimeConfig.username_xendit;

export const MAPS_KEY = publicRuntimeConfig.maps_key;
export const GTAG_KEY = publicRuntimeConfig.gtag_key;
export const API_CMS = serverRuntimeConfig.api_cms;

export const BASE_URL = publicRuntimeConfig.base_url;
export const BASE_URL_IMAGE = 'https://' + publicRuntimeConfig.base_url_image;
export const BASE_URL_IMAGE_CMS =
  'https://' + publicRuntimeConfig.base_url_image_cms;
export const CLIENT_URL = publicRuntimeConfig.client_url;
