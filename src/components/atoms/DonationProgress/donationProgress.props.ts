type Props = {
  collectedFundsNow?: string;
  collectedFundsFrom?: string;
  progress: number;
  totalDonors?: number;
  dayLeft?: number;
  type?: 'vertical' | 'horizontal';
};

export default Props;
