import AuthLayout from "../components/auth/AuthLayout";
import AuthHero from "../components/auth/AuthHero";
import RegisterCard from "../components/auth/RegisterCard";

function Register() {
  return (
    <AuthLayout left={<AuthHero />}>
      <RegisterCard />
    </AuthLayout>
  );
}

export default Register;
