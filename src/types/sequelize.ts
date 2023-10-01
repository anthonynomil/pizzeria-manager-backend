import { Model } from "sequelize";

export type UpdateAttributes<T extends Model> = {
  [P in keyof T]?: T[P];
};
