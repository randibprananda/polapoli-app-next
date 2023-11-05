import { ClientNavbar } from '../../components';
const PlainLayout = (props: any) => {
  return (
    <>
      <ClientNavbar />
      <main>{props.children}</main>
    </>
  );
};

export default PlainLayout;
