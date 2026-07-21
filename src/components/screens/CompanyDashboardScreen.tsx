import { useAppStore } from "../../store/useAppStore";
import type { CompanyTaskStatus, KanbanFilter } from "../../types";

const statusMeta: Record<CompanyTaskStatus, { bg: string; color: string }> = {
  published: { bg: "#E8F1FD", color: "#0071E3" },
  has_submissions: { bg: "#FDF3E7", color: "#8A5A00" },
  completed: { bg: "#EAF7EE", color: "#1D6B33" },
};

const statusLabel = (status: CompanyTaskStatus, submissionsCount: number) => {
  if (status === "published") return "Опубликована";
  if (status === "has_submissions") return `Есть сдачи (${submissionsCount})`;
  return "Завершена";
};

const kanbanDefs: { key: KanbanFilter; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "published", label: "Открытые" },
  { key: "has_submissions", label: "На ревью" },
  { key: "completed", label: "Закрытые" },
];

export function CompanyDashboardScreen() {
  const companyTasks = useAppStore((s) => s.companyTasks);
  const submissionsByTask = useAppStore((s) => s.submissionsByTask);
  const invitesList = useAppStore((s) => s.invitesList);
  const freeTasksLeft = useAppStore((s) => s.freeTasksLeft);
  const kanbanFilter = useAppStore((s) => s.kanbanFilter);
  const setKanbanFilter = useAppStore((s) => s.setKanbanFilter);
  const go = useAppStore((s) => s.go);
  const goCompanyInvites = useAppStore((s) => s.goCompanyInvites);
  const selectCompanyTask = useAppStore((s) => s.selectCompanyTask);
  const duplicateCompanyTask = useAppStore((s) => s.duplicateCompanyTask);
  const closeCompanyTaskEarly = useAppStore((s) => s.closeCompanyTaskEarly);

  const allSubs = Object.values(submissionsByTask).flat();
  const dashStats = [
    { value: companyTasks.filter((t) => t.status !== "completed").length, label: "активные задачи" },
    { value: allSubs.length, label: "сдач за неделю" },
    {
      value: `${invitesList.length} / ${invitesList.filter((i) => i.status === "accepted").length}`,
      label: "приглашений отправлено/принято",
    },
    {
      value: Math.round(allSubs.reduce((a, x) => a + x.score, 0) / Math.max(1, allSubs.length)),
      label: "средняя оценка сдач",
    },
  ];

  const attentionTasks = companyTasks.filter((t) => t.status === "has_submissions");

  const published = companyTasks.length;
  const received = allSubs.length;
  const accepted = allSubs.filter((x) => x.status === "accepted" || x.status === "invited").length;
  const invited = invitesList.length;
  const onboarded = invitesList.filter((i) => i.status === "accepted").length;
  const max = Math.max(published, received, 1);
  const funnelSteps = [
    { label: "Опубликовано", value: published },
    { label: "Сдач получено", value: received },
    { label: "Принято", value: accepted },
    { label: "Приглашено", value: invited },
    { label: "Стажировка", value: onboarded },
  ].map((f) => ({ ...f, pct: `${(f.value / max) * 100}%` }));

  const visibleTasks = companyTasks.filter(
    (t) => kanbanFilter === "all" || t.status === kanbanFilter,
  );

  return (
    <div className="px-5 pb-10 pt-1">
      <div className="mb-4 text-[28px] font-bold tracking-tight">Дашборд</div>

      <div className="mb-5 grid grid-cols-2 gap-2.5">
        {dashStats.map((ds) => (
          <div key={ds.label} className="rounded-2xl bg-[#F5F5F7] px-4 py-3.5">
            <div className="text-[22px] font-bold tracking-tight">{ds.value}</div>
            <div className="mt-0.5 text-xs leading-tight text-[#86868B]">{ds.label}</div>
          </div>
        ))}
      </div>

      {attentionTasks.length > 0 && (
        <>
          <div className="mb-2.5 text-base font-semibold">Требуют внимания</div>
          <div className="mb-6 flex flex-col gap-2">
            {attentionTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => selectCompanyTask(t.id)}
                className="hover-lift cursor-pointer rounded-[14px] bg-[#FDF3E7] px-4 py-3.5"
              >
                <div className="mb-0.5 text-sm font-semibold">{t.title}</div>
                <div className="text-xs text-[#8A5A00]">
                  {(submissionsByTask[t.id] ?? []).length} сдач ждут решения
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mb-2.5 text-base font-semibold">Воронка найма</div>
      <div className="mb-6 rounded-2xl bg-[#F5F5F7] p-4">
        {funnelSteps.map((fs) => (
          <div key={fs.label} className="mb-2 flex items-center gap-2.5 last:mb-0">
            <div className="w-24 flex-shrink-0 text-xs text-[#86868B]">{fs.label}</div>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EDEDED]">
              <div
                className="h-full bg-[#0071E3] transition-[width] duration-400 ease-out"
                style={{ width: fs.pct }}
              />
            </div>
            <div className="w-5 flex-shrink-0 text-right text-[13px] font-semibold">{fs.value}</div>
          </div>
        ))}
      </div>

      <div className="mb-1.5 flex items-center justify-between">
        <div className="text-base font-semibold">Мои задачи</div>
        <button
          type="button"
          onClick={goCompanyInvites}
          className="hover-lift cursor-pointer text-[13px] font-semibold text-[#0071E3]"
        >
          Приглашения →
        </button>
      </div>
      <div className="mb-3.5 text-[13px] text-[#86868B]">
        {freeTasksLeft} бесплатные задачи в этом месяце
      </div>

      <button
        type="button"
        onClick={() => go("companyCreate")}
        className="hover-lift hover-lift-shadow-blue mb-4 w-full cursor-pointer rounded-full bg-[#0071E3] p-3.5 text-center text-[15px] font-semibold text-white"
      >
        + Новая задача
      </button>

      <div className="no-scrollbar -mx-5 mb-3.5 flex gap-2 overflow-x-auto px-5 pb-1">
        {kanbanDefs.map((kc) => {
          const active = kanbanFilter === kc.key;
          const count =
            kc.key === "all"
              ? companyTasks.length
              : companyTasks.filter((t) => t.status === kc.key).length;
          return (
            <button
              type="button"
              key={kc.key}
              onClick={() => setKanbanFilter(kc.key)}
              className="hover-lift flex-shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold cursor-pointer"
              style={{ background: active ? "#0071E3" : "#F5F5F7", color: active ? "#fff" : "#1D1D1F" }}
            >
              {kc.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {visibleTasks.map((task) => {
          const submissionsCount = (submissionsByTask[task.id] ?? []).length;
          const meta = statusMeta[task.status];
          return (
            <div key={task.id} className="hover-lift rounded-[18px] bg-[#F5F5F7] p-[18px]">
              <div
                onClick={() => selectCompanyTask(task.id)}
                className="mb-2 flex cursor-pointer items-center justify-between"
              >
                <div className="text-base font-semibold">{task.title}</div>
                <div
                  className="flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: meta.bg, color: meta.color }}
                >
                  {statusLabel(task.status, submissionsCount)}
                </div>
              </div>
              <div
                onClick={() => selectCompanyTask(task.id)}
                className="mb-2.5 cursor-pointer text-[13px] text-[#86868B]"
              >
                {task.taken}/{task.total} мест взято · {submissionsCount} сдач · {task.deadlineText}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => duplicateCompanyTask(task.id)}
                  className="cursor-pointer text-xs font-semibold text-[#0071E3]"
                >
                  Дублировать
                </button>
                {task.status !== "completed" && (
                  <button
                    type="button"
                    onClick={() => closeCompanyTaskEarly(task.id)}
                    className="cursor-pointer text-xs font-semibold text-[#C0392B]"
                  >
                    Закрыть досрочно
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
