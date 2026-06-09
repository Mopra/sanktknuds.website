import { cn } from '@/lib/cn';

type TastingGroup = { name: string; items: readonly string[] };

export function TastingGroups({
  groups,
  className,
}: {
  groups: readonly TastingGroup[];
  className?: string;
}) {
  return (
    <div className={cn('gap-x-16 md:columns-2', className)}>
      {groups.map((group) => (
        <div key={group.name} className="mb-10 break-inside-avoid">
          <div className="flex items-baseline gap-4">
            <h3 className="font-display text-xl tracking-tight text-parchment md:text-2xl">
              {group.name}
            </h3>
            <span aria-hidden="true" className="h-px flex-1 bg-stone/20" />
          </div>
          {group.items.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed">
                  <span aria-hidden="true" className="select-none text-ember/60">
                    —
                  </span>
                  <span className="text-parchment/65">{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
