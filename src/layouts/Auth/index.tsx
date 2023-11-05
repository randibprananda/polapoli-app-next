import { AuthNavbar } from '../../components';

const AuthLayout = (props: any) => {
  return (
    <>
      <AuthNavbar />
      <main>{props.children}</main>
    </>
  );
};

export default AuthLayout;
