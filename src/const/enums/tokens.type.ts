enum tokensType {
  ACCESS = "access",
  REFRESH = "refresh",
}

type EnumValues<T extends object> = T[keyof T];

export type TTokenTypes = EnumValues<typeof tokensType>;

export default tokensType;
