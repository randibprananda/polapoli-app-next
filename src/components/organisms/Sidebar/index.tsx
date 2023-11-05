import React, { useMemo, useRef } from 'react';
import Link from 'next/link';
import { Menu, Layout, SiderProps } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { RelawanMenuItem, RelawanMenuModal } from '../../moleculs';
import { colors } from '../../../theme';
import Image from 'next/image';
import { IlLogo, IlLogoNew } from '../../../assets';
import RelawanMenuModalProps from '../../moleculs/RelawanMenuModal/relawanMenuModal.props';
import { useCurrentTeam } from '../../../swr';
import { distinctAddOns, RenderIf } from '../../../utils';
import RelawanMenuItemProps from '../../moleculs/RelawanMenuItem/relawanMenuItem.props';
import { Gap } from '../../atoms';
const { Sider } = Layout;

type OwnProps = {
  routes: any[];
  open: boolean;
  isLegislatif?: number;
};

type Props = OwnProps &
  SiderProps &
  RelawanMenuModalProps &
  RelawanMenuItemProps;

const SidebarComponent: React.FC<Props> = ({
  collapsed,
  onCollapse,
  routes,
  open,
  openRelawan,
  setOpenRelawan,
  setIsModalVisible,
  isLoading,
  isModalVisible,
  isDisable,
  handleChooseTeam,
  onFinish,
  draggerProps,
  timRelawanData,
  isLegislatif = 0
}) => {
  const { listPermission, data } = useCurrentTeam(true);

  const filterdAddOn = useMemo(
    () => distinctAddOns(data?.data?.order_tim),
    [data?.data?.order_tim]
  );

  return (
    <>
      <Sider
        theme="light"
        width={250}
        collapsedWidth={110}
        className={`transform transition-all h-full fixed sm:translate-x-0 sm:block z-60 sm:z-20 sm:mt-24 top-0 left-0 ${
          !open ? ' -translate-x-64' : ' translate-x-0 h-full'
        } overflow-auto `}
      >
        <div className="block sm:hidden p-6 mb-3 border-b border-b-grey3">
          <div className="logo w-48 h-11">
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
        </div>

        <RelawanMenuItem
          collapsed={collapsed}
          handleOpenModal={setOpenRelawan}
        />

        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          className="pb-2 sm:pb-24"
        >
          {routes.map((item: any, index: number) => {
            if (item.superParent) {
              return (
                <span className="p-4 pl-6 pb-0 inline-block" key={index}>
                  <p
                    className={`${
                      !collapsed ? 'text-base' : 'text-xs'
                    } font-medium`}
                  >
                    {item?.name}
                  </p>
                </span>
              );
            }
            if (
              item?.collapse &&
              item?.views?.length > 0 &&
              item?.views?.filter(
                (val: any) => listPermission?.indexOf(val.permission) != -1
              )?.length != 0
            ) {
              const tempMenu = (
                <SubMenu
                  key={`sub${index}`}
                  title={item?.name}
                  icon={
                    <item.icon
                      set="bulk"
                      size={20}
                      primaryColor={colors.grey1}
                    />
                  }
                  className={`py-2 ${collapsed ? 'c-submenu-collapsed' : ''}`}
                >
                  {item?.views?.map(
                    (itemMenu: any) =>
                      listPermission?.indexOf(itemMenu?.permission) != -1 && (
                        <Menu.Item className="py-2" key={itemMenu?.name}>
                          <Link href={`${itemMenu?.layout}${itemMenu?.path}`}>
                            <a>{itemMenu?.name}</a>
                          </Link>
                        </Menu.Item>
                      )
                  )}
                </SubMenu>
              );

              if (item?.hasOwnProperty('addOn')) {
                return filterdAddOn?.indexOf(item?.addOn) !== -1
                  ? tempMenu
                  : null;
              }

              return tempMenu;
            }

            if (
              item?.hasOwnProperty('isLegislatif') &&
              item?.isLegislatif === isLegislatif &&
              listPermission?.indexOf(item?.permission) != -1 &&
              item?.layout
            ) {
              return (
                <Menu.Item
                  className="py-2 pl-6"
                  key={`menu-item-${index}`}
                  icon={
                    <item.icon
                      set="bulk"
                      size={20}
                      primaryColor={colors.grey1}
                    />
                  }
                >
                  <Link href={`${item?.layout}${item?.path}`}>
                    <a>{item?.name}</a>
                  </Link>
                </Menu.Item>
              );
            }

            if (
              item?.hasOwnProperty('isLegislatif') &&
              item?.isLegislatif !== isLegislatif
            ) {
              return null;
            }

            const tempMainMenu = (
              <Menu.Item
                className="py-2 pl-6"
                key={`menu-item-${index}`}
                icon={
                  <item.icon set="bulk" size={20} primaryColor={colors.grey1} />
                }
              >
                <Link href={`${item?.layout}${item?.path}`}>
                  <a>{item?.name}</a>
                </Link>
              </Menu.Item>
            );

            if (item?.hasOwnProperty('addOn')) {
              return filterdAddOn?.indexOf(item?.addOn) !== -1
                ? tempMainMenu
                : null;
            }

            return (
              (listPermission?.indexOf(item?.permission) != -1 ||
                (!item?.permission && item?.layout)) &&
              tempMainMenu
            );
          })}
        </Menu>
        <Gap height={24} width={10} />
      </Sider>
      <RelawanMenuModal
        openRelawan={openRelawan}
        setOpenRelawan={setOpenRelawan}
        setIsModalVisible={setIsModalVisible}
        isLoading={isLoading}
        isModalVisible={isModalVisible}
        isDisable={isDisable}
        handleChooseTeam={handleChooseTeam}
        onFinish={onFinish}
        draggerProps={draggerProps}
        timRelawanData={timRelawanData}
      />
    </>
  );
};

export default SidebarComponent;
