import { DPTInterface } from '../../../../@types/Pendukung';

type Props = {
  isPemilih: boolean;
  isDetail: boolean;
  dptData?: DPTInterface[];
  setNIK?: (val: any) => void;
  onSearchNIK?: (val: any) => void;
};

export default Props;
