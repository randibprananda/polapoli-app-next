import { Button, Col, Dropdown, Menu, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IlBgDummy, IlCampaign } from '../../../assets';
import { colors, textLightOrDark } from '../../../theme';
import { RenderIf } from '../../../utils';
import { DonationProgress, Gap } from '../../atoms';
import Props from './donationItem.props';

const DonationItem: React.FC<Props> = ({
  title,
  imageSrc,
  onDetails = () => {},
  onEdit = () => {},
  onCloseDonation = () => {},
  onDelete = () => {},
  onDonateNow = () => {},
  description,
  collectedFundsNow,
  collectedFundsFrom,
  progress,
  totalDonors,
  dayLeft,
  tag = 'li',
  withMenu = true,
  withButton = false,
  withDetailButton = true,
  customColorDonationNowButton,
  className = '',
  imgSectionColSize = {
    xs: 24,
    sm: 14,
    md: 9,
    lg: 24,
    xl: 13
  },
  isClosed = false,
  contentSectionColSize = {
    xs: 24,
    sm: 10,
    md: 15,
    lg: 24,
    xl: 11
  },
  type = 'horizontal'
}) => {
  const handleMenuClick = (e: any) => {
    if (e.key === '0') {
      return onDetails();
    }
    if (e.key === '1') {
      return onEdit();
    }
    if (e.key === '2') {
      return onCloseDonation();
    }
    if (e.key === '3') {
      return onDelete();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={0}>Detail</Menu.Item>
      <Menu.Item key={1}>Edit</Menu.Item>
      <Menu.Item key={2} danger>
        {isClosed ? 'Buka' : 'Tutup'} Donasi
      </Menu.Item>
      <Menu.Item key={3} danger>
        Hapus
      </Menu.Item>
    </Menu>
  );

  const Tag = tag;
  return (
    <Tag
      className={`bg-white rounded-xl p-3 list-none xl:max-w-1000 shadow ${className} card-donation`}
    >
      <Row gutter={[24, 24]} className=" h-full">
        <Col {...imgSectionColSize}>
          <div className="relative w-full sm:max-w-xs sm:mx-auto">
            <Image
              src={imageSrc ? imageSrc : IlBgDummy}
              alt={title}
              width={450}
              height={450}
              loading="lazy"
              objectFit="cover"
              className="rounded-lg"
              layout="responsive"
            />
          </div>
        </Col>
        <Col {...contentSectionColSize}>
          <div className="p-4">
            <div className="flex justify-between items-center border-b pb-2 border-b-grey3 mb-4">
              <Link href="#">
                <a className="font-bold  text-xl md:text-2xl mb-2 text-black focus:text-black">
                  {title}
                </a>
              </Link>
              <RenderIf isTrue={withMenu}>
                <Dropdown overlay={menu}>
                  <span className="text-grey1 font-bold text-xl tracking-widest cursor-pointer">
                    ...
                  </span>
                </Dropdown>
              </RenderIf>
            </div>
            <p className="text-justify line-clamp-3">{description}</p>
            <Gap height={8} width={10} />
            <DonationProgress
              collectedFundsNow={collectedFundsNow}
              collectedFundsFrom={collectedFundsFrom}
              progress={progress}
              totalDonors={totalDonors}
              dayLeft={dayLeft}
              type={type}
            />
            <Gap height={16} width={10} />
            <RenderIf isTrue={withButton}>
              <div>
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{
                    backgroundColor: customColorDonationNowButton,
                    color: customColorDonationNowButton
                      ? textLightOrDark(customColorDonationNowButton)
                      : colors.white
                  }}
                  onClick={onDonateNow}
                >
                  Donasi Sekarang
                </Button>
                <RenderIf isTrue={withDetailButton}>
                  <Button
                    type="ghost"
                    size="large"
                    block
                    className="border-0 border-white text-grey1 mt-2"
                    onClick={onDetails}
                  >
                    Lihat Detail
                  </Button>
                </RenderIf>
              </div>
            </RenderIf>
          </div>
        </Col>
      </Row>
    </Tag>
  );
};

export default DonationItem;
