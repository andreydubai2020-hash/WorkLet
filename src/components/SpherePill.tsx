interface SpherePillProps {
  label: string;
  bg: string;
  color: string;
  dotColor: string;
  onClick: () => void;
}

export function SpherePill({ label, bg, color, dotColor, onClick }: SpherePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover-lift flex flex-shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold"
      style={{ background: bg, color }}
    >
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: dotColor }} />
      {label}
    </button>
  );
}
