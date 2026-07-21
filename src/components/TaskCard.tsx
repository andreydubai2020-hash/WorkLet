import type { SphereMeta, Task } from "../types";

interface TaskCardProps {
  task: Task;
  sphere: SphereMeta;
  onClick: () => void;
}

export function TaskCard({ task, sphere, onClick }: TaskCardProps) {
  return (
    <div
      onClick={onClick}
      className="hover-lift cursor-pointer rounded-2xl bg-[#F5F5F7] p-[18px]"
      style={{ borderLeft: `4px solid ${sphere.dot}` }}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <div
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ background: sphere.bg, color: sphere.color }}
        >
          {sphere.label}
        </div>
        <div className="text-[13px] font-medium text-[#86868B]">{task.company}</div>
      </div>
      <div className="mb-2 text-[17px] font-semibold tracking-tight">{task.title}</div>
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        <div className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold">
          {task.level}
        </div>
        {task.skills.map((skill) => (
          <div key={skill} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold">
            {skill}
          </div>
        ))}
        <div className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold">
          {task.hours}
        </div>
        {task.intern && (
          <div className="rounded-full bg-[#E8F1FD] px-2.5 py-1 text-[11px] font-semibold text-[#0071E3]">
            Стажировка
          </div>
        )}
      </div>
      <div className="mb-3.5 text-sm leading-relaxed text-[#86868B]">{task.desc}</div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#86868B]">
          {task.taken}/{task.total} мест
        </div>
        <button
          type="button"
          className="hover-lift hover-lift-shadow-blue cursor-pointer rounded-full bg-[#0071E3] px-[18px] py-2.5 text-[13px] font-semibold text-white"
        >
          Взять
        </button>
      </div>
    </div>
  );
}
