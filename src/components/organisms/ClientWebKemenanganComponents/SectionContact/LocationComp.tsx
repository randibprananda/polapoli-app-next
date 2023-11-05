import { Row, Col } from 'antd';
import React from 'react';
import { Location } from 'react-iconly';
import { ThemeInterface } from '../../../../@types/Kemenangan';
import { textLightOrDark } from '../../../../theme';
import { TextIcon } from '../../../atoms';

type Props = {
  size: number;
  alamat: string | null | undefined;
} & ThemeInterface;

const LocationComp: React.FC<Props> = ({ color, size, alamat }) => (
  <div>
    <TextIcon
      icon={
        <Location
          size={size}
          primaryColor={textLightOrDark(color)}
          set="bulk"
        />
      }
      color={textLightOrDark(color)}
      size={size}
      text={alamat || ''}
    />
  </div>
);

export default LocationComp;
