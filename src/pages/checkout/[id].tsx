import { Card, Col, message, Row } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AddOnInterface } from '../../@types/Landing';
import {
  CoPacketComponent,
  DetailOrderComponent,
  Spinner
} from '../../components';
import { Auth } from '../../layouts';
import { useAddOn, useDetailPricing } from '../../swr';
import { fetchWrapper, getWindowLastPath } from '../../utils';

const CheckOut = () => {
  const router = useRouter();
  const [id, setId] = useState<any>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [periode, setPeriode] = useState<any>(null);
  const [addOnSelected, setAddOnSelected] = useState<AddOnInterface[]>([]);

  const { data: detailPricing, isLoading } = useDetailPricing(true, id);
  const { data: addOnData } = useAddOn(true);

  const handleOrder = () => {
    const formData: any = {
      jenis_paket_id: detailPricing?.pricing.id,
      jenis_addon_id: addOnSelected?.map(item => item?.id)
    };

    setLoading(true);
    fetchWrapper
      .post('/api/order/add', formData)
      .then(res => {
        message.success('Order berhasil!', 2);

        window.open(res?.data[0].invoice_url);
        router.push('/admin/dashboard');
      })
      .catch(err => {
        message.error('Order gagal!');
      })
      .finally(() => setLoading(false));
  };

  const handleSelectAddOn = (e: boolean, addOn: AddOnInterface) => {
    if (e) {
      setAddOnSelected(prev => [...prev, addOn]);
    } else {
      const filtered = addOnSelected?.filter(item => item?.id != addOn?.id);
      setAddOnSelected(filtered);
    }
  };

  useEffect(() => {
    setId(getWindowLastPath());
  }, []);

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Row justify="center" align="middle" className="h-screen bg-light">
        <Col xs={24} md={22}>
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-96">
              <Spinner />
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              <Col xs={0} lg={2} />
              <Col xs={24} lg={12}>
                <CoPacketComponent
                  data={detailPricing?.pricing}
                  periode={periode}
                  setPeriode={setPeriode}
                  addOns={addOnData?.pricing}
                  onSelectAddOn={handleSelectAddOn}
                />
              </Col>
              <Col xs={24} lg={9}>
                <div className="flex h-full items-center">
                  <DetailOrderComponent
                    packet={detailPricing?.pricing}
                    addOns={addOnSelected}
                    periode={periode}
                    loading={loading}
                    onOrder={handleOrder}
                  />
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

CheckOut.layout = Auth;

export default CheckOut;
