// app/resumes/loading.tsx
import { Sparkles, Plus } from "lucide-react"

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <div className="my-8 space-y-4">
        {/* Header skeleton */}
        <div className="relative">
          <div className="h-12 w-64 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="absolute -top-2 -right-2 h-3 w-3 animate-pulse rounded-full bg-neutral-300 opacity-60 dark:bg-neutral-700"></div>
        </div>

        {/* Stats skeleton */}
        <div className="flex items-center space-x-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="h-4 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume cards skeleton */}
      <div className="mb-8 flex w-full grid-cols-2 flex-col gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {/* Create card skeleton */}
        <div className="flex min-h-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-950">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
              <Plus className="h-8 w-8 text-neutral-400" />
            </div>
            <div className="space-y-2">
              <div className="h-6 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-10 w-64 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
            </div>
            <div className="mt-4 h-8 w-28 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>

        {/* Resume item skeletons */}
        {[1, 2, 3, 4, 5].map((i) => (
          <ResumeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

function ResumeCardSkeleton() {
  return (
    <div className="rounded-2xl border-2 border-neutral-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-5 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-48 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
          </div>
        </div>

        {/* Preview */}
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
          <div className="aspect-[8.5/11] w-full animate-pulse bg-neutral-100 dark:bg-neutral-900" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-neutral-950" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
