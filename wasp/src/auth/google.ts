import { defineUserSignupFields } from "wasp/server/auth";

export function getConfig() {
  return {
    // Ovo su scopeovi koje Wasp zatraži od Google
    scopes: ["profile", "email"],
  };
}

export const userSignupFields = defineUserSignupFields({
  nazKorisnik: (data: any) => data.profile.name ?? data.profile.email,
  email: (data: any) => data.profile.email,
});
