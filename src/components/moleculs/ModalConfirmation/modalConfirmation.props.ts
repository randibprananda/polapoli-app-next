type Props = {
  visible: boolean;
  onCancel?: () => void;
  onOk: () => void;
  image?: any;
  textOk?: string;
  textCancel?: string;
  customStyleOk?: any;
  customStyleCancel?: any;
  text?: string;
  withBtnCancel?: boolean;
  isUsung?: number;
  textPublish?: string;
};

export default Props;
