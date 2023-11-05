import { StaticImageData } from 'next/image';

type CardPaslonProps = {
  number: string | number;
  image: string | StaticImageData;
  name: string;
  type: string;
};

export default CardPaslonProps;
