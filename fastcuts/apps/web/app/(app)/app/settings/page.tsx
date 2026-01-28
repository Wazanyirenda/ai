import { EmptyState } from '@/components/empty-state';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <EmptyState
        title="Personalize your workspace"
        description="Update branding, members, and billing in one place."
        cta="Open settings"
      />
    </div>
  );
}
