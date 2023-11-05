import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'react-iconly';
import { checkBaseUrlImage, RenderIf } from '../../../utils';
import { colors } from '../../../theme';
import { useCurrentTeam } from '../../../swr';
import Props from './relawanMenuItem.props';
import { API_BACKEND_HOST } from '../../../config';

const RelawanMenuItem: React.FC<Props> = ({
  collapsed,
  handleOpenModal = () => {}
}) => {
  const { data: currentTeam } = useCurrentTeam(true);

  return (
    <>
      <div className="relative">
        <div className=" px-4 py-3 flex justify-start items-center">
          <RenderIf isTrue={!currentTeam?.data?.photo_tim_relawan}>
            <button
              className={
                'p-2 mr-2 bg-rose flex justify-center items-center text-white rounded-md mx-auto'
              }
              onClick={() => {
                collapsed && handleOpenModal(true);
              }}
            >
              {currentTeam?.data?.nama_tim_relawan[0].toUpperCase()}
            </button>
          </RenderIf>
          <RenderIf isTrue={currentTeam?.data?.photo_tim_relawan}>
            <div className="mr-2 w-12 h-12">
              <Image
                src={checkBaseUrlImage(currentTeam?.data?.photo_tim_relawan)}
                alt="Current Team"
                width={66}
                height={66}
                objectFit="cover"
                className="rounded-md"
                layout="responsive"
              />
            </div>
          </RenderIf>
          <div
            className={`${
              !collapsed ? 'flex' : 'hidden'
            } w-full justify-between items-center`}
          >
            <p className="font-semibold text-sm">
              {currentTeam?.data?.nama_tim_relawan || '-'}
            </p>
            <button
              className="flex justify-center items-center opacity-100 hover:opacity-80 bg-grey3 p-1 rounded-full transition-all duration-150"
              onClick={() => handleOpenModal(true)}
            >
              <ChevronRight set="light" primaryColor={colors.black} size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelawanMenuItem;
