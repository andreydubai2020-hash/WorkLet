import { useAppStore } from "../../store/useAppStore";
import { allTasks, sphereMeta, submitBySphere } from "../../store/mockData";

export function TaskDetailScreen() {
  const selectedFeedTaskId = useAppStore((s) => s.selectedFeedTaskId);
  const go = useAppStore((s) => s.go);

  const task = allTasks.find((t) => t.id === selectedFeedTaskId) ?? allTasks[0];
  const sphere = sphereMeta[task.sphere];
  const submit = submitBySphere[task.sphere];

  return (
    <div className="relative flex flex-col">
      <div className="px-5 pb-[110px] pt-1">
        <button
          type="button"
          onClick={() => go("feed")}
          className="hover-lift mb-3.5 cursor-pointer text-[13px] font-semibold text-[#0071E3]"
        >
          ← Лента задач
        </button>

        <div className="mb-2.5 flex items-center gap-2">
          <div
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ background: sphere.bg, color: sphere.color }}
          >
            {sphere.label}
          </div>
          <div className="text-[13px] font-medium text-[#86868B]">{task.company}</div>
        </div>
        <div className="mb-3.5 text-[22px] font-bold leading-tight tracking-tight">
          {task.title}
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5">
          <div className="rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-semibold">
            {task.level}
          </div>
          {task.skills.map((skill) => (
            <div
              key={skill}
              className="rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-semibold"
            >
              {skill}
            </div>
          ))}
          <div className="rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-semibold">
            {task.hours}
          </div>
        </div>

        <div className="mb-2 text-base font-semibold">Задание</div>
        <div className="mb-4 text-sm leading-relaxed">{task.fullDesc}</div>

        <div className="mb-2.5 text-base font-semibold">Критерии приёмки</div>
        <div className="mb-5.5 flex flex-col gap-2">
          {task.criteria.map((cr) => (
            <div key={cr} className="flex items-start gap-2.5">
              <div className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 rounded-[5px] border-[1.5px] border-[#C7C7CC]" />
              <div className="text-sm leading-relaxed">{cr}</div>
            </div>
          ))}
        </div>

        <div className="mb-2.5 text-base font-semibold">Форма сдачи</div>
        <div className="mb-5.5 rounded-2xl bg-[#F5F5F7] p-4">
          <div className="mb-1.5 text-[13px] font-semibold text-[#86868B]">
            {submit.label}
          </div>
          <div className="mb-2.5 rounded-[10px] bg-white px-3.5 py-3 text-sm text-[#86868B]">
            {submit.placeholder}
          </div>
          {submit.upload && (
            <>
              <div className="mb-1.5 text-[13px] font-semibold text-[#86868B]">Файлы</div>
              <div className="mb-2.5 rounded-[10px] border-[1.5px] border-dashed border-[#C7C7CC] bg-white p-4 text-center text-[13px] text-[#86868B]">
                Перетащи файлы или нажми, чтобы загрузить
              </div>
            </>
          )}
          <div className="mb-1.5 text-[13px] font-semibold text-[#86868B]">Комментарий</div>
          <div className="min-h-[60px] rounded-[10px] bg-white px-3.5 py-3 text-sm text-[#86868B]">
            Что сделал и почему так…
          </div>
        </div>

        <div className="mb-2.5 text-base font-semibold">AI-ревью после сдачи</div>
        <div className="mb-2 flex items-center gap-4 rounded-2xl bg-[#F5F5F7] p-[18px]">
          <svg width="56" height="56" viewBox="0 0 120 120" className="flex-shrink-0 opacity-50">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E5E7" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#0071E3"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="339.3"
              strokeDashoffset="95"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="text-[13px] leading-relaxed text-[#86868B]">
            Оценка 0–100, разбор по критериям приёмки и советы, что улучшить — придёт сразу
            после сдачи.
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-black/[0.06] bg-white/90 px-5 py-3.5 pb-[30px] backdrop-blur-xl">
        <button
          type="button"
          className="hover-lift hover-lift-shadow-blue w-full cursor-pointer rounded-full bg-[#0071E3] p-3.5 text-center text-[15px] font-semibold text-white"
        >
          Взять задачу
        </button>
      </div>
    </div>
  );
}
