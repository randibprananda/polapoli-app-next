import React from 'react';
import { TestimonialInterface } from '../../../../@types/Landing';
import { TTitle } from '../../../atoms';
import { TCardTestimonial } from '../../../moleculs';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import { checkBaseUrlImageLanding } from '../../../../utils';

export type TestimonialProps = {
  data: TestimonialInterface[];
  title: string;
};

SwiperCore.use([Navigation]);

const TestimonialsComponent: React.FC<TestimonialProps> = ({ data, title }) => {
  return (
    <section className="h-auto bg-primary">
      <main className="relative px-4 py-32 mx-auto overflow-hidden max-w-screen-2xl lg:px-24">
        <div className="text-center">
          <TTitle
            tag="h3"
            size="3xl"
            color="white"
            text={title}
            customStyle="leading-snug mb-24"
          />
        </div>
        <div className="relative w-full card-testimonial">
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
              }
            }}
          >
            {data?.map((item: TestimonialInterface) => (
              <SwiperSlide key={item.id}>
                <TCardTestimonial
                  img={checkBaseUrlImageLanding(item.picture)}
                  name={item.title}
                  profession={item.designation}
                  testimonial={item.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>
    </section>
  );
};

export default TestimonialsComponent;
