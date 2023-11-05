import moment from 'moment';
import { OrderTimInterface, AddOnInterface } from '../../@types/Landing';
import { ADD_ON } from '../../constant/contract';

export const distinctAddOns = (orderTim: any) => {
  const tempAddOns: string[] = orderTim
    ?.filter(
      (item: OrderTimInterface) =>
        !moment().isAfter(moment(item?.tanggal_akhir))
    )
    ?.map((item: OrderTimInterface) => item?.order_tim_addon)
    ?.reduce((a: any, b: any) => a.concat(b), [])
    ?.map((item: AddOnInterface) =>
      item?.slug ? item?.slug?.toLowerCase() : item?.title?.toLowerCase()
    );

  const addOnContract = Object.values(ADD_ON);

  return addOnContract?.filter(
    (item: string) => tempAddOns?.indexOf(item) !== -1
  );
};
