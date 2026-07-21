import { useAppStore } from "../store/useAppStore";
import type { Screen } from "../types";

interface TabDef {
  key: Screen;
  label: string;
  icon: "blocks" | "feed" | "profile" | "review";
  opacities: [number, number, number, number];
}

const studentTabs: TabDef[] = [
  { key: "landing", label: "Главная", icon: "blocks", opacities: [1, 1, 1, 1] },
  { key: "feed", label: "Задачи", icon: "feed", opacities: [1, 1, 0.35, 0.35] },
  { key: "profile", label: "Профиль", icon: "profile", opacities: [0.35, 1, 1, 0.35] },
  { key: "review", label: "Ревью", icon: "review", opacities: [1, 0.35, 0.35, 1] },
];

const companyTabs: TabDef[] = [
  { key: "companyDashboard", label: "Дашборд", icon: "blocks", opacities: [1, 1, 0.35, 0.35] },
  {
    key: "companyTalentPool",
    label: "Кандидаты",
    icon: "blocks",
    opacities: [0.35, 1, 0.35, 1],
  },
  { key: "profile", label: "Профиль", icon: "profile", opacities: [0.35, 1, 1, 0.35] },
];

function TabIcon({
  icon,
  color,
  opacities,
}: {
  icon: TabDef["icon"];
  color: string;
  opacities: [number, number, number, number];
}) {
  if (icon === "profile") {
    return (
      <div className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-[1.15]">
        <div
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full"
          style={{ background: color }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-[9px] w-4 -translate-x-1/2 rounded-t-[9px]"
          style={{ background: color }}
        />
      </div>
    );
  }
  if (icon === "review") {
    return (
      <div className="flex h-5 w-5 items-center justify-center gap-[3px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full"
            style={{ background: color }}
          />
        ))}
      </div>
    );
  }
  if (icon === "feed") {
    return (
      <div className="flex h-5 w-5 items-center justify-center gap-0.5 transition-transform duration-300 group-hover:scale-[1.15]">
        <div className="h-4 w-1 rounded-sm opacity-50" style={{ background: color }} />
        <div className="h-5 w-1.5 rounded-sm" style={{ background: color }} />
        <div className="h-4 w-1 rounded-sm opacity-50" style={{ background: color }} />
      </div>
    );
  }
  return (
    <div className="grid h-5 w-5 grid-cols-2 grid-rows-2 gap-0.5 transition-transform duration-300 group-hover:scale-[1.15] group-hover:rotate-[8deg]">
      {opacities.map((op, i) => (
        <div key={i} className="rounded-[3px]" style={{ background: color, opacity: op }} />
      ))}
    </div>
  );
}

export function TabBar() {
  const screen = useAppStore((s) => s.screen);
  const appMode = useAppStore((s) => s.appMode);
  const go = useAppStore((s) => s.go);

  if (screen === "auth" || screen === "taskDetail" || screen === "onboarding") return null;

  const tabs = appMode === "company" ? companyTabs : studentTabs;

  return (
    <div className="sticky bottom-0 flex flex-shrink-0 border-t border-black/[0.06] bg-white/85 px-2 pb-5 pt-2 backdrop-blur-xl">
      {tabs.map((tab) => {
        const active = screen === tab.key;
        const color = active ? "#0071E3" : "#86868B";
        return (
          <button
            type="button"
            key={tab.key}
            onClick={() => go(tab.key)}
            className="dock-item hover-lift group flex flex-1 cursor-pointer flex-col items-center gap-1 pt-1.5"
          >
            <div className="dock-tip">{tab.label}</div>
            <TabIcon icon={tab.icon} color={color} opacities={tab.opacities} />
            <div
              className="h-1 w-1 rounded-full"
              style={{ background: active ? "#0071E3" : "transparent" }}
            />
            <div className="text-[11px] font-semibold" style={{ color }}>
              {tab.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
