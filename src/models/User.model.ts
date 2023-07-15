import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {sequelize} from "../config/database.config";
import bcrypt from "bcrypt";


export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare isEmailTaken: (email: string) => Promise<boolean>;
    declare isPasswordMatch: (password: string) => Promise<boolean>;
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize,
        tableName: "users",
    }
);

User.prototype.isEmailTaken = async (email: string): Promise<boolean> => {
    const user = await User.findOne({where: {email}});
    return !!user;
}

User.prototype.isPasswordMatch = async (password: string): Promise<boolean> => {
    const user: User | undefined = this;
    return user!.password === password;
}

User.beforeSave(async user => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
});
