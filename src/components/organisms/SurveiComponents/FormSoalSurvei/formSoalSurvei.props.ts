import { DraggerProps } from 'antd/lib/upload';

type Props = {
  form: any;
  questions: any[];
  draggerProps: DraggerProps;
  onReset: () => void;
  onSubmit: (values: any) => void;
  loading?: boolean;
  isDetail?: boolean;
  showImage?: boolean;
  dataSurvey?: any;
};

export default Props;
