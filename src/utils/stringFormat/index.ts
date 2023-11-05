import moment from 'moment';
import {
  API_BACKEND_HOST,
  BASE_URL_IMAGE,
  BASE_URL_IMAGE_CMS
} from '../../config';

export function relawanNameParse(name: string) {
  const tempName = name.split(' ');
  if (tempName.length > 1) {
    return `${tempName[0][0].toUpperCase()}${tempName[1][0].toUpperCase()}`;
  }

  return `${tempName[0][0].toUpperCase()}${tempName[0][1].toUpperCase()}`;
}

export function permissionNameParse(name: string) {
  return name.replace(/_/g, ' ');
}

export const currencyFormat = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);

export const currencyToInt = (value: string) =>
  parseInt(value.replace(/\D*\W*/g, ''));

export const dateFormat = (date: string, type: string = 'llll') => {
  date = date?.replace(/\s/g, 'T');
  if (type === 'llll') {
    return new Date(date)
      .toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      .replaceAll('/', '-')
      .replaceAll('.', ':');
  }

  if (type === 'lll') {
    return new Date(date)
      .toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        weekday: 'long'
      })
      .replaceAll('/', '-')
      .replaceAll('.', ':');
  }

  if (type === 'll') {
    return new Date(date)
      .toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      })
      .replaceAll('/', '-')
      .replaceAll('.', ':');
  }
};

export const checkImageIsString = (image: any) => typeof image === 'string';

export const calculateDayLeft = (current: any, end: any) => {
  const dayLeft = moment(end).diff(current, 'days');

  return dayLeft < 0 || isNaN(dayLeft) ? 0 : dayLeft;
};

export const checkBaseUrlImage = (image: string = '') =>
  image?.includes('http') ? image : `${BASE_URL_IMAGE}${image}`;

export const checkBaseUrlImageLanding = (image: string = '') =>
  image?.includes('http')
    ? image
    : `${BASE_URL_IMAGE_CMS}/storage/image_uploaded/${image}`;
