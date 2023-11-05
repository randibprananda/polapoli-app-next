import React, { useState } from 'react';
import Head from 'next/head';
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Table,
  Tabs,
  Calendar,
  Badge,
  Alert
} from 'antd';

import { HeaderPage, Label, Search, Spinner } from '../../../../components';
import { Admin } from '../../../../layouts';
import { colors } from '../../../../theme';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { BadgeProps } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useJadwalRute, useProfile, useRiwayatRute } from '../../../../swr';

const { TabPane } = Tabs;

const getListData = (value: Moment, data: any, month: string | number) => {
  let listData: any[] = [];
  const dataByMonth = data[month];

  dataByMonth?.forEach((item: any) => {
    if (
      +moment(item?.jadwal_kunjungan).format('D') == value.date() &&
      +month - 1 == value.month()
    ) {
      const address = `${item?.kelurahan?.name}, ${item?.kecamatan?.name}, ${item?.kabupaten?.name}, ${item?.propinsi?.name}.`;
      if (listData.length === 0) {
        listData = [
          {
            type: 'warning',
            content: address
          }
        ];
      } else {
        listData.push({
          type: 'warning',
          content: address
        });
      }
      return;
    }
  });

  return listData || [];
};

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const RuteHarianPage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [month, setMonth] = useState(+moment().format('M'));

  // services
  const { data: riwayatData, isLoading: riwayatLoading } = useRiwayatRute(true);
  const { data: jadwalData } = useJadwalRute(true);
  const { data: userData, role: userRole } = useProfile(true);

  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(+value.format('M'), mode);
    setMonth(+value.format('M'));
  };

  const generateData = () => {
    const tempData: any = {};
    jadwalData?.data.forEach((item: any) => {
      const mnth = moment(item.jadwal_kunjungan).format('M');

      if (tempData.hasOwnProperty(mnth)) {
        tempData[mnth].push(item);
      } else {
        tempData[mnth] = [item];
      }
    });

    return tempData;
  };

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const data = generateData();
    const listData = getListData(value, data, month);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const columns: any = [
    {
      title: 'Tanggal Kunjungan',
      dataIndex: 'jadwal_kunjungan'
    },
    {
      title: 'Wilayah',
      dataIndex: 'propinsi',
      render: (_: string, record: any) => {
        const getPlace = (place?: string, withComma = true) =>
          place ? (withComma ? place + ', ' : place + '.') : '';

        return `${getPlace(record?.kelurahan?.name)}${getPlace(
          record?.kecamatan?.name
        )}${getPlace(record?.kabupaten?.name)}${getPlace(
          record?.propinsi?.name,
          false
        )}`;
      }
    }
  ];

  if (!userData?.currentTeam) {
    return (
      <div>
        <Alert
          message="Anda harus memilih tim terlebih dahulu untuk melihat informasi pada halaman ini"
          type="info"
          showIcon
          className="mb-6"
        />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Rute Harian | Relawan</title>
      </Head>
      <HeaderPage title="Rute Harian" />
      <Row className="mt-7">
        {false ? (
          <div className="flex justify-center items-center w-full h-96">
            <Spinner />
          </div>
        ) : (
          <Col xs={24}>
            <Tabs
              color={colors.primary}
              activeKey={activeTab}
              onChange={e => setActiveTab(e)}
            >
              <TabPane tab="Jadwal Rute" key="1">
                <Calendar
                  onPanelChange={onPanelChange}
                  dateCellRender={dateCellRender}
                  monthCellRender={monthCellRender}
                />
              </TabPane>
              <TabPane tab="Riwayat Rute" key="2">
                {riwayatLoading ? (
                  <div className="flex justify-center items-center w-full h-96">
                    <Spinner />
                  </div>
                ) : (
                  <Table
                    dataSource={riwayatData?.data?.sort((a: any, b: any) =>
                      moment
                        .utc(b.jadwal_kunjungan)
                        .diff(moment.utc(a.jadwal_kunjungan))
                    )}
                    columns={columns}
                    scroll={{ x: 1500 }}
                  />
                )}
              </TabPane>
            </Tabs>
          </Col>
        )}
      </Row>
    </>
  );
};

RuteHarianPage.layout = Admin;

export default RuteHarianPage;
