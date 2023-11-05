import React from 'react';
import { ClientRouteInterface } from '../../../@types/Routes';
import { NavMenuItem } from '../../atoms';
import Props from './navMenu.props';

const NavMenu: React.FC<Props> = ({ routes }) => {
  return (
    <ul className="flex flex-col lg:flex-row lg:justify-around lg:items-center mb-4 lg:mb-0">
      {routes.map((route: ClientRouteInterface) => (
        <NavMenuItem key={route.name} path={route.path} name={route.name} />
      ))}
    </ul>
  );
};

export default NavMenu;
