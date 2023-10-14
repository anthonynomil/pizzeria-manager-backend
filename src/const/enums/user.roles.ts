enum userRole {
  DEV = 999,
  ADMIN = 3,
  MODERATOR = 2,
  USER = 1,
  OWN = -1,
}

type EnumValues<T extends object> = T[keyof T];

export type TUserRoles = EnumValues<typeof userRole>;

export default userRole;
