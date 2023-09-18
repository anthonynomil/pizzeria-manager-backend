import {
  AllowNull, AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import { Omit } from "sequelize-typescript/dist/shared/types";

@Table
class User extends Model<Omit<"id", number>> {
  @Unique
  @Column
  declare email: string;

  @Column
  declare password?: string;

  @AllowNull
  @Column
  declare name: string;

  @Default("user")
  @Column
  declare role: string;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword = async (instance: User): Promise<void> => {
    instance.password = await bcrypt.hash(instance.password!, 10);
  };

  static isEmailTaken = async (email: string, id?: number): Promise<boolean> => {
    const where = { email };
    if (id) Object.assign(where, { id });
    return !!(await User.findOne({ where }));
  };

  passwordMatch = async (password: string): Promise<boolean> => {
    return await bcrypt.compare(password, this.password!);
  };
}

export default User;