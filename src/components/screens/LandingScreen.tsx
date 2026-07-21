import { Logo } from "../Logo";
import { StatBlock } from "../StatBlock";
import { useAppStore } from "../../store/useAppStore";
import { allTasks, companyBenefits, sphereMeta, stats, steps } from "../../store/mockData";

const heroFeedPreview = allTasks.slice(0, 3).map((t) => ({
  sphereLabel: sphereMeta[t.sphere].label,
  sphereBg: sphereMeta[t.sphere].bg,
  sphereColor: sphereMeta[t.sphere].color,
  company: t.company,
  title: t.title,
}));

const heroFunnel = [
  { label: "Опубликовано", pct: "100%" },
  { label: "Сдач получено", pct: "70%" },
  { label: "Приглашено", pct: "35%" },
];

export function LandingScreen() {
  const go = useAppStore((s) => s.go);
  const goCompanyAuth = useAppStore((s) => s.goCompanyAuth);
  const companyTasks = useAppStore((s) => s.companyTasks);
  const submissionsByTask = useAppStore((s) => s.submissionsByTask);
  const invitesList = useAppStore((s) => s.invitesList);

  const allSubs = Object.values(submissionsByTask).flat();
  const heroDashStats = [
    { value: companyTasks.filter((t) => t.status !== "completed").length, label: "активные задачи" },
    { value: allSubs.length, label: "сдач получено" },
    { value: invitesList.length, label: "приглашений" },
    {
      value: Math.round(allSubs.reduce((a, x) => a + x.score, 0) / Math.max(1, allSubs.length)),
      label: "средняя оценка",
    },
  ];

  return (
    <div className="px-5 pb-10">
      <div className="mb-7 text-center">
        <Logo className="mb-1.5 block text-[22px]" />
        <div className="text-[13px] font-semibold text-[#0071E3]">
          Микро-стажировки для студентов
        </div>
      </div>

      <h1 className="mb-3.5 text-center text-[32px] font-bold leading-[1.12] tracking-tight">
        Опыт — это продукт.
        <br />
        Заработай его.
      </h1>
      <p className="mb-6 text-center text-base leading-relaxed text-[#86868B]">
        Казахстанские компании выкладывают реальные задачи, ты их выполняешь и получаешь
        верифицированный кейс в профиль.
      </p>

      <div className="mb-7 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => go("auth")}
          className="specular-btn hover-lift hover-lift-shadow-blue w-full cursor-pointer rounded-full bg-[#0071E3] p-3.5 text-center text-base font-semibold text-white"
        >
          Начать
        </button>
        <button
          type="button"
          onClick={goCompanyAuth}
          className="hover-lift cursor-pointer text-[15px] font-semibold text-[#0071E3]"
        >
          Для компаний →
        </button>
      </div>

      <div className="mb-4 overflow-hidden rounded-[20px] bg-[#F5F5F7] shadow-[0_12px_32px_rgba(0,0,0,0.10)]">
        <div className="flex h-9 items-center gap-1.5 bg-[#EDEDED] px-3">
          <div className="h-[9px] w-[9px] rounded-full bg-[#FF5F57]" />
          <div className="h-[9px] w-[9px] rounded-full bg-[#FEBC2E]" />
          <div className="h-[9px] w-[9px] rounded-full bg-[#28C840]" />
          <div className="ml-1.5 text-[11px] font-semibold text-[#86868B]">Для студентов</div>
        </div>
        <div className="flex flex-col gap-2 bg-white p-3.5">
          {heroFeedPreview.map((hf) => (
            <div key={hf.title} className="rounded-xl bg-[#F5F5F7] px-3 py-2.5">
              <div className="mb-1 flex items-center gap-1.5">
                <div
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ background: hf.sphereBg, color: hf.sphereColor }}
                >
                  {hf.sphereLabel}
                </div>
                <div className="text-[11px] text-[#86868B]">{hf.company}</div>
              </div>
              <div className="text-[13px] font-semibold">{hf.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-9 overflow-hidden rounded-[20px] bg-[#F5F5F7] shadow-[0_12px_32px_rgba(0,0,0,0.10)]">
        <div className="flex h-9 items-center gap-1.5 bg-[#EDEDED] px-3">
          <div className="h-[9px] w-[9px] rounded-full bg-[#FF5F57]" />
          <div className="h-[9px] w-[9px] rounded-full bg-[#FEBC2E]" />
          <div className="h-[9px] w-[9px] rounded-full bg-[#28C840]" />
          <div className="ml-1.5 text-[11px] font-semibold text-[#86868B]">
            Для компаний — дашборд
          </div>
        </div>
        <div className="bg-white p-3.5">
          <div className="mb-2.5 grid grid-cols-2 gap-2">
            {heroDashStats.map((ds) => (
              <div key={ds.label} className="rounded-[10px] bg-[#F5F5F7] px-3 py-2.5">
                <div className="text-base font-bold tracking-tight">{ds.value}</div>
                <div className="mt-px text-[10px] text-[#86868B]">{ds.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-[10px] bg-[#F5F5F7] px-3 py-2.5">
            {heroFunnel.map((fs) => (
              <div key={fs.label} className="mb-1.5 flex items-center gap-2 last:mb-0">
                <div className="w-16 flex-shrink-0 text-[10px] text-[#86868B]">{fs.label}</div>
                <div className="h-1.5 flex-1 overflow-hidden rounded-[3px] bg-[#EDEDED]">
                  <div className="h-full bg-[#0071E3]" style={{ width: fs.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5 text-center text-[22px] font-bold tracking-tight">
        Как это работает
      </div>
      <div className="mb-9 flex flex-col gap-3.5">
        {steps.map((step) => (
          <div key={step.num} className="rounded-[18px] bg-[#F5F5F7] p-5">
            <div className="mb-2 text-[13px] font-bold text-[#0071E3]">{step.num}</div>
            <div className="mb-1.5 text-lg font-semibold tracking-tight">{step.title}</div>
            <div className="text-sm leading-relaxed text-[#86868B]">{step.desc}</div>
          </div>
        ))}
      </div>

      <div className="mb-5 text-[22px] font-bold leading-tight tracking-tight">
        Задача — это и есть собеседование
      </div>
      <div className="mb-9 flex flex-col gap-4.5">
        {companyBenefits.map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-[#0071E3] text-xs font-bold text-white">
              ✓
            </div>
            <div>
              <div className="mb-[3px] text-base font-semibold">{b.title}</div>
              <div className="text-sm leading-relaxed text-[#86868B]">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex justify-between rounded-[20px] bg-[#F5F5F7] px-3 py-6 text-center">
        {stats.map((s) => (
          <StatBlock key={s.label} numeric={s.numeric} label={s.label} size="lg" />
        ))}
      </div>

      <Logo className="mx-auto mb-3.5 block text-center text-base opacity-85" />
      <div className="border-t border-black/[0.08] pt-5 text-center">
        <div className="text-xs text-[#86868B]">© 2026 Worklet · Алматы, Казахстан</div>
      </div>
    </div>
  );
}
