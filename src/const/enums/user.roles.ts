enum userRole {
  DEV = 999,
  ADMIN = 2,
  USER = 1,
  GUEST = 0,
}

type EnumValues<T extends object> = T[keyof T];

export type TUserRoles = EnumValues<typeof userRole>;

export default userRole;
