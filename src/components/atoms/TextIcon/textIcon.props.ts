import { ElementType } from 'react';

type Props = {
  tag?: ElementType;
  text: string;
  icon?: any;
  size: number;
  color: string;
  href?: string | undefined;
  className?: string | undefined;
};

export default Props;
