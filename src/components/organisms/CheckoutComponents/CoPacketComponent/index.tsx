import { Form, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { AddOnInterface, PricingInterface } from '../../../../@types/Landing';
import { CardAddOn, CardPacket } from '../../../atoms';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

const { Option } = Select;

export type CoPacketProps = {
  data: PricingInterface;
  periode: any;
  addOns?: AddOnInterface[];
  setPeriode: (e: any) => void;
  onSelectAddOn: (e: boolean, addOn: AddOnInterface) => void;
};

type AddOnSectionProps = {
  data?: AddOnInterface[];
  onSelect: (e: boolean, addOn: AddOnInterface) => void;
};

SwiperCore.use([Navigation]);

const AddOnSection: React.FC<AddOnSectionProps> = ({ data = [], onSelect }) => {
  return (
    <section className=" my-8">
      <h2 className="text-primary text-2xl font-semibold">Paket Add-Ons</h2>
      <span className="text-primary">
        Silahkan pilih paket add-ons sesuai dengan kebutuhan anda
      </span>
      <div className=" mt-6">
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
            '650': {
              slidesPerView: 3,
              spaceBetween: 8
            },
            '990': {
              slidesPerView: 2,
              spaceBetween: 8
            },
            '1100': {
              slidesPerView: 3,
              spaceBetween: 8
            }
          }}
        >
          {data?.map(item => (
            <SwiperSlide key={item?.id}>
              <CardAddOn
                title={item?.title}
                price={+item?.price}
                description={item?.description}
                onChange={e => onSelect(e, item)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const CoPacketComponent: React.FC<CoPacketProps> = ({
  data,
  periode,
  setPeriode,
  addOns = [],
  onSelectAddOn
}) => {
  return (
    <div className="p-4">
      <Title level={2} className="text-primary mb-6">
        Checkout Pesanan
      </Title>
      <div>
        <CardPacket title={data?.title} price={data?.price} />
        <AddOnSection data={addOns} onSelect={onSelectAddOn} />
        <Form layout="vertical" className="mt-6">
          <Form.Item label="Periode">
            <Select
              placeholder="Pilih Periode"
              value={periode}
              onChange={e => setPeriode(e)}
            >
              <Option key={1}>1 Bulan</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CoPacketComponent;
