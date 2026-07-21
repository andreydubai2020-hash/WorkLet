import { useAppStore } from "../../store/useAppStore";

export function CompanySubmissionsScreen() {
  const selectedCompanyTaskId = useAppStore((s) => s.selectedCompanyTaskId);
  const companyTasks = useAppStore((s) => s.companyTasks);
  const submissionsByTask = useAppStore((s) => s.submissionsByTask);
  const draftCriteriaList = useAppStore((s) => s.draftCriteriaList);
  const favCandidates = useAppStore((s) => s.favCandidates);
  const go = useAppStore((s) => s.go);
  const updateSubmission = useAppStore((s) => s.updateSubmission);
  const bulkAcceptTop = useAppStore((s) => s.bulkAcceptTop);
  const toggleFav = useAppStore((s) => s.toggleFav);
  const openCandidateProfile = useAppStore((s) => s.openCandidateProfile);

  const task = companyTasks.find((t) => t.id === selectedCompanyTaskId);
  const list = selectedCompanyTaskId ? (submissionsByTask[selectedCompanyTaskId] ?? []) : [];

  const ranked = list
    .map((sub, idx) => ({ sub, idx }))
    .sort((a, b) => b.sub.score - a.sub.score);
  const rankOf: Record<number, number> = {};
  ranked.forEach((r, i) => {
    rankOf[r.idx] = i;
  });

  const aiVerdictText = (() => {
    const sorted = list.slice().sort((a, b) => b.score - a.score);
    if (sorted.length < 2) {
      return sorted.length ? `Рекомендую сдачу «${sorted[0].name}» — самая высокая оценка.` : "";
    }
    return `Рекомендую сдачи «${sorted[0].name}» и «${sorted[1].name}» — лучшие оценки и результаты по критериям.`;
  })();

  return (
    <div className="px-5 pb-10 pt-1">
      <button
        type="button"
        onClick={() => go("companyDashboard")}
        className="hover-lift mb-2.5 cursor-pointer text-[13px] font-semibold text-[#0071E3]"
      >
        ← Мои задачи
      </button>
      <div className="mb-3 text-[22px] font-bold tracking-tight">{task?.title ?? ""}</div>

      {list.length > 0 && (
        <>
          <div className="mb-4 rounded-[14px] bg-[#E8F1FD] px-4 py-3.5">
            <div className="text-[13px] font-semibold text-[#0071E3]">{aiVerdictText}</div>
          </div>
          <button
            type="button"
            onClick={bulkAcceptTop}
            className="hover-lift mb-4 w-full cursor-pointer rounded-full bg-[#1D8A3D] py-3 text-center text-[13px] font-semibold text-white"
          >
            ✓ Принять топ-1, остальным — фидбек
          </button>
        </>
      )}

      <div className="flex flex-col gap-3">
        {list.map((sub, idx) => {
          const recommended = rankOf[idx] < 2;
          const rankLabel = rankOf[idx] === 0 ? "лучшая сдача" : "топ-2";
          const isFav = favCandidates.includes(sub.name);
          return (
            <div
              key={sub.name}
              className="rounded-[18px] bg-[#F5F5F7] p-[18px]"
              style={{ border: `2px solid ${recommended ? "#0071E3" : "transparent"}` }}
            >
              {recommended && (
                <div className="mb-2 text-[11px] font-semibold text-[#0071E3]">
                  Рекомендуем — {rankLabel}
                </div>
              )}
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    openCandidateProfile(sub.name, "companySubmissions")
                  }
                  className="cursor-pointer text-base font-semibold"
                >
                  {sub.name}
                </button>
                <div className="text-[15px] font-bold text-[#0071E3]">{sub.score}/100</div>
              </div>
              <div className="mb-2.5 text-sm leading-relaxed text-[#1D1D1F]">{sub.summary}</div>

              <div className="mb-2.5 flex flex-col gap-1">
                {sub.criteria.map((ok, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="flex-shrink-0 text-xs"
                      style={{ color: ok ? "#1D8A3D" : "#C0392B" }}
                    >
                      {ok ? "✓" : "✕"}
                    </div>
                    <div className="text-xs text-[#86868B]">
                      {draftCriteriaList[i] ?? `Критерий ${i + 1}`}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => openCandidateProfile(sub.name, "companySubmissions")}
                  className="cursor-pointer text-[13px] text-[#0071E3]"
                >
                  Профиль
                </button>
                <div className="text-[13px] text-[#0071E3]">Код · Деплой</div>
                <button
                  type="button"
                  onClick={() => toggleFav(sub.name)}
                  className="cursor-pointer text-[13px]"
                  style={{ color: isFav ? "#0071E3" : "#86868B" }}
                >
                  {isFav ? "★ В избранном" : "☆ В избранное"}
                </button>
              </div>

              {sub.status === "pending" && (
                <>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        selectedCompanyTaskId &&
                        updateSubmission(selectedCompanyTaskId, idx, "accepted")
                      }
                      className="hover-lift flex-1 cursor-pointer rounded-full bg-[#1D8A3D] py-2.5 text-center text-[13px] font-semibold text-white"
                    >
                      ✓ Принять
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        selectedCompanyTaskId &&
                        updateSubmission(selectedCompanyTaskId, idx, "rejected")
                      }
                      className="hover-lift flex-1 cursor-pointer rounded-full bg-white py-2.5 text-center text-[13px] font-semibold text-[#C0392B]"
                    >
                      ✗ Отклонить
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      selectedCompanyTaskId &&
                      updateSubmission(selectedCompanyTaskId, idx, "invited")
                    }
                    className="hover-lift mt-2 w-full cursor-pointer rounded-full bg-[#0071E3] py-2.5 text-center text-[13px] font-semibold text-white"
                  >
                    Пригласить на стажировку
                  </button>
                </>
              )}
              {sub.status === "accepted" && (
                <div className="text-[13px] font-semibold text-[#1D8A3D]">
                  ✓ Принято — кейс создан в профиле
                </div>
              )}
              {sub.status === "rejected" && (
                <div className="text-[13px] font-semibold text-[#C0392B]">✗ Отклонено</div>
              )}
              {sub.status === "invited" && (
                <div className="text-[13px] font-semibold text-[#0071E3]">
                  Приглашение отправлено
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
