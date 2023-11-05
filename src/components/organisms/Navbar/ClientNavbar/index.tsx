import React, { useState } from 'react';
import { IlLogo, IlLogoNew } from '../../../../assets';
import { Gap, NavLogo, TButton } from '../../../atoms';
import { NavMenu } from '../../../moleculs';
import { ClientRoutes } from '../../../../routes';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const ClientNavbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies(['user', '_r']);

  return (
    <header className="navbar sticky top-0 z-40">
      <div className="mx-auto flex flex-wrap flex-row items-center justify-between xl:px-26 lg:px-20 md:px-20 px-8 py-8">
        <a className="flex font-medium items-center">
          <NavLogo image={IlLogoNew} alt="Logo PolaPoli" />
        </a>
        <label
          htmlFor="menu-toggle"
          className="cursor-pointer lg:hidden block"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <div
          className={`${
            open ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:w-auto w-full lg:ml-24 lg:mr-auto flex-wrap items-center text-base justify-center`}
          id="menu"
        >
          <nav className="lg:space-x-6 space-x-0 lg:flex items-center justify-between font-medium pt-8 lg:pt-0 lg:space-y-0 space-y-6">
            <NavMenu routes={ClientRoutes} />
          </nav>
        </div>
        <div
          className={`${
            open ? 'flex' : 'hidden'
          } lg:flex justify-start  lg:items-center lg:w-auto w-full`}
          id="menu"
        >
          {cookies.user && !cookies._r ? (
            <TButton
              textSize="sm"
              type="primary"
              onClick={() => router.push('/admin/pilih-tim-relawan')}
              text="Dashboard"
            />
          ) : (
            <>
              <TButton
                textSize="sm"
                type="grey"
                onClick={() => router.push('/auth/login')}
                text="Masuk"
                fontWeight="semibold"
              />
              <Gap width={12} height={2} />
              <TButton
                textSize="sm"
                type="primary"
                onClick={() => router.push('/auth/register')}
                text="Daftar"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ClientNavbar;
