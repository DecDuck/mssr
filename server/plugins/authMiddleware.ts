import { LocalUserModel } from "~/models/user";

const whitelist = ["/login", "/api/v1/auth/", "/_nuxt"];


export default defineNitroPlugin((app) => {
    const handler = app.h3App.handler;
    app.h3App.handler = async (h3) => {
        if (whitelist.filter((e) => h3.path.startsWith(e)).length == 0) {
            const session = await useSession(h3, {
                password: process.env.SESSION_SECRET ?? "Dude, I'm so tired of Typescript...",
            });

            if (!session.data.userId) {
                return await sendRedirect(h3, '/login');
            }

            const user = await LocalUserModel.findById(session.data.userId);
            if (!user) {
                await session.clear();
                return await sendRedirect(h3, '/login');
            }

            h3.context.user = user;
        }

        try {
            return await handler(h3);
        } catch (e) {
            console.log(e);
            return sendError(h3, e as Error);
        }
    }
})