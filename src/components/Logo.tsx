interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-[2px] font-extrabold tracking-tight text-[#1D1D1F] ${className}`}
    >
      Work<span className="text-[#0071E3]">let</span>
    </span>
  );
}
