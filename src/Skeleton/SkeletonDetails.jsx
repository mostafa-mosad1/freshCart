function SkeletonDetails() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse my-8">
      <div className="lg:col-span-5 aspect-square rounded-2xl bg-slate-100 animate-shimmer" />
      <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-slate-100 rounded-full" />
          <div className="h-7 w-4/5 bg-slate-100 rounded-lg" />
          <div className="h-4 w-32 bg-slate-100 rounded-lg" />
          <div className="h-16 w-full bg-slate-100 rounded-xl mt-4" />
        </div>
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="h-8 w-36 bg-slate-100 rounded-lg" />
          <div className="h-12 w-full bg-slate-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonDetails;

