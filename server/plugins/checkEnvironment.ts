const requiredEnvironment = ["SESSION_SECRET", "MONGODB"]

export default defineNitroPlugin((app) => {
    for (let i = 0; i < requiredEnvironment.length; i++) {
        if (!process.env[requiredEnvironment[i]]) {
            throw new Error(`Required environment variable '${requiredEnvironment[i]}' not found.`)
        }
    }
})