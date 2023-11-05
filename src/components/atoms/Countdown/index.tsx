import ACountdown from 'antd/lib/statistic/Countdown';
import { countdownValueType } from 'antd/lib/statistic/utils';
import React from 'react';

export type CountdownProps = {
  deadline?: countdownValueType | undefined;
};

const Countdown: React.FC<CountdownProps> = ({ deadline }) => {
  return (
    <ACountdown
      className="countdown"
      title="Countdown Pemilihan"
      value={deadline}
      format="DD:HH:mm:ss"
      suffix={<span>Hari - Jam - Menit - Detik</span>}
    />
  );
};

export default Countdown;
