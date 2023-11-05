import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { DonasiInterface } from '../../../../@types/Donasi';
import { calculateDayLeft, currencyFormat } from '../../../../utils';
import { DonationItem } from '../../../moleculs';
import Props from './listOfDonation.props';

const ListOfDonationKemenangan: React.FC<Props> = ({
  onCloseDonation,
  onDelete,
  onDetails,
  onEdit,
  withMenu = true,
  column = 1,
  withButton = false,
  color,
  onDonateNow,
  data
}) => {
  return (
    <Row gutter={[24, 24]}>
      {data?.map((item: DonasiInterface) => {
        const totalProgress =
          (+item?.total_amount / +item?.target_amount) * 100;
        const dayLeft = calculateDayLeft(
          moment(),
          moment(item.batas_akhir, 'DD-MM-YYYYTHH:mm:ssZ')
        );
        return (
          <Col key={item.id} xs={24} lg={24 / column}>
            <DonationItem
              imageSrc={item?.donation_image}
              title={item.donation_title}
              onDelete={() => (onDelete ? onDelete(item.id) : null)}
              onEdit={() => (onEdit ? onEdit({ id: item.id }) : null)}
              onCloseDonation={() =>
                onCloseDonation ? onCloseDonation(item.id) : null
              }
              onDetails={() => (onDetails ? onDetails(item.id) : null)}
              onDonateNow={() => (onDonateNow ? onDonateNow(item.id) : null)}
              description={item.donation_description}
              collectedFundsFrom={currencyFormat(+item.target_amount)}
              collectedFundsNow={currencyFormat(+item?.total_amount)}
              progress={totalProgress}
              totalDonors={item?.donation_donors?.length}
              dayLeft={dayLeft}
              withMenu={withMenu}
              withButton={withButton}
              customColorDonationNowButton={color}
              imgSectionColSize={{
                xs: 24,
                sm: 24,
                md: 13,
                lg: 24,
                xl: 12
              }}
              contentSectionColSize={{
                xs: 24,
                sm: 24,
                md: 11,
                lg: 24,
                xl: 12
              }}
              type="vertical"
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default ListOfDonationKemenangan;
