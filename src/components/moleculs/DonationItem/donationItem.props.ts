import { ElementType } from 'react';
import DonationProgressProps from '../../atoms/DonationProgress/donationProgress.props';

type OwnProps = {
  imageSrc?: string;
  title: string;
  onDetails?: () => void;
  onEdit?: () => void;
  onCloseDonation?: () => void;
  onDelete?: () => void;
  onDonateNow?: () => void;
  description: string;
  tag?: ElementType;
  withMenu?: boolean;
  withButton?: boolean;
  withDetailButton?: boolean;
  customColorDonationNowButton?: string;
  className?: string | undefined;
  imgSectionColSize?: {
    xs: any;
    sm: any;
    md: any;
    lg: any;
    xl: any;
  };
  contentSectionColSize?: {
    xs: any;
    sm: any;
    md: any;
    lg: any;
    xl: any;
  };
  isClosed?: boolean;
};

type Props = OwnProps & DonationProgressProps;

export default Props;
