import { useAppStore } from "../../store/useAppStore";
import type { InviteStatus } from "../../types";

const statusMeta: Record<InviteStatus, { label: string; bg: string; color: string }> = {
  accepted: { label: "Принято", bg: "#EAF7EE", color: "#1D6B33" },
  sent: { label: "Отправлено", bg: "#E8F1FD", color: "#0071E3" },
  rejected: { label: "Отклонено", bg: "#FBEAEA", color: "#C0392B" },
};

export function CompanyInvitesScreen() {
  const invitesList = useAppStore((s) => s.invitesList);
  const go = useAppStore((s) => s.go);

  return (
    <div className="px-5 pb-10 pt-1">
      <button
        type="button"
        onClick={() => go("companyDashboard")}
        className="hover-lift mb-2.5 cursor-pointer text-[13px] font-semibold text-[#0071E3]"
      >
        ← Дашборд
      </button>
      <div className="mb-4.5 text-[28px] font-bold tracking-tight">Приглашения</div>

      <div className="flex flex-col gap-2.5">
        {invitesList.map((inv) => {
          const meta = statusMeta[inv.status];
          return (
            <div key={inv.name} className="rounded-2xl bg-[#F5F5F7] p-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="text-[15px] font-semibold">{inv.name}</div>
                <div
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: meta.bg, color: meta.color }}
                >
                  {meta.label}
                </div>
              </div>
              <div className="text-[13px] text-[#86868B]">{inv.taskTitle}</div>
              {inv.status === "accepted" && (
                <button
                  type="button"
                  onClick={() => alert("Выход на стажировку подтверждён")}
                  className="mt-2.5 w-full cursor-pointer rounded-full bg-[#0071E3] py-2.5 text-center text-[13px] font-semibold text-white"
                >
                  Подтвердить выход на стажировку
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
