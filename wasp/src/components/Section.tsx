import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export function Section({title, action, children} : SectionProps) {
  return (
    <section className="desktop:gap-2 flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-tekst-prva text-[17px] font-bold">{title}</h2>
        {action && (
          <span className="text-akcent shrink-0 text-sm font-semibold [&_a]:hover:underline">
            {action}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

export default Section;