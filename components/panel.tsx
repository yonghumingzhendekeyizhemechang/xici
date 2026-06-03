import type { ReactNode } from "react";

export function Panel({
  title,
  aside,
  children
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="panel">
      <div className="panel-title">
        <span>{title}</span>
        {aside ? <span>{aside}</span> : null}
      </div>
      <div className="panel-body">{children}</div>
    </section>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <div className="notice">{children}</div>;
}
