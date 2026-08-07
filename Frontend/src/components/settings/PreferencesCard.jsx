function PreferencesCard() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-semibold text-white">Preferences</h2>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-300">Dark Theme</span>

          <input type="checkbox" checked readOnly />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-300">Email Notifications</span>

          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}

export default PreferencesCard;
