import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

type CardBannerProps = {
  background?: string;
  content?: ReactNode;
  image: StaticImageData;
  maxWidth?: string | number;
};

export default CardBannerProps;
