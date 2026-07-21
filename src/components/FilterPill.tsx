interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`fpill hover-lift flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium cursor-pointer ${
        active ? "bg-[#0071E3] text-white" : "bg-[#F5F5F7] text-[#1D1D1F]"
      }`}
    >
      <span className="fpill-label" style={{ color: active ? "#fff" : "#1D1D1F" }}>
        {label} ▾
      </span>
    </button>
  );
}
