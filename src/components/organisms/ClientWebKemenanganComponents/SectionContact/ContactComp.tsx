import Image from 'next/image';
import React from 'react';
import { Calling, Message } from 'react-iconly';
import { KontakInterface, ThemeInterface } from '../../../../@types/Kemenangan';
import { IcWhatsapp, IcWhatsappDark } from '../../../../assets';
import { textLightOrDark, textIsLight } from '../../../../theme';
import { RenderIf } from '../../../../utils';
import { TextIcon } from '../../../atoms';

type Props = {
  size: number;
} & ThemeInterface &
  KontakInterface;

const ContactComp: React.FC<Props> = ({
  color,
  size,
  alamat,
  email,
  telepon,
  whatsapp
}) => {
  return (
    <ul className="w-full">
      <RenderIf isTrue={!!email}>
        <TextIcon
          icon={
            <Message
              size={size}
              primaryColor={textLightOrDark(color)}
              set="bold"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={email || ''}
          className="mb-4 "
          tag="li"
          href={`mailto:${email}`}
        />
      </RenderIf>

      <RenderIf isTrue={!!telepon}>
        <TextIcon
          icon={
            <Calling
              size={size}
              primaryColor={textLightOrDark(color)}
              set="bold"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={telepon?.toString() || ''}
          className="mb-4"
          tag="li"
        />
      </RenderIf>
      <RenderIf isTrue={!!whatsapp}>
        <TextIcon
          icon={
            <Image
              src={textIsLight(color) ? IcWhatsapp : IcWhatsappDark}
              alt="icon whatsapp"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={whatsapp?.toString() || ''}
          className="mb-4"
          tag="li"
          href={`https://api.whatsapp.com/send?phone=${whatsapp}&text=Hi.`}
        />
      </RenderIf>
    </ul>
  );
};

export default ContactComp;
