import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { DonasiInterface } from '../../../../@types/Donasi';
import { calculateDayLeft, currencyFormat } from '../../../../utils';
import { DonationItem } from '../../../moleculs';
import Props from './listOfDonation.props';

const ListOfDonation: React.FC<Props> = ({
  onCloseDonation,
  onDelete,
  onDetails,
  onEdit,
  withMenu = true,
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
          <Col key={item.id} xs={24}>
            <DonationItem
              imageSrc={item?.donation_image}
              title={item?.donation_title}
              onDelete={() => (onDelete ? onDelete(item.id) : null)}
              onEdit={() => (onEdit ? onEdit(item) : null)}
              onCloseDonation={() =>
                onCloseDonation
                  ? onCloseDonation(item.id, item.is_close === 1)
                  : null
              }
              onDetails={() => (onDetails ? onDetails(item.id) : null)}
              onDonateNow={onDonateNow}
              description={item.donation_description}
              collectedFundsFrom={currencyFormat(+item.target_amount)}
              collectedFundsNow={currencyFormat(+item?.total_amount)}
              progress={totalProgress}
              totalDonors={item?.donation_donors?.length}
              dayLeft={dayLeft}
              withMenu={withMenu}
              withButton={withButton}
              customColorDonationNowButton={color}
              className="xl:max-w-1200 mx-0"
              isClosed={item.is_close === 1}
              imgSectionColSize={{
                xs: 24,
                sm: 14,
                md: 9,
                lg: 8,
                xl: 7
              }}
              contentSectionColSize={{
                xs: 24,
                sm: 10,
                md: 15,
                lg: 16,
                xl: 17
              }}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default ListOfDonation;
