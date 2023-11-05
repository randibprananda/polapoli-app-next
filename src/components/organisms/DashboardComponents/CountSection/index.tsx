import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { Pie } from '../../../atoms';

export type CountProps = {
  realCount: any[];
  quickCount: any[];
};

const ChartComponent: React.FC<{ title: string; data: any }> = ({
  title,
  data
}) => (
  <div className="bg-white px-9 py-12 rounded-lg">
    <div className="border-b pb-2 border-b-grey3 mb-6">
      <h4 className=" text-base font-semibold">{title}</h4>
    </div>
    <Pie data={data} />
  </div>
);

const CountSection: React.FC<CountProps> = ({ realCount, quickCount }) => {
  const totalRealCount = realCount?.reduce(
    (acc, { suara_paslon }) => acc + +suara_paslon,
    0
  );
  const totalQuickCount = quickCount?.reduce(
    (acc, { total_quick_count }) => acc + +total_quick_count,
    0
  );
  const realCountData = realCount?.map(item => ({
    paslon: item.nama_wakil_paslon
      ? `${item.nama_paslon} & ${item.nama_wakil_paslon}`
      : `${item.nama_paslon}`,
    total: Math.ceil((item?.suara_paslon / totalRealCount) * 100)
  }));
  const quickCountData = quickCount?.map(item => ({
    paslon: item.nama_wakil_paslon
      ? `${item.nama_paslon} & ${item.nama_wakil_paslon}`
      : `${item.nama_paslon}`,
    total: Math.ceil((item?.total_quick_count / totalQuickCount) * 100)
  }));
  return (
    <div className="w-full">
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Title level={3}>Hasil Quick Count dan Real Count</Title>
        </Col>
        <Col xs={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <ChartComponent title="Hasil Quick Count" data={quickCountData} />
            </Col>
            <Col xs={24} lg={12}>
              <ChartComponent title="Hasil Real Count" data={realCountData} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CountSection;
