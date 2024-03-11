export default defineEventHandler(async (h3) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {};
})