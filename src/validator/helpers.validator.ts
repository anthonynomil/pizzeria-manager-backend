import userRoles from "const/enums/user.roles";

export const ingredientName = (value: string): string => value.toLowerCase();

export const passwordMatch = (data: any): boolean => {
  if (!data.password && !data.confirmPassword) return true;
  return data.password === data.confirmPassword;
};

export const role = (value: number | undefined): boolean => {
  if (!value) return true;
  return Object.values(userRoles).includes(value);
};
