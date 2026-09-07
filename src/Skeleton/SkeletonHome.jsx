function SkeletonHome() {
  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between h-[360px]">
      <div>
        <div className="aspect-square w-full rounded-2xl bg-slate-100 mb-4 animate-shimmer" />
        <div className="h-3 w-16 bg-slate-100 rounded-full mb-2" />
        <div className="h-4 w-3/4 bg-slate-100 rounded-lg mb-2" />
        <div className="flex justify-between items-center mt-3">
          <div className="h-5 w-20 bg-slate-100 rounded-lg" />
          <div className="h-4 w-12 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="h-10 w-full bg-slate-100 rounded-xl mt-4" />
    </div>
  );
}

export default SkeletonHome;

