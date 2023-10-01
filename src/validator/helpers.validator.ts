import userRoles from "const/enums/user.roles";

export const ingredientName = (value: string): string => value.toLowerCase();
export const isUuidv4 = (value: string): boolean => {
  const uuidv4Regex = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{12}4[0-9a-f]{19}");
  return uuidv4Regex.test(value);
};

export const passwordMatch = (data: any): boolean => {
  if (!data.password && !data.confirmPassword) return true;
  return data.password === data.confirmPassword;
};

export const role = (value: number | undefined): boolean => {
  if (!value) return true;
  return Object.values(userRoles).includes(value);
};
