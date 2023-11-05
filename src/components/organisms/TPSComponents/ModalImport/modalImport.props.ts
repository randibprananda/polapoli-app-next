import { DraggerProps } from 'antd/lib/upload';
import FormWilayahProps from '../../../moleculs/FormWilayah/wilayah.props';

type OwnProps = {
  visible: boolean;
  onCancel: () => void;
  form: any;
  onDownloadTemplate: () => void;
  onUploadTemplate: (values: any) => void;
  draggerProps: DraggerProps;
};

type Props = OwnProps & FormWilayahProps;

export default Props;
