import {User} from "../models/user.model.js";

export const create = async (userBody) => {
    let user = await User.findOne({
        where: {
            email: userBody.email
        }
    });
    if (user) {
        throw new Error("Email already taken");
    }
    user = await User.create(userBody);
    return user;
};