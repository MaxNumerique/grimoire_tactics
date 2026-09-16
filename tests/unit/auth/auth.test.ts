import { describe, expect, it } from "vitest";
import { registerSchema, loginSchema } from "@/schemas/api/auth";

describe("Strict Auth Schemas Validation", () => {
  it("should accept a valid registration payload with strict password", () => {
    const payload = {
      email: "Player1@Grimoire.com",
      password: "StrongP@ssword123!",
    };

    const result = registerSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("player1@grimoire.com");
    }
  });

  it("should reject passwords missing uppercase letters", () => {
    const payload = {
      email: "player@example.com",
      password: "weakp@ssword123!",
    };

    const result = registerSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should reject passwords missing digits", () => {
    const payload = {
      email: "player@example.com",
      password: "StrongP@ssword!",
    };

    const result = registerSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should reject passwords missing special characters", () => {
    const payload = {
      email: "player@example.com",
      password: "StrongPassword123",
    };

    const result = registerSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should reject passwords shorter than 8 characters", () => {
    const payload = {
      email: "player@example.com",
      password: "P@ss1!",
    };

    const result = registerSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should reject invalid email formats", () => {
    const payload = {
      email: "invalid-email-format",
      password: "StrongP@ssword123!",
    };

    const result = registerSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("should validate valid login payload", () => {
    const payload = {
      email: "Player1@Grimoire.com",
      password: "AnyPassword123!",
    };

    const result = loginSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("player1@grimoire.com");
    }
  });
});
