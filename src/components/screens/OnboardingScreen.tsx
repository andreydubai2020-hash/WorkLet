import { useAppStore } from "../../store/useAppStore";
import { ageOptions, cityOptions, interestOptions } from "../../store/mockData";

export function OnboardingScreen() {
  const obStep = useAppStore((s) => s.obStep);
  const obAge = useAppStore((s) => s.obAge);
  const obCity = useAppStore((s) => s.obCity);
  const obInterests = useAppStore((s) => s.obInterests);
  const obSetAge = useAppStore((s) => s.obSetAge);
  const obSetCity = useAppStore((s) => s.obSetCity);
  const obToggleInterest = useAppStore((s) => s.obToggleInterest);
  const obNext = useAppStore((s) => s.obNext);
  const obBack = useAppStore((s) => s.obBack);

  return (
    <div className="px-6 pb-10 pt-6">
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center">
            <div
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
              style={{
                background: obStep >= n ? "#0071E3" : "#F5F5F7",
                color: obStep >= n ? "#fff" : "#86868B",
              }}
            >
              {obStep > n ? "✓" : n}
            </div>
            {n < 3 && (
              <div className="mx-1.5 h-0.5 flex-1 overflow-hidden bg-[#F0F0F2]">
                <div
                  className="h-full bg-[#0071E3] transition-[width] duration-400 ease-out"
                  style={{ width: obStep > n ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {obStep === 1 && (
        <>
          <div className="mb-2 text-[22px] font-bold tracking-tight">Сколько тебе лет?</div>
          <div className="mb-6 text-sm text-[#86868B]">
            Это поможет подбирать задачи, подходящие по уровню.
          </div>
          <div className="flex flex-wrap gap-2">
            {ageOptions.map((label) => (
              <button
                type="button"
                key={label}
                onClick={() => obSetAge(label)}
                className="hover-lift cursor-pointer rounded-full px-5 py-3 text-sm font-semibold transition-transform"
                style={{
                  background: obAge === label ? "#0071E3" : "#F5F5F7",
                  color: obAge === label ? "#fff" : "#1D1D1F",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {obStep === 2 && (
        <>
          <div className="mb-2 text-[22px] font-bold tracking-tight">В каком городе учишься?</div>
          <div className="mb-6 text-sm text-[#86868B]">
            Часть задач требует очного участия в мероприятиях компании.
          </div>
          <div className="flex flex-col gap-2">
            {cityOptions.map((label) => (
              <button
                type="button"
                key={label}
                onClick={() => obSetCity(label)}
                className="hover-lift cursor-pointer rounded-[14px] px-[18px] py-3.5 text-left text-[15px] font-semibold transition-transform"
                style={{
                  background: obCity === label ? "#0071E3" : "#F5F5F7",
                  color: obCity === label ? "#fff" : "#1D1D1F",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {obStep === 3 && (
        <>
          <div className="mb-2 text-[22px] font-bold tracking-tight">Что тебе интересно?</div>
          <div className="mb-6 text-sm text-[#86868B]">
            Выбери сферы — так лента будет точнее.
          </div>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((label) => {
              const active = obInterests.includes(label);
              return (
                <button
                  type="button"
                  key={label}
                  onClick={() => obToggleInterest(label)}
                  className="hover-lift cursor-pointer rounded-full px-4 py-2.5 text-[13px] font-semibold transition-transform"
                  style={{
                    background: active ? "#0071E3" : "#F5F5F7",
                    color: active ? "#fff" : "#1D1D1F",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </>
      )}

      <div
        className="mt-10 flex gap-3"
        style={{ justifyContent: obStep > 1 ? "space-between" : "flex-end" }}
      >
        {obStep > 1 && (
          <button
            type="button"
            onClick={obBack}
            className="cursor-pointer px-1.5 py-3.5 text-sm font-semibold text-[#86868B]"
          >
            Назад
          </button>
        )}
        <button
          type="button"
          onClick={obNext}
          className="hover-lift hover-lift-shadow-blue cursor-pointer rounded-full bg-[#0071E3] px-8 py-3.5 text-[15px] font-semibold text-white"
        >
          {obStep === 3 ? "Готово" : "Далее"}
        </button>
      </div>
    </div>
  );
}
