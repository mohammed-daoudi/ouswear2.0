'use client';

import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  rows?: number;
}

export function LoadingSkeleton({ className, rows = 1 }: LoadingSkeletonProps) {
  if (rows > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'animate-pulse bg-white/10 rounded-lg h-4',
              className
            )}
            style={{ width: `${70 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-white/10 rounded-lg',
        className
      )}
    />
  );
}