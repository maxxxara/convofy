import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
        <h1 className="mb-[4px] text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-md">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
