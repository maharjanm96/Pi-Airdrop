"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { paths } from "@/lib/paths";
import { loginSchema, LoginSchema } from "@/schemas/loginSchema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const login = async (
  values: LoginSchema,
  callbackUrl?: string | null
) => {
  const validateState = loginSchema.safeParse(values);
  if (!validateState) {
    return { error: "Invalid fields" };
  }
  const { email, password } = values;
  const exisitingUser = await getUserByEmail(email);

  if (
    !exisitingUser ||
    !exisitingUser.email ||
    exisitingUser.role !== "admin"
  ) {
    return { error: "Invalid credentials" };
  }

  const passwordsMatch = await bcrypt.compare(
    password,
    exisitingUser.password!
  );
  if (!passwordsMatch) return { error: "Invalid Credentials!" };

  const DEFAULT_REDIRECT_URL = paths.admin.seedphrase;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_REDIRECT_URL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
