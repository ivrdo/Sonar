import { LoginForm } from "wasp/client/auth";
import { AuthLayout } from "../AuthLayout";

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
