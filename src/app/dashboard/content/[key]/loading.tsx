import { FormCardSkeleton, HeadingSkeleton, ListRowsSkeleton, SkeletonRegion } from "../../Skeletons";

export default function ContentLoading() {
  return (
    <SkeletonRegion label="Memuat konten">
      <HeadingSkeleton />
      <FormCardSkeleton fields={4} />
      <ListRowsSkeleton rows={4} />
    </SkeletonRegion>
  );
}
