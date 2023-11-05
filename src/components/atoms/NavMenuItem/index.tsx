import Link from 'next/link';
import React from 'react';
import Props from './navMenuItem.props';

const NavItem: React.FC<Props> = ({ path, name }) => {
  return (
    <li className="mx-3 py-2 lg:py-0">
      <Link href={path}>
        <a className="text-base font-medium capitalize text-black hover:text-primary hover:font-semibold transition-all duration-150">
          {name}
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
