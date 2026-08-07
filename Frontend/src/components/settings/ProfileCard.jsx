function ProfileCard() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-3xl font-bold text-white">
          MK
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Murli Kumar</h2>

          <p className="text-zinc-400">murli@example.com</p>

          <span className="mt-3 inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
            Free Plan
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
