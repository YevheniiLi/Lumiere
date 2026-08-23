import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton() {
  return (
    <div className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center lg:px-8">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-10 w-72 sm:h-12 sm:w-96" />
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
  );
}

export function DestinationsGridSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-border overflow-hidden rounded-2xl border">
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="space-y-3 p-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DestinationDetailSkeleton() {
  return (
    <div>
      <Skeleton className="h-[46vh] min-h-[22rem] w-full rounded-none" />
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <Skeleton className="h-56 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  const sizes = ["h-36", "h-64", "h-36", "h-48", "h-48", "h-36", "h-64", "h-36"];
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {sizes.map((h, i) => (
          <Skeleton key={i} className={`${h} w-full`} />
        ))}
      </div>
    </div>
  );
}

export function FormCardSkeleton() {
  return (
    <div className="border-border bg-background mx-auto max-w-md space-y-5 rounded-2xl border p-8">
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="flex items-center gap-3 py-1">
        <Skeleton className="h-px flex-1" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-px flex-1" />
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-11 w-full rounded-xl" />
    </div>
  );
}
