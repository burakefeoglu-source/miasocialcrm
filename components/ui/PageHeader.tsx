export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="font-display text-[26px] font-medium leading-tight">{title}</h1>
        {description && <p className="text-sm text-mute mt-1">{description}</p>}
      </div>
      {actions}
    </div>
  );
}
