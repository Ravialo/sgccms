import { jwtVerify, SignJWT } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

export type EncryptTokenOptions = {
  expires: string | number;
};

export async function encryptToken(payload: any, options?: EncryptTokenOptions) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(options?.expires || "72h")
    .sign(key);
}

export async function decryptToken<T>(input: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as T;
  } catch (error) {
    // console.log(error);
    console.log("Error in decrypting token");
    return null;
  }
}

export const hashPassword = async (password: string) => {
  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    const bcrypt = require("bcryptjs");
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    return error;
  }
};
