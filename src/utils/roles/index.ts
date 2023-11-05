export const checkPermissionArray = ({
  roles,
  idRole
}: {
  roles: any;
  idRole: number;
}) => roles?.indexOf(idRole) !== -1;

export const checkPermission = ({
  role,
  idRole
}: {
  role: any;
  idRole: number;
}) => role === idRole;

export const checkIsPremium = (isPremium: number) => isPremium !== 0;
