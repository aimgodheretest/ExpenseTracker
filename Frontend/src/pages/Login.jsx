import AuthHero from "../components/auth/AuthHero";
import AuthLayout from "../components/auth/AuthLayout";
import LoginCard from "../components/auth/LoginCard";
function Login() {
  return (
    <AuthLayout left={<AuthHero />}>
      <LoginCard />
    </AuthLayout>
  );
}

export default Login;
