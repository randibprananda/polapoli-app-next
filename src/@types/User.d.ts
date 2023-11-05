export interface RoleInterface {
  id: number;
  name: string;
}

export interface RoleWithSalaryInterface {
  id: number;
  tim_relawan_id: number;
  role_id: number;
  gaji: number;
  metode_gaji: string;
  role: RoleInterface;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  user_role_tim: {
    role: RoleInterface;
  }[];
}

export interface PermissionInterface {
  id: number;
  name: string;
}
