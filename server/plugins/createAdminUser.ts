import { LocalUserModel, UserModel } from "~/models/user"
import { secHashPassword } from "../libs/sec";

export default defineNitroPlugin(async (app) => {
    const users = await UserModel.find({},).limit(1);
    if (users.length > 0) {
        return;
    }

    // Create a default admin user
    const user = new UserModel({
        displayName: "Administrator",
        permissions: ["*"]
    });
    const createdUser = await user.save();

    const password = crypto.randomUUID();

    const adminUser = new LocalUserModel({
        email: "admin@example.com",
        passwordHash: secHashPassword(password),
        user: createdUser
    });
    await adminUser.save();

    console.log(`Created admin user: admin@example.com ${password}`);
})