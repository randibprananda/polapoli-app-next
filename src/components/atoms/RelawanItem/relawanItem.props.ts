import React from 'react';

type OwnProps = {
  image: string | undefined;
  name: string;
};

type Props = OwnProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
export default Props;
