import { DraggerProps } from 'antd/lib/upload';

type RelawanMenuModalProps = {
  openRelawan: boolean;
  setOpenRelawan: (item: boolean) => void;
  isLoading: boolean;
  isModalVisible: boolean;
  isDisable?: boolean;
  setIsModalVisible: (item: boolean) => void;
  handleChooseTeam: (id: number | string) => void;
  onFinish: (values: any) => void;
  draggerProps: DraggerProps;
  timRelawanData: any;
};

export default RelawanMenuModalProps;
