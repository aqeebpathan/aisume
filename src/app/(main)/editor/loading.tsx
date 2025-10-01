// app/editor/loading.tsx
export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl grow flex-col">
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          {/* Left side - Form skeleton */}
          <div className="w-full space-y-6 overflow-y-auto p-4 md:w-1/2">
            {/* Breadcrumbs skeleton */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
                  {i < 5 && (
                    <div className="h-px w-4 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                  )}
                </div>
              ))}
            </div>

            {/* Form header skeleton */}
            <div className="space-y-3">
              <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-4 w-full max-w-md animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
            </div>

            {/* Form fields skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="h-12 w-full animate-pulse rounded-lg border-2 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950" />
                </div>
              ))}

              {/* Large textarea skeleton */}
              <div className="space-y-2">
                <div className="h-5 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                <div className="h-32 w-full animate-pulse rounded-lg border-2 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950" />
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex gap-3">
              <div className="h-11 w-32 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-11 w-32 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>

          {/* Divider */}
          <div className="grow border-r border-neutral-200 dark:border-neutral-800" />

          {/* Right side - Preview skeleton */}
          <div className="hidden w-full md:flex md:w-1/2">
            <div className="w-full space-y-4 overflow-y-auto bg-neutral-50 p-8 dark:bg-neutral-900/50">
              <div className="mx-auto w-full max-w-[21cm] space-y-4">
                {/* Preview toolbar skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-6 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                  <div className="flex gap-2">
                    <div className="h-9 w-9 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                    <div className="h-9 w-9 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                  </div>
                </div>

                {/* Resume preview skeleton */}
                <div className="aspect-[1/1.4142] w-full animate-pulse rounded-lg border-2 border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
                  <div className="space-y-4 p-8">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="h-8 w-48 rounded bg-neutral-200 dark:bg-neutral-800" />
                      <div className="h-4 w-36 rounded bg-neutral-100 dark:bg-neutral-900" />
                      <div className="h-4 w-32 rounded bg-neutral-100 dark:bg-neutral-900" />
                    </div>

                    {/* Content blocks */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2 pt-4">
                        <div className="h-6 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
                        <div className="space-y-2">
                          <div className="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-900" />
                          <div className="h-4 w-5/6 rounded bg-neutral-100 dark:bg-neutral-900" />
                          <div className="h-4 w-4/6 rounded bg-neutral-100 dark:bg-neutral-900" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-center justify-between p-4">
          <div className="h-10 w-24 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />

          <div className="flex items-center gap-3">
            <div className="h-5 w-32 animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
            <div className="h-10 w-28 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      </footer>
    </div>
  )
}
