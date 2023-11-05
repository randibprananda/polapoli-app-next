import React from 'react';
import { TimRelawanInterface } from '../../../@types/DataMaster';

type OwnProps = {
  data: TimRelawanInterface;
};

type Props = OwnProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;

export default Props;
