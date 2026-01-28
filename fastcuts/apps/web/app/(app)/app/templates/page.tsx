import { EmptyState } from '@/components/empty-state';

export default function TemplatesPage() {
  return (
    <div className="max-w-3xl">
      <EmptyState
        title="Template library is empty"
        description="Design your first premium template to streamline future edits."
        cta="Create a template"
      />
    </div>
  );
}
