import { useAppStore } from "../../store/useAppStore";
import { candidateCases, candidateStats, sphereMeta, stackPills } from "../../store/mockData";

export function CompanyCandidateScreen() {
  const selectedCandidateName = useAppStore((s) => s.selectedCandidateName);
  const selectedSphere = useAppStore((s) => s.selectedSphere);
  const favCandidates = useAppStore((s) => s.favCandidates);
  const goBackFromCandidate = useAppStore((s) => s.goBackFromCandidate);
  const toggleFav = useAppStore((s) => s.toggleFav);

  const name = selectedCandidateName ?? "Азамат Ниязов";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  const isFav = favCandidates.includes(name);
  const sphereLabel = selectedSphere === "all" ? "IT" : sphereMeta[selectedSphere].label;

  return (
    <div className="px-5 pb-10 pt-1">
      <button
        type="button"
        onClick={goBackFromCandidate}
        className="hover-lift mb-3.5 cursor-pointer text-[13px] font-semibold text-[#0071E3]"
      >
        ← Назад
      </button>

      <div className="mb-5 flex flex-col items-center text-center">
        <div className="mb-3 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#F5F5F7] text-[26px] font-bold text-[#86868B]">
          {initials}
        </div>
        <div className="mb-1.5 text-[22px] font-bold tracking-tight">{name}</div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {stackPills.map((sp) => (
            <div key={sp} className="rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-medium">
              {sp}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 rounded-2xl bg-[#E8F1FD] p-4">
        <div className="text-[13px] font-semibold text-[#0071E3]">
          Этот студент силён в {sphereLabel}, у него несколько принятых задач в этой сфере.
        </div>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2.5 rounded-[18px] bg-[#F5F5F7] p-[18px]">
        <div className="text-center">
          <div className="text-[22px] font-bold tracking-tight">{candidateStats.total}</div>
          <div className="mt-0.5 text-[11px] text-[#86868B]">кейсов</div>
        </div>
        <div className="text-center">
          <div className="text-[22px] font-bold tracking-tight">{candidateStats.avg}</div>
          <div className="mt-0.5 text-[11px] text-[#86868B]">ср. балл</div>
        </div>
        <div className="text-center">
          <div className="text-[22px] font-bold tracking-tight">{candidateStats.trend}</div>
          <div className="mt-0.5 text-[11px] text-[#86868B]">динамика</div>
        </div>
      </div>

      <div className="mb-2.5 text-base font-semibold">Верифицированные кейсы</div>
      <div className="mb-6 flex flex-col gap-2">
        {candidateCases.map((cc) => (
          <div key={cc.title} className="rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
            <div className="mb-0.5 text-sm font-semibold">{cc.title}</div>
            <div className="text-xs text-[#86868B]">
              {cc.company} · {cc.score}/100
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => toggleFav(name)}
          className="hover-lift flex-1 cursor-pointer rounded-full py-3 text-center text-sm font-semibold text-white"
          style={{ background: isFav ? "#0071E3" : "#86868B" }}
        >
          {isFav ? "★ В избранном" : "☆ В избранное"}
        </button>
        <button
          type="button"
          className="hover-lift hover-lift-shadow-blue flex-1 cursor-pointer rounded-full bg-[#0071E3] py-3 text-center text-sm font-semibold text-white"
        >
          Пригласить на стажировку
        </button>
      </div>
    </div>
  );
}
