import { EmptyState } from '@/components/empty-state';

export default function ProjectsPage() {
  return (
    <div className="max-w-3xl">
      <EmptyState
        title="No projects yet"
        description="Upload a long-form video or paste a link to generate your first FastCuts project."
        cta="Create a project"
      />
    </div>
  );
}
