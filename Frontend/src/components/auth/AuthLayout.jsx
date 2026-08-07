function AuthLayout({ left, children }) {
  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      <div className="grid h-full lg:grid-cols-2">
        {/* Left */}
        <div className="hidden border-r border-zinc-800 lg:flex lg:items-center lg:justify-center px-16">
          {left}
        </div>

        {/* Right */}
        <div className="flex h-full items-center justify-center px-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
