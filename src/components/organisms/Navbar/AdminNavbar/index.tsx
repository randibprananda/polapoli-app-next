import React from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Logout, User } from 'react-iconly';
import Image from 'next/image';
import { IcMenu, IcUserDefault, IlLogo, IlLogoNew } from '../../../../assets';
import { colors } from '../../../../theme';
import Props from './header.props';

const { Header } = Layout;

const AdminNavbar: React.FC<Props> = ({
  profileName,
  onLogout,
  avatar,
  onClickMenu = () => {}
}) => {
  const menu = (
    <Menu className="sticky py-2 px-4 rounded-md -translate-x-8">
      <Menu.Item
        className="py-2"
        icon={<User set="bulk" primaryColor={colors.grey1} />}
        key="1"
      >
        <Link href={'/admin/profile'}>
          <a>Profile Saya</a>
        </Link>
      </Menu.Item>
      <Menu.Item
        className="py-2"
        icon={<Logout set="bold" primaryColor={colors.danger} />}
        onClick={onLogout}
        key="2"
      >
        <p>Logout</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background flex justify-between items-center py-4 px-9 sm:py-12 shadow z-50 fixed top-0 left-0 right-0">
      <Link href="/">
        <a className="hidden sm:inline-block">
          <div className="hidden sm:block logo w-48 h-11">
            <Image
              src={IlLogoNew}
              width={199}
              height={45}
              sizes="100vw"
              alt="logo"
              objectFit="contain"
              layout="responsive"
              quality={100}
              loading="eager"
            />
          </div>
        </a>
      </Link>
      <button className="sm:hidden logo w-9 h-9" onClick={onClickMenu}>
        <Image
          src={IcMenu}
          width={152}
          height={152}
          sizes="100vw"
          alt="logo"
          objectFit="contain"
          quality={100}
          loading="eager"
        />
      </button>

      <Dropdown overlay={menu}>
        <a
          className="ant-dropdown-link flex items-center hover:text-black hover:font-semibold transition-all duration-150"
          onClick={e => e.preventDefault()}
        >
          <Image
            src={avatar ? avatar : IcUserDefault}
            width={36}
            height={36}
            loading="eager"
            objectFit="contain"
            alt="User"
          />{' '}
          <span className="hidden sm:inline-block px-3">{profileName}</span>
          <DownOutlined className="ml-2" />
        </a>
      </Dropdown>
    </Header>
  );
};

export default AdminNavbar;
