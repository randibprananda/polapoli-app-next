import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SocialMediaInterface } from '../../../../@types/Landing';
import {
  IcFacebook,
  IcInstagram,
  IcTiktok,
  IcTwitter,
  IcYoutube,
  IlLogoWhite,
  IlLogoNew,
  IlLogoBottom
} from '../../../../assets';
import { SOCIAL_MEDIA_TYPE } from '../../../../constant';

export type LandingFooterProps = {
  contacts: any[];
  socialMedia: any[];
  description: string;
};

const Contact = (item: any) => (
  <li>
    <a target="_blank" href={item.content} rel="noreferrer">
      {item.title}
    </a>
  </li>
);

const SocialMedia = (item: SocialMediaInterface) => {
  return (
    <a href={item.link} target="_blank" rel="noreferrer">
      {item.type === SOCIAL_MEDIA_TYPE.Instagram && (
        <Image src={IcInstagram} alt="icon instagram" />
      )}
      {item.type === SOCIAL_MEDIA_TYPE.Facebook && (
        <Image src={IcFacebook} alt="icon facebook" />
      )}
      {item.type === SOCIAL_MEDIA_TYPE.Youtube && (
        <Image src={IcYoutube} alt="icon youtube" />
      )}
      {item.type === SOCIAL_MEDIA_TYPE.Twitter && (
        <Image src={IcTwitter} alt="icon twitter" />
      )}
      {item.type === SOCIAL_MEDIA_TYPE.Tiktok && (
        <Image src={IcTiktok} alt="icon tiktok" />
      )}
    </a>
  );
};

const LandingFooter: React.FC<LandingFooterProps> = ({
  contacts,
  socialMedia,
  description
}) => {
  return (
    <section
      className="h-full pt-20 pb-12 lg:px-24 md:px-16 sm:px-8 px-4 transition-all duration-500 linear"
      style={{ backgroundColor: '#141432' }}
    >
      <footer className="footer-2-3">
        <div className="lg:pb-24 pb-16 mx-auto">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-0 gap-y-6">
            <div className="pr-16">
              <div className="mb-5">
                <img
                  src={IlLogoBottom?.src}
                  alt=""
                  className="w-auto h-40 object-contain"
                />
              </div>
              <nav className="list-none list-footer space-y-5">
                <p style={{ color: '#707092', lineHeight: 1.8 }}>
                  {description}
                </p>
              </nav>
            </div>
            <div className="">
              <h2 className="title-font font-semibold text-2xl mb-5 text-white">
                Company
              </h2>
              <nav className="list-none list-footer space-y-5">
                <li>
                  <Link href="/about">
                    <a>Tentang Kami</a>
                  </Link>
                </li>
                <li>
                  <Link href="/solution">
                    <a href="">Solusi</a>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing">
                    <a href="">Harga</a>
                  </Link>
                </li>
                <li>
                  <Link href="/articles">
                    <a href="">Artikel</a>
                  </Link>
                </li>
              </nav>
            </div>
            <div className="">
              <h2 className="title-font font-semibold text-2xl mb-5 text-white">
                Bantuan
              </h2>
              <nav className="list-none list-footer space-y-5">
                <li>
                  <Link href="/help">
                    <a href="">FAQ</a>
                  </Link>
                </li>
                {contacts?.map((item: any) => Contact(item))}
              </nav>
            </div>
          </div>
        </div>
        <div className="border-color mx-auto">
          <div className="">
            <hr style={{ borderColor: '#2E2E5A' }} />
          </div>
          <div className="container mx-auto flex  pt-12 flex-col lg:flex-row items-center space-y-5 lg:space-y-0">
            <div className="flex title-font font-medium items-center text-gray-900 mb-4 lg:mb-0 md:mb-0 space-x-5 cursor-pointer">
              {socialMedia?.map((item: any) => SocialMedia(item))}
            </div>
            <nav className="mx-auto flex flex-wrap items-center text-base justify-center space-x-5"></nav>
            <nav className="flex lg:flex-row flex-col items-center text-base justify-center">
              <p>Copyright © 2023 PolaPoli</p>
            </nav>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingFooter;
