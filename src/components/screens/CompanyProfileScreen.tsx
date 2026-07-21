import { useAppStore } from "../../store/useAppStore";

export function CompanyProfileScreen() {
  const go = useAppStore((s) => s.go);
  const freeTasksLeft = useAppStore((s) => s.freeTasksLeft);

  return (
    <div className="px-5 pb-10 pt-1">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex h-[76px] w-[76px] items-center justify-center rounded-[20px] bg-[#F5F5F7] text-[26px] font-bold text-[#86868B]">
          AD
        </div>
        <div className="mb-1.5 text-[22px] font-bold tracking-tight">Aitu Digital</div>
        <div className="rounded-full bg-[#EAF7EE] px-3 py-1 text-xs font-semibold text-[#1D6B33]">
          ✓ Верифицирована
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-2.5">
        <div className="rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
          <div className="mb-0.5 text-xs text-[#86868B]">Город</div>
          <div className="text-[15px] font-medium">Алматы</div>
        </div>
        <div className="rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
          <div className="mb-0.5 text-xs text-[#86868B]">Сайт</div>
          <div className="text-[15px] font-medium text-[#0071E3]">aitudigital.kz</div>
        </div>
        <div className="rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
          <div className="mb-0.5 text-xs text-[#86868B]">О компании</div>
          <div className="text-[15px] font-medium leading-relaxed">
            Продуктовая команда, разрабатываем сервисы для казахстанского ритейла.
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 rounded-[18px] bg-[#F5F5F7] p-5">
        <div className="text-center">
          <div className="text-2xl font-bold tracking-tight">3</div>
          <div className="mt-1 text-xs text-[#86868B]">задачи опубликовано</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold tracking-tight">1</div>
          <div className="mt-1 text-xs text-[#86868B]">стажёр приглашён</div>
        </div>
      </div>

      <div className="mb-2 text-base font-semibold">Отзывы студентов</div>
      <div className="mb-6 rounded-2xl bg-[#F5F5F7] p-4">
        <div className="mb-1 text-xl text-[#FFB800]">★★★★★</div>
        <div className="text-[13px] text-[#86868B]">4.8 из 5 · 6 отзывов после закрытых задач</div>
      </div>

      <div className="mb-2 text-base font-semibold">Команда и настройки</div>
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
          <div className="text-sm font-medium">Тимлиды / роли (admin, reviewer)</div>
          <div className="hover-lift cursor-pointer text-[13px] font-semibold text-[#0071E3]">
            Управлять
          </div>
        </div>
        <div className="flex items-center justify-between rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
          <div className="text-sm font-medium">Тариф: {freeTasksLeft} бесплатные задачи/мес</div>
          <div className="hover-lift cursor-pointer text-[13px] font-semibold text-[#0071E3]">
            Апгрейд
          </div>
        </div>
        <div className="flex items-center justify-between rounded-[14px] bg-[#F5F5F7] px-4 py-3.5">
          <div className="text-sm font-medium">Уведомления в Telegram</div>
          <div className="text-[13px] font-semibold text-[#86868B]">Скоро</div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go("auth")}
        className="hover-lift w-full cursor-pointer text-center text-[13px] font-semibold text-[#0071E3]"
      >
        Сменить роль
      </button>
    </div>
  );
}
