import { z } from "zod";

export const schema = z.object({
  username: z.string().nonempty("Username is required"), // Define validation rules for username
  password: z.string().min(8, "Password must be at least 8 characters long"), // Define validation rules for password
});