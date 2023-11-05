import { DonasiInterface } from '../../../../@types/Donasi';

type OwnProps = {
  onDetails?: (id: number) => void;
  onEdit?: (item: any) => void;
  onCloseDonation?: (id: number, isClosed: boolean) => void;
  onDelete?: (id: number) => void;
  onDonateNow?: () => void;
  withMenu?: boolean;
  withButton?: boolean;
  color?: string;
  data?: DonasiInterface[];
};

type Props = OwnProps;

export default Props;
