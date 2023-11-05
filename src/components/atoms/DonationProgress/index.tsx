import { Progress } from 'antd';
import React from 'react';
import { colors } from '../../../theme';
import Props from './donationProgress.props';

const DonationProgress: React.FC<Props> = ({
  collectedFundsFrom = 'Rp. 0',
  collectedFundsNow = 'Rp. 0',
  progress = 20,
  totalDonors = 0,
  dayLeft = 0,
  type = 'horizontal'
}) => {
  const getType = () => {
    if (type === 'horizontal') {
      return 'flex  flex-col sm:flex-row justify-between items-center text-grey1 text-sm';
    }

    if (type === 'vertical') {
      return 'flex flex-col justify-between items-center text-grey1 text-sm';
    }
  };
  return (
    <div className="m-0">
      <div className={getType()}>
        <p>
          Terkumpul{' '}
          <span className="font-bold text-rose text-lg md:text-xl">
            {collectedFundsNow}
          </span>
        </p>
        <p>dari {collectedFundsFrom}</p>
      </div>
      <div className="my-2">
        <Progress
          percent={progress}
          strokeWidth={12}
          strokeColor={colors.rose}
          showInfo={false}
        />
      </div>
      <div className="flex justify-between items-center text-base text-grey1">
        <p>
          <b className="text-black">{totalDonors}</b> Donatur
        </p>
        <p>
          <b className="text-black">{dayLeft}</b> hari lagi
        </p>
      </div>
    </div>
  );
};

export default DonationProgress;
