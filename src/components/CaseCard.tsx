import type { CaseItem } from "../types";

interface CaseCardProps {
  item: CaseItem;
  expanded: boolean;
  onToggle: () => void;
}

export function CaseCard({ item, expanded, onToggle }: CaseCardProps) {
  return (
    <div
      onClick={onToggle}
      className="hover-lift cursor-pointer rounded-2xl bg-[#F5F5F7] p-[18px]"
    >
      <div className="flex items-center justify-between gap-2.5">
        <div>
          <div className="mb-[5px] text-[15px] font-semibold">{item.title}</div>
          <div className="text-[13px] text-[#86868B]">
            {item.score}/100 · <span className="font-semibold text-[#1D8A3D]">✓ Подтверждено</span>
          </div>
        </div>
        <div className="flex-shrink-0 text-lg text-[#86868B]">{expanded ? "▴" : "▾"}</div>
      </div>
      {expanded && (
        <div className="mt-3.5 border-t border-black/[0.08] pt-3.5 text-sm leading-relaxed">
          {item.description}
        </div>
      )}
    </div>
  );
}
