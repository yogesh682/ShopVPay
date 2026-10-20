// Validation rules for shopper accounts. Shared by the sign-up, sign-in and profile forms.
import { z } from "zod";

export const MIN_PASSWORD_LENGTH = 8;

const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(255);
const password = z
  .string()
  .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
  .max(72, "Password is too long");
const fullName = z.string().trim().min(2, "Enter your name").max(100, "Name is too long");
// Indian mobile: optional +91 / 0 prefix, then 10 digits starting 6-9. Spaces and dashes allowed.
const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => /^(\+91|0)?[6-9]\d{9}$/.test(v), "Enter a valid 10-digit mobile number")
  .transform((v) => `+91${v.slice(-10)}`);

export const signInSchema = z.object({ email, password: z.string().min(1, "Enter your password") });
export const signUpSchema = z.object({ fullName, phone, email, password });
export const profileSchema = z.object({ fullName, phone });
export const resetRequestSchema = z.object({ email });
export const newPasswordSchema = z.object({ password });

export type SignUpInput = z.infer<typeof signUpSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;

/** First error message from a failed parse, for showing under the form. */
export function firstError(result: z.SafeParseReturnType<unknown, unknown>): string | null {
  return result.success ? null : (result.error.issues[0]?.message ?? "Please check the form");
}

export function firstName(fullName: string | null | undefined): string {
  return (fullName ?? "").trim().split(/\s+/)[0] ?? "";
}
