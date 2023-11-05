import React from 'react';
import { IlLogo, IlLogoNew } from '../../../../assets';
import { NavLogo } from '../../../atoms';
import { NavMenu } from '../../../moleculs';
import { KemenanganRoutes } from '../../../../routes';
const KemenanganNavbar = () => {
  return (
    <nav className="w-full sticky -top-1 left-0 right-0 flex justify-between items-center px-4 sm:px-16 py-4 bg-white shadow z-50">
      <div>
        <NavLogo image={IlLogoNew} alt="Logo PolaPoli" />
      </div>
      <div className="hidden lg:block">
        <NavMenu routes={KemenanganRoutes} />
      </div>
    </nav>
  );
};

export default KemenanganNavbar;
