import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 42 }} spin />;
const Loading = () => (
  <div style={styles.wrapper}>
    <Spin indicator={antIcon} />
  </div>
);

export default Loading;

const styles = {
  wrapper: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
