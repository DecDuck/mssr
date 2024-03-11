import { LocalUserModel, User } from "~/models/user";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (h3) => {
    const body: { email?: string, password?: string } = await readBody(h3);
    if (!body.email || !body.password) {
        return createError({
            statusCode: 400,
        });
    }

    const user = await LocalUserModel.findOne({ email: body.email });
    if (!user) {
        return createError({
            statusCode: 403,
            statusMessage: "Invalid username or password."
        });
    }

    const passwordHash = user.passwordHash as unknown as string;

    const valid = bcrypt.compareSync(body.password, passwordHash);
    if (!valid) {
        return createError({
            statusCode: 403,
            statusMessage: "Invalid username or password."
        });
    }

    const session = await useSession(h3, {
        password: process.env.SESSION_SECRET ?? "Fucking Typescript...",
    });

    await session.update({
        userId: user.id
    });

    return {};
})