import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}
