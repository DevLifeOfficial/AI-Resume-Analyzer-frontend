import { motion } from "framer-motion";

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-3 w-48 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="h-9 w-28 bg-white/5 rounded-xl animate-pulse" />
      </div>

      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/2"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/3 bg-white/5 rounded animate-pulse" />
                  <div className="h-3 w-1/4 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="space-y-2 flex-shrink-0 text-right">
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse ml-auto" />
                  <div className="h-2.5 w-12 bg-white/5 rounded animate-pulse ml-auto" />
                </div>
              </div>
              <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
