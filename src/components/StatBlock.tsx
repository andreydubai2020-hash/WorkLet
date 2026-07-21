import { CountUp } from "./CountUp";

interface StatBlockProps {
  numeric: number;
  label: string;
  size?: "sm" | "lg";
}

export function StatBlock({ numeric, label, size = "sm" }: StatBlockProps) {
  const numberClass =
    size === "lg"
      ? "text-[22px] font-bold tracking-tight text-[#0071E3]"
      : "text-2xl font-bold tracking-tight text-[#1D1D1F]";
  return (
    <div className="flex-1 text-center">
      <div className={numberClass}>
        <CountUp to={numeric} duration={1.5} separator=" " />
      </div>
      <div className="mt-1 text-[11px] leading-tight text-[#86868B]">{label}</div>
    </div>
  );
}
