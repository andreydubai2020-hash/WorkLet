import { useAppStore } from "../../store/useAppStore";

export function CompanyTalentPoolScreen() {
  const favCandidates = useAppStore((s) => s.favCandidates);
  const submissionsByTask = useAppStore((s) => s.submissionsByTask);
  const openCandidateProfile = useAppStore((s) => s.openCandidateProfile);

  const allSubs = Object.values(submissionsByTask).flat();
  const poolCandidates = favCandidates.map((name) => {
    const match = allSubs.find((x) => x.name === name);
    return { name, score: match?.score ?? 85 };
  });

  return (
    <div className="px-5 pb-10 pt-1">
      <div className="mb-1.5 text-[28px] font-bold tracking-tight">Банк талантов</div>
      <div className="mb-4.5 text-[13px] text-[#86868B]">
        Сохранённые кандидаты — приглашай без публикации новой задачи.
      </div>

      {poolCandidates.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          {poolCandidates.map((pc) => (
            <div key={pc.name} className="hover-lift rounded-2xl bg-[#F5F5F7] p-4">
              <div
                onClick={() => openCandidateProfile(pc.name, "companyTalentPool")}
                className="mb-1.5 flex cursor-pointer items-center justify-between"
              >
                <div className="text-[15px] font-semibold">{pc.name}</div>
                <div className="text-[13px] font-bold text-[#0071E3]">{pc.score}/100</div>
              </div>
              <div className="mb-2.5 flex flex-wrap gap-1.5">
                {["на лето", "фронт"].map((tg) => (
                  <div key={tg} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold">
                    {tg}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => alert(`Приглашение отправлено: ${pc.name}`)}
                className="w-full cursor-pointer rounded-full bg-[#0071E3] py-2.5 text-center text-[13px] font-semibold text-white"
              >
                Пригласить
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-3 py-10 text-center text-sm leading-relaxed text-[#86868B]">
          Пока пусто — добавляй кандидатов из сдач кнопкой «В избранное».
        </div>
      )}
    </div>
  );
}
