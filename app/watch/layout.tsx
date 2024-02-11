const WatchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <main>{children}</main>
    </div>
  );
};

export default WatchLayout;
