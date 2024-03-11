import { compareSync, hashSync } from "bcrypt"

export const secHashPassword = (password: string) => hashSync(password, 10);
export const secComparePassword = (password: string, hash: string) => compareSync(password, hash);