import React, { useState } from 'react';
import ModalDetail from '../ModalDetail/index';
import TButton from '../TButton';
import TFeatureItem from '../TFeatureItem';
import TTitle from '../TTitle';
import Props from './tCardPricing.props';

const TCardPricing: React.FC<Props> = ({
  title,
  price,
  checked,
  time,
  packet,
  features,
  type = 'white',
  onBuy
}) => {
  const [open, setOpen] = useState(false);
  const cardTitle: string[] = ['Paket Standard', 'Paket Pro'];
  const cardSubTitle: string[] = [
    'Berikut merupakan fitur yang akan anda dapatkan jika  mengaktifkan paket Standard untuk kebutuhan politik anda.',
    'Berikut merupakan fitur yang akan anda dapatkan jika  mengaktifkan paket Pro untuk kebutuhan politik anda.',
    'Berikut merupakan fitur yang akan anda dapatkan jika  mengaktifkan paket Unlimited untuk kebutuhan politik anda.'
  ];

  const onCancel = () => {
    setOpen(false);
  };

  const slicedFeatures = features.slice(0, 6);
  const slicedChecked = checked.slice(0, 6);

  if (type === 'primary') {
    return (
      <>
        <div className="w-full px-0 py-4 mx-auto lg:max-w-sm sm:p-4 card">
          <div className="relative flex flex-col justify-between h-full py-8 overflow-hidden px-11 rounded-2xl bg-primary card-outline">
            <div>
              <TTitle
                color="white"
                size="2xl"
                weight="bold"
                text={title}
                customStyle="tracking-wide mb-3 text-center"
              />
              <p className="flex flex-wrap items-center justify-center mb-10 text-xl font-semibold tracking-wide text-center text-white text-medium-black">
                <span>{price}</span>
                {time !== 'Diskusi lebih lanjut' ? (
                  <span className="text-xs ml-2.5 font-normal price-month price-month">
                    /{time}
                  </span>
                ) : null}
              </p>
              <div className="price-list-3-7">
                {slicedFeatures.map((feature: string, index: number) => (
                  <TFeatureItem
                    checked={slicedChecked[index] === 1}
                    feature={feature}
                    key={index}
                    color={'white'}
                  />
                ))}
              </div>
              <button
                onClick={() => setOpen(true)}
                className="w-full mb-6 text-center text-viola hover:text-white"
              >
                Lihat semua fitur
              </button>
            </div>
            <TButton type="rose" block text="Beli Paket" onClick={onBuy} />
          </div>
        </div>
        {checked.map(data => {
          return (
            <ModalDetail
              key={data}
              visible={open}
              onCancel={onCancel}
              title={title}
              subTitle={
                packet === 2
                  ? cardSubTitle[1]
                  : packet === 3
                  ? cardSubTitle[2]
                  : cardSubTitle[0]
              }
              checked={data === 1}
              features={features}
            />
          );
        })}
      </>
    );
  }
  return (
    <>
      <div className="w-full px-0 py-4 mx-auto lg:max-w-sm sm:p-4 card">
        <div className="relative flex flex-col justify-between h-full py-8 overflow-hidden bg-white px-11 rounded-2xl card-outline">
          <div className="flex flex-col justify-center">
            <TTitle
              size="2xl"
              weight="bold"
              text={title}
              customStyle="tracking-wide mb-3 text-center"
            />
            <p className="flex flex-wrap items-center justify-center mb-10 text-xl font-semibold tracking-wide text-center text-medium-black">
              <span>{price}</span>
              {time !== 'Diskusi lebih lanjut' ? (
                <span className="text-xs ml-2.5 font-normal price-month price-month">
                  /{time}
                </span>
              ) : null}
            </p>
            <div className="price-list-3-7">
              {slicedFeatures.map((feature: string, index: number) => (
                <TFeatureItem
                  checked={slicedChecked[index] === 1}
                  feature={feature}
                  key={index}
                  color={'black'}
                />
              ))}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="w-full mb-6 text-center text-primary2 hover:text-red"
            >
              Lihat semua fitur
            </button>
          </div>
          <TButton block text="Beli Paket" onClick={onBuy} />
        </div>
      </div>
      {checked.map(data => {
        return (
          <ModalDetail
            key={data}
            visible={open}
            onCancel={onCancel}
            title={title}
            subTitle={
              packet === 2
                ? cardSubTitle[1]
                : packet === 3
                ? cardSubTitle[2]
                : cardSubTitle[0]
            }
            checked={data == 1 ? true : false}
            features={features}
          />
        );
      })}
    </>
  );
};

export default TCardPricing;
