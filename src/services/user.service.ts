import {User} from "../models/User.model";

export const getUserByEmail = async (email: string) => {
    return await User.findOne({where: {email}});
}