import { DonasiInterface } from '../../../../@types/Donasi';

type OwnProps = {
  onDetails?: (id: number) => void;
  onEdit?: (item: any) => void;
  onCloseDonation?: (id: number) => void;
  onDelete?: (id: number) => void;
  onDonateNow?: (id: number) => void;
  withMenu?: boolean;
  withButton?: boolean;
  column?: 1 | 2 | 3 | 4;
  color?: string;
  data: DonasiInterface[];
};

type Props = OwnProps;

export default Props;
