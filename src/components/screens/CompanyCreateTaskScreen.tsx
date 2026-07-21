import { useAppStore } from "../../store/useAppStore";
import {
  createDeadline,
  draftGoal,
  draftTitle,
  sphereDefs,
  sphereMeta,
  templatesBySphere,
} from "../../store/mockData";
import { SpherePill } from "../SpherePill";
import type { SphereKey } from "../../types";

export function CompanyCreateTaskScreen() {
  const createStep = useAppStore((s) => s.createStep);
  const createSpots = useAppStore((s) => s.createSpots);
  const createIntern = useAppStore((s) => s.createIntern);
  const createSphere = useAppStore((s) => s.createSphere);
  const createMode = useAppStore((s) => s.createMode);
  const createPrivacy = useAppStore((s) => s.createPrivacy);
  const draftCriteriaList = useAppStore((s) => s.draftCriteriaList);
  const draftDifficulty = useAppStore((s) => s.draftDifficulty);
  const draftTaskText = useAppStore((s) => s.draftTaskText);
  const setCreateSphere = useAppStore((s) => s.setCreateSphere);
  const setDraftTaskText = useAppStore((s) => s.setDraftTaskText);
  const generateSpec = useAppStore((s) => s.generateSpec);
  const decSpots = useAppStore((s) => s.decSpots);
  const incSpots = useAppStore((s) => s.incSpots);
  const toggleCreateIntern = useAppStore((s) => s.toggleCreateIntern);
  const removeCriterion = useAppStore((s) => s.removeCriterion);
  const cycleDifficulty = useAppStore((s) => s.cycleDifficulty);
  const goCreateStep3 = useAppStore((s) => s.goCreateStep3);
  const toggleCreateMode = useAppStore((s) => s.toggleCreateMode);
  const toggleCreatePrivacy = useAppStore((s) => s.toggleCreatePrivacy);
  const publishTask = useAppStore((s) => s.publishTask);

  const taskTemplates = templatesBySphere[createSphere] ?? [];

  return (
    <div className="px-5 pb-10 pt-1">
      <div className="mb-4 text-2xl font-bold tracking-tight">Новая задача</div>

      {createStep === 1 && (
        <>
          <div className="mb-2 text-[13px] font-semibold text-[#86868B]">Тип задачи</div>
          <div className="no-scrollbar -mx-5 mb-4.5 flex gap-2 overflow-x-auto px-5 pb-1">
            {sphereDefs
              .filter((sd) => sd.key !== "all")
              .map((sd) => {
                const key = sd.key as SphereKey;
                const active = createSphere === key;
                return (
                  <SpherePill
                    key={key}
                    label={sd.label}
                    bg={active ? sphereMeta[key].dot : sphereMeta[key].bg}
                    color={active ? "#fff" : sphereMeta[key].color}
                    dotColor={active ? "#fff" : sphereMeta[key].dot}
                    onClick={() => setCreateSphere(key)}
                  />
                );
              })}
          </div>

          <div className="mb-2 text-[13px] font-semibold text-[#86868B]">Шаблоны</div>
          <div className="mb-4 flex flex-col gap-2">
            {taskTemplates.map((tmpl) => (
              <button
                type="button"
                key={tmpl}
                onClick={() => setDraftTaskText(tmpl.toLowerCase())}
                className="cursor-pointer rounded-xl bg-[#F5F5F7] px-3.5 py-3 text-left text-sm font-medium transition-transform hover:-translate-y-0.5"
              >
                {tmpl}
              </button>
            ))}
          </div>

          <div className="mb-2.5 text-sm text-[#86868B]">
            Опишите задачу как в мессенджере — AI оформит её в структурированное ТЗ.
          </div>
          <div className="mb-5 min-h-[100px] rounded-2xl bg-[#F5F5F7] p-4 text-[15px] leading-relaxed">
            {draftTaskText}
          </div>
          <button
            type="button"
            onClick={generateSpec}
            className="hover-lift hover-lift-shadow-blue w-full cursor-pointer rounded-full bg-[#0071E3] p-3.5 text-center text-[15px] font-semibold text-white"
          >
            Сгенерировать ТЗ →
          </button>
        </>
      )}

      {createStep === 2 && (
        <>
          <div className="mb-1.5 text-xs font-semibold text-[#0071E3]">
            ✓ AI оформил ТЗ — критерии можно править
          </div>
          <div className="mb-3.5 rounded-2xl bg-[#F5F5F7] p-[18px]">
            <div className="mb-2.5 text-[17px] font-semibold">{draftTitle}</div>
            <div className="mb-1 text-[13px] font-semibold text-[#86868B]">Цель</div>
            <div className="mb-3 text-sm leading-relaxed">{draftGoal}</div>
            <div className="mb-1 text-[13px] font-semibold text-[#86868B]">
              Критерии приёмки
            </div>
            <div className="mb-3 flex flex-col gap-1.5">
              {draftCriteriaList.map((cr, i) => (
                <div
                  key={cr}
                  className="flex items-center gap-2 rounded-[10px] bg-white px-2.5 py-2"
                >
                  <div className="flex-1 text-sm leading-relaxed">{cr}</div>
                  <button
                    type="button"
                    onClick={() => removeCriterion(i)}
                    className="cursor-pointer px-1 text-sm text-[#C0392B]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={cycleDifficulty}
                className="cursor-pointer rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold"
              >
                {draftDifficulty}
              </button>
              <div className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold">
                6–8 ч
              </div>
            </div>
          </div>

          <div className="mb-2.5 flex items-center justify-between rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
            <div className="text-sm font-semibold">Мест</div>
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                onClick={decSpots}
                className="hover-lift flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-base font-semibold"
              >
                −
              </button>
              <div className="min-w-[14px] text-center text-[15px] font-semibold">
                {createSpots}
              </div>
              <button
                type="button"
                onClick={incSpots}
                className="hover-lift flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-base font-semibold"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={goCreateStep3}
            className="hover-lift hover-lift-shadow-blue mb-2.5 w-full cursor-pointer rounded-full bg-[#0071E3] p-3.5 text-center text-[15px] font-semibold text-white"
          >
            Далее — настройки →
          </button>
        </>
      )}

      {createStep === 3 && (
        <>
          <div className="mb-2.5 flex items-center justify-between rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
            <div className="text-sm font-semibold">Рассматриваем стажёров</div>
            <button
              type="button"
              onClick={toggleCreateIntern}
              className="relative h-[26px] w-11 cursor-pointer rounded-full transition-colors duration-200"
              style={{ background: createIntern ? "#0071E3" : "#D1D1D6" }}
            >
              <div
                className="absolute top-0.5 h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-all duration-200"
                style={{ left: createIntern ? "20px" : "2px" }}
              />
            </button>
          </div>

          <div className="mb-2.5 flex items-center justify-between rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
            <div className="text-sm font-semibold">Дедлайн сдачи</div>
            <div className="text-sm font-semibold text-[#0071E3]">{createDeadline}</div>
          </div>

          <div className="mb-2.5 flex items-center justify-between rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
            <div className="text-sm font-semibold">Режим</div>
            <button
              type="button"
              onClick={toggleCreateMode}
              className="cursor-pointer text-sm font-semibold text-[#0071E3]"
            >
              {createMode === "solo" ? "Соло" : "Пары"}
            </button>
          </div>

          <div className="mb-5 flex items-center justify-between rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
            <div className="text-sm font-semibold">Приватность</div>
            <button
              type="button"
              onClick={toggleCreatePrivacy}
              className="cursor-pointer text-sm font-semibold text-[#0071E3]"
            >
              {createPrivacy === "public" ? "Публичная" : "По инвайт-ссылке"}
            </button>
          </div>

          <button
            type="button"
            onClick={publishTask}
            className="hover-lift hover-lift-shadow-blue w-full cursor-pointer rounded-full bg-[#0071E3] p-3.5 text-center text-[15px] font-semibold text-white"
          >
            Опубликовать
          </button>
        </>
      )}
    </div>
  );
}
