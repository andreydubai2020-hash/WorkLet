interface FilterOption {
  label: string;
  selected: boolean;
  onClick: () => void;
}

interface FilterDropdownProps {
  options: FilterOption[];
  onDone: () => void;
}

export function FilterDropdown({ options, onDone }: FilterDropdownProps) {
  return (
    <div className="my-2.5 flex flex-col gap-0.5 rounded-2xl bg-[#F5F5F7] p-3.5">
      {options.map((opt) => (
        <div
          key={opt.label}
          onClick={opt.onClick}
          className={`box-border flex h-12 cursor-pointer items-center gap-3.5 rounded-xl border-2 px-3.5 transition-colors hover:bg-[#EFEFF1] ${
            opt.selected ? "bg-[#EAF2FE] border-[#0071E3]" : "border-transparent"
          }`}
        >
          <div
            className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-2 ${
              opt.selected
                ? "animate-radio-pulse border-[#0071E3] bg-[#0071E3]"
                : "border-[#C7C7CC] bg-[#F5F5F7]"
            }`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full bg-white transition-transform duration-150 ${
                opt.selected ? "scale-100" : "scale-0"
              }`}
            />
          </div>
          <div className="text-sm text-[#1D1D1F]">{opt.label}</div>
        </div>
      ))}
      <div
        onClick={onDone}
        className="hover-lift cursor-pointer pt-2.5 pb-0.5 text-center text-[13px] font-semibold text-[#0071E3]"
      >
        Готово
      </div>
    </div>
  );
}
