"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/hashPassword";
import { RegisterSchema, registerSchema } from "@/schemas/registerSchema";

export const register = async (values: RegisterSchema) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message);
  }

  const { email, password } = validatedFields.data;
  console.log("Server", email, password);
  const hashedPassword = await hashPassword(password);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created" };
};
