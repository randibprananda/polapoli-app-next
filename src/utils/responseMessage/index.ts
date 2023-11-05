import { message as Amessage } from 'antd';

interface HideAlertInterface {
  type: 'success' | 'error';
  message: string;
  onHide: () => void;
}

export function responseMessage({ type, message, onHide }: HideAlertInterface) {
  if (type === 'success') {
    Amessage.success(message, 4);
  }

  if (type === 'error') {
    Amessage.error(message, 4);
  }

  onHide();
}
