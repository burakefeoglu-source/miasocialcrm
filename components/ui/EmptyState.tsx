export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-sm font-medium">{title}</div>
      {description && <div className="text-sm text-mute mt-1">{description}</div>}
    </div>
  );
}
