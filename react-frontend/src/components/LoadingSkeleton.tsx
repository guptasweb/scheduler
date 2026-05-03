type LoadingSkeletonProps = {
  count?: number;
};

export function LoadingSkeleton({ count = 4 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card p-5 animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="h-4 bg-white/5 rounded w-1/2" />
            <div className="h-5 bg-white/5 rounded-full w-20" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-white/5 rounded w-full" />
            <div className="h-3 bg-white/5 rounded w-3/4" />
          </div>
          <div className="flex justify-between pt-3 border-t border-white/5">
            <div className="h-3 bg-white/5 rounded w-32" />
            <div className="h-3 bg-white/5 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
