import Image from 'next/image';
import React from 'react';
import {
  SocialMedinaInterface,
  ThemeInterface
} from '../../../../@types/Kemenangan';
import {
  IcFacebook,
  IcFacebookDark,
  IcInstagram,
  IcInstagramDark,
  IcTiktok,
  IcTiktokDark,
  IcTwitter,
  IcYoutube,
  IcYoutubeDark,
  IcLinkedin,
  IcLinkedinDark
} from '../../../../assets';
import { textIsLight, textLightOrDark } from '../../../../theme';
import { RenderIf } from '../../../../utils';
import { TextIcon } from '../../../atoms';

type Props = {
  size: number;
} & ThemeInterface &
  SocialMedinaInterface;

const SocialMediaComp: React.FC<Props> = ({
  color,
  size,
  instagram,
  url_instagram,
  facebook,
  url_facebook,
  youtube,
  url_youtube,
  twitter,
  url_twitter,
  tiktok,
  url_tiktok,
  linkedin,
  url_linkedin
}) => {
  return (
    <ul className="w-full">
      <RenderIf isTrue={!!url_instagram}>
        <TextIcon
          icon={
            <Image
              src={textIsLight(color) ? IcInstagram : IcInstagramDark}
              alt="icon instagram"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={instagram || ''}
          className="mb-4"
          tag="li"
          href={url_instagram + ''}
        />
      </RenderIf>
      <RenderIf isTrue={!!url_facebook}>
        <TextIcon
          icon={
            <Image
              src={textIsLight(color) ? IcFacebook : IcFacebookDark}
              alt="icon facebook"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={facebook || ''}
          className="mb-4"
          tag="li"
          href={url_facebook + ''}
        />
      </RenderIf>
      <RenderIf isTrue={!!url_youtube}>
        <TextIcon
          icon={
            <Image
              src={textIsLight(color) ? IcYoutube : IcYoutubeDark}
              alt="icon youtube"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={youtube || ''}
          className="mb-4"
          tag="li"
          href={url_youtube + ''}
        />
      </RenderIf>
      <RenderIf isTrue={!!url_twitter}>
        <TextIcon
          icon={
            <Image
              src={textIsLight(color) ? IcTwitter : IcTiktokDark}
              alt="icon twitter"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={twitter || ''}
          className="mb-4"
          tag="li"
          href={url_twitter + ''}
        />
      </RenderIf>
      <RenderIf isTrue={!!url_tiktok}>
        <TextIcon
          icon={
            <Image
              src={textIsLight(color) ? IcTiktok : IcTiktokDark}
              alt="icon tiktok"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={tiktok || ''}
          className="mb-4"
          tag="li"
          href={url_tiktok + ''}
        />
      </RenderIf>
      <RenderIf isTrue={!!url_linkedin}>
        <TextIcon
          icon={
            <Image
              src={textIsLight(color) ? IcLinkedin : IcLinkedinDark}
              alt="icon linkedin"
            />
          }
          color={textLightOrDark(color)}
          size={size}
          text={linkedin || ''}
          className="mb-4"
          tag="li"
          href={url_linkedin + ''}
        />
      </RenderIf>
    </ul>
  );
};

export default SocialMediaComp;
