import MainLayout from "../layouts/MainLayout";
import ProfileCard from "../components/settings/ProfileCard";
import PreferencesCard from "../components/settings/PreferencesCard";
import SecurityCard from "../components/settings/SecurityCard";

function Settings() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl font-bold text-white">Settings</h1>

          <p className="mt-2 text-zinc-400">
            Manage your account and application preferences.
          </p>
        </div>

        <ProfileCard />

        <div className="grid grid-cols-2 gap-6">
          <PreferencesCard />
          <SecurityCard />
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;
