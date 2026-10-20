import { describe, expect, it } from "vitest";
import { profileSchema, signUpSchema } from "@/lib/account";

const base = { fullName: "Vishnu Priya", phone: "98765 43210", email: "Vishnu@College.ac.in", password: "campus123" };

describe("account rules", () => {
  it("sign-up requires a name, a valid Indian mobile, email and an 8+ character password", () => {
    expect(signUpSchema.safeParse(base).success).toBe(true);
    expect(signUpSchema.safeParse({ ...base, password: "short12" }).success).toBe(false);
    expect(signUpSchema.safeParse({ ...base, phone: "12345" }).success).toBe(false);
    expect(signUpSchema.safeParse({ ...base, fullName: " " }).success).toBe(false);
  });

  it("stores mobile numbers as +91 followed by 10 digits", () => {
    const r = profileSchema.parse({ fullName: "A B", phone: "+91 98765-43210" });
    expect(r.phone).toBe("+919876543210");
    expect(profileSchema.parse({ fullName: "A B", phone: "09876543210" }).phone).toBe("+919876543210");
  });

  it("normalises email to lowercase", () => {
    expect(signUpSchema.parse(base).email).toBe("vishnu@college.ac.in");
  });
});
