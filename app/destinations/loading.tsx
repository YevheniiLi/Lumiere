import { DestinationsGridSkeleton, PageHeaderSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <>
      <PageHeaderSkeleton />
      <DestinationsGridSkeleton />
    </>
  );
}
