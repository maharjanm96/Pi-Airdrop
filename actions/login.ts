"use server";

import { loginSchema, LoginSchema } from "@/schemas/loginSchema";

export const login = async (values: LoginSchema) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Login Success" };
};
