import React, { useEffect, useState } from 'react';
import { CardImageCaption } from '../../../atoms';
import { SectionWrapper } from '../../../moleculs';
import Props from './sectionGallery.props';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import { IlBgDummy } from '../../../../assets';
import { Modal } from 'antd';
import Image from 'next/image';
import { GaleriInterface } from '../../../../@types/Kemenangan';

SwiperCore.use([Navigation]);

const SectionGallery: React.FC<Props> = ({ color, data }) => {
  const [open, setOpen] = useState(false);
  const [dataForModal, setDataForModal] = useState<{
    src: any;
    caption: string | any;
  }>({
    src: null,
    caption: null
  });

  const handleOpenModal = (data: any) => {
    setOpen(true);
    setDataForModal({
      src: data.src,
      caption: data.caption
    });
  };

  const handleCloseModal = (data: any) => {
    setOpen(false);
    setDataForModal({
      src: null,
      caption: null
    });
  };
  return (
    <>
      <SectionWrapper
        title="Galeri"
        titleColor={color}
        className="px-0 sm:px-0 md:px-0 xl:px-0"
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={8}
          centeredSlides={true}
          centeredSlidesBounds={true}
          navigation={true}
          breakpoints={{
            '540': {
              slidesPerView: 2,
              spaceBetween: 8
            },
            '1000': {
              slidesPerView: 3,
              spaceBetween: 8
            },
            '1240': {
              slidesPerView: 4,
              spaceBetween: 8
            }
          }}
        >
          {data.map((item: GaleriInterface) => (
            <SwiperSlide key={item.id}>
              <CardImageCaption
                onClick={() =>
                  handleOpenModal({
                    src: item.foto_galeri_paslon,
                    caption: item.keterangan
                  })
                }
                src={item.foto_galeri_paslon}
                caption={item.keterangan}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SectionWrapper>

      <Modal
        width={700}
        visible={open}
        footer={null}
        onCancel={handleCloseModal}
        className="galeri-modal"
      >
        <div className="galeri-image">
          <Image
            src={dataForModal?.src}
            alt="alter"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className="p-8 text-justify text-lg">{dataForModal?.caption}</p>
      </Modal>
    </>
  );
};

export default SectionGallery;
