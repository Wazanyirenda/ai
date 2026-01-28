import { EmptyState } from '@/components/empty-state';

export default function AffiliatePage() {
  return (
    <div className="max-w-3xl">
      <EmptyState
        title="Affiliate analytics coming soon"
        description="Share your referral link to start earning rewards." 
        cta="Copy affiliate link"
      />
    </div>
  );
}
