import { useAppStore } from "../../store/useAppStore";
import { casesData, profileStats, stackPills } from "../../store/mockData";
import { StatBlock } from "../StatBlock";
import { CaseCard } from "../CaseCard";

export function StudentProfileScreen() {
  const caseExpanded = useAppStore((s) => s.caseExpanded);
  const toggleCase = useAppStore((s) => s.toggleCase);
  const linkCopied = useAppStore((s) => s.linkCopied);
  const copyLink = useAppStore((s) => s.copyLink);

  return (
    <div className="px-5 pb-10 pt-1">
      <div className="mb-5 flex flex-col items-center text-center">
        <div className="mb-3 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#F5F5F7] text-[26px] font-bold text-[#86868B]">
          АН
        </div>
        <div className="mb-1.5 text-[22px] font-bold tracking-tight">Азамат Ниязов</div>
        <div className="mb-2.5 rounded-full bg-[#E8F1FD] px-3 py-1 text-xs font-semibold text-[#0071E3]">
          Junior+
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {stackPills.map((sp) => (
            <div key={sp} className="rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-medium">
              {sp}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 rounded-[18px] bg-[#F5F5F7] p-5">
        {profileStats.map((ps) => (
          <StatBlock key={ps.label} numeric={ps.numeric} label={ps.label} />
        ))}
      </div>

      <div className="mb-7 flex gap-2.5">
        <button
          type="button"
          className="hover-lift hover-lift-shadow-blue flex-1 cursor-pointer rounded-full bg-[#0071E3] py-[11px] text-center text-[13px] font-semibold text-white"
        >
          Экспорт PDF
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="hover-lift hover-lift-shadow-soft flex-1 cursor-pointer rounded-full py-[11px] text-center text-[13px] font-semibold transition-colors duration-300"
          style={{
            background: linkCopied ? "#1D8A3D" : "#F5F5F7",
            color: linkCopied ? "#fff" : "#1D1D1F",
            transform: linkCopied ? "scale(1.06)" : "scale(1)",
          }}
        >
          <span className={linkCopied ? "animate-link-pop inline-block" : "inline-block"}>
            {linkCopied ? "Скопировано ✓" : "Ссылка"}
          </span>
        </button>
      </div>

      <div className="mb-3 text-lg font-semibold">Верифицированные кейсы</div>
      <div className="flex flex-col gap-2.5">
        {casesData.map((c, i) => (
          <CaseCard
            key={c.title}
            item={c}
            expanded={caseExpanded[i]}
            onToggle={() => toggleCase(i)}
          />
        ))}
      </div>
    </div>
  );
}
