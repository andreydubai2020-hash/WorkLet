import { Logo } from "../Logo";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { useAppStore } from "../../store/useAppStore";

export function AuthScreen() {
  const authRole = useAppStore((s) => s.authRole);
  const authMode = useAppStore((s) => s.authMode);
  const setAuthRole = useAppStore((s) => s.setAuthRole);
  const toggleAuthMode = useAppStore((s) => s.toggleAuthMode);
  const submitAuth = useAppStore((s) => s.submitAuth);

  const isCompany = authRole === "company";

  return (
    <div className="flex flex-col items-center px-6 py-10">
      <Logo className="mb-9 text-[30px]" />

      <div className="relative mb-7 flex w-full rounded-full bg-[#F5F5F7] p-1">
        <div
          className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-transform duration-300"
          style={{ transform: isCompany ? "translateX(100%)" : "translateX(0)" }}
        />
        <button
          type="button"
          onClick={() => setAuthRole("student")}
          className="relative z-10 flex-1 cursor-pointer py-2.5 text-center text-sm font-semibold transition-colors"
          style={{ color: !isCompany ? "#1D1D1F" : "#86868B" }}
        >
          Я студент
        </button>
        <button
          type="button"
          onClick={() => setAuthRole("company")}
          className="relative z-10 flex-1 cursor-pointer py-2.5 text-center text-sm font-semibold transition-colors"
          style={{ color: isCompany ? "#1D1D1F" : "#86868B" }}
        >
          Я компания
        </button>
      </div>

      <div className="mb-5 flex w-full flex-col gap-3">
        <div className="box-border w-full rounded-xl bg-[#F5F5F7] px-4 py-3.5 text-[15px] text-[#86868B]">
          Email
        </div>
        <div className="box-border w-full rounded-xl bg-[#F5F5F7] px-4 py-3.5 text-[15px] text-[#86868B]">
          Пароль
        </div>
      </div>

      <PrimaryButton onClick={submitAuth} className="mb-3.5">
        {authMode === "register" ? "Зарегистрироваться" : "Войти"}
      </PrimaryButton>

      <SecondaryButton onClick={submitAuth} className="flex items-center justify-center gap-2">
        <span
          className="h-4 w-4 rounded"
          style={{
            background:
              "linear-gradient(135deg,#4285F4,#34A853 50%,#FBBC05 75%,#EA4335)",
          }}
        />
        Продолжить с Google
      </SecondaryButton>

      <div className="mt-6 text-[13px] text-[#86868B]">
        {authMode === "register" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}{" "}
        <span
          onClick={toggleAuthMode}
          className="hover-lift inline-block cursor-pointer font-semibold text-[#0071E3]"
        >
          {authMode === "register" ? "Войти" : "Зарегистрироваться"}
        </span>
      </div>
    </div>
  );
}
