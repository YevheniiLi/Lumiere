import { FormCardSkeleton, PageHeaderSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="px-6 pb-24 lg:px-8">
        <FormCardSkeleton />
      </div>
    </>
  );
}
