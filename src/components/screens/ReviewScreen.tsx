import { useAppStore } from "../../store/useAppStore";
import {
  codeSnippet,
  companyEvaluation,
  improvements,
  recommendations,
  strengths,
} from "../../store/mockData";
import { CountUp } from "../CountUp";

const CIRCUMFERENCE = 339.3;

export function ReviewScreen() {
  const ringScore = useAppStore((s) => s.ringScore);
  const codeCopied = useAppStore((s) => s.codeCopied);
  const copyCode = useAppStore((s) => s.copyCode);

  const ringOffset = CIRCUMFERENCE - (CIRCUMFERENCE * ringScore) / 100;

  return (
    <div className="px-5 pb-10 pt-1">
      <div className="mb-4 text-xl font-bold tracking-tight">AI-ревью решения</div>

      <div className="hover-lift hover-lift-shadow-dark mb-5 overflow-hidden rounded-[18px] bg-[#1D1D1F]">
        <div className="flex h-[38px] items-center gap-2 border-b border-white/[0.08] px-3.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF605C]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD44]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#00CA4E]" />
          </div>
          <div className="font-mono text-xs text-[#9A9AA0]">parser.py</div>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => copyCode(codeSnippet)}
            className="hover-lift cursor-pointer rounded-md px-2 py-1 text-xs font-semibold transition-colors"
            style={{ color: codeCopied ? "#34C759" : "#9A9AA0" }}
          >
            {codeCopied ? "Скопировано ✓" : "Копировать"}
          </button>
        </div>
        <div className="overflow-x-auto p-4">
          <pre className="whitespace-pre font-mono text-[11.5px] leading-relaxed text-[#D5D5D8]">
            {codeSnippet}
          </pre>
        </div>
      </div>

      <div className="mb-5 flex items-center gap-4.5 rounded-[18px] bg-[#F5F5F7] p-5.5">
        <svg width="84" height="84" viewBox="0 0 120 120" className="flex-shrink-0">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E5E7" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#0071E3"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={ringOffset}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 1.2s ease" }}
          />
        </svg>
        <div>
          <div className="flex items-baseline text-[32px] font-bold tracking-tight">
            <CountUp to={ringScore} duration={1.5} />
            <span className="text-base text-[#86868B]">/100</span>
          </div>
          <div className="mt-0.5 text-[13px] text-[#86868B]">AI-оценка решения</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm font-semibold">Сильные стороны</div>
        <div className="flex flex-col gap-1.5">
          {strengths.map((s) => (
            <div
              key={s}
              className="rounded-xl bg-[#EAF7EE] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#1D6B33]"
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm font-semibold">Что улучшить</div>
        <div className="flex flex-col gap-1.5">
          {improvements.map((s) => (
            <div
              key={s}
              className="rounded-xl bg-[#FDF3E7] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#8A5A00]"
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-2 text-sm font-semibold">Рекомендации</div>
        <div className="flex flex-col gap-1.5">
          {recommendations.map((s) => (
            <div
              key={s}
              className="rounded-xl bg-[#E8F1FD] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#0071E3]"
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 rounded-2xl bg-[#F5F5F7] px-[18px] py-4">
        <div className="mb-0.5 text-xs text-[#86868B]">Вердикт</div>
        <div className="text-[15px] font-semibold text-[#1D8A3D]">Передано компании</div>
      </div>

      <div className="mb-2 text-sm font-semibold">Оценка компании</div>
      <div className="mb-5 rounded-2xl bg-[#F5F5F7] p-[18px]">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[13px] font-bold">
              {companyEvaluation.initial}
            </div>
            <div className="text-sm font-semibold">{companyEvaluation.name}</div>
          </div>
          <div className="text-[15px] font-bold text-[#0071E3]">
            {companyEvaluation.score}/100
          </div>
        </div>
        <div className="text-sm leading-relaxed">{companyEvaluation.quote}</div>
      </div>
      <button
        type="button"
        className="hover-lift hover-lift-shadow-blue w-full cursor-pointer rounded-full bg-[#0071E3] p-3.5 text-center text-[15px] font-semibold text-white"
      >
        Пригласить на стажировку
      </button>
    </div>
  );
}
