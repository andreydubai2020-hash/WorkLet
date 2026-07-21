import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../../store/useAppStore";
import {
  allTasks,
  hoursOptions,
  levelOptions,
  mySkills,
  sphereDefs,
  sphereMeta,
  stackOptions,
} from "../../store/mockData";
import { FilterPill } from "../FilterPill";
import { FilterDropdown } from "../FilterDropdown";
import { SpherePill } from "../SpherePill";
import { TaskCard } from "../TaskCard";
import type { FilterKey } from "../../types";

export function FeedScreen() {
  const {
    selectedSphere,
    selectedStacks,
    selectedLevels,
    selectedHours,
    filterIntern,
    filterFree,
    openFilter,
    sortMode,
    setSphere,
    toggleOpenFilter,
    closeDropdown,
    toggleMulti,
    toggleBool,
    setSortMode,
    selectFeedTask,
  } = useAppStore(
    useShallow((s) => ({
      selectedSphere: s.selectedSphere,
      selectedStacks: s.selectedStacks,
      selectedLevels: s.selectedLevels,
      selectedHours: s.selectedHours,
      filterIntern: s.filterIntern,
      filterFree: s.filterFree,
      openFilter: s.openFilter,
      sortMode: s.sortMode,
      setSphere: s.setSphere,
      toggleOpenFilter: s.toggleOpenFilter,
      closeDropdown: s.closeDropdown,
      toggleMulti: s.toggleMulti,
      toggleBool: s.toggleBool,
      setSortMode: s.setSortMode,
      selectFeedTask: s.selectFeedTask,
    })),
  );

  const filteredTasks = useMemo(() => {
    return allTasks
      .filter((t) => {
        if (selectedSphere !== "all" && t.sphere !== selectedSphere) return false;
        if (selectedStacks.length && !selectedStacks.some((sk) => t.skills.includes(sk)))
          return false;
        if (selectedLevels.length && !selectedLevels.includes(t.level)) return false;
        if (selectedHours.length && !selectedHours.includes(t.hoursBucket)) return false;
        if (filterIntern && !t.intern) return false;
        if (filterFree && t.taken >= t.total) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortMode === "new") return a.postedDaysAgo - b.postedDaysAgo;
        const aMatch = a.skills.some((sk) => mySkills.includes(sk)) ? 0 : 1;
        const bMatch = b.skills.some((sk) => mySkills.includes(sk)) ? 0 : 1;
        return aMatch - bMatch;
      });
  }, [selectedSphere, selectedStacks, selectedLevels, selectedHours, filterIntern, filterFree, sortMode]);

  const pills: { key: FilterKey; label: string; active: boolean }[] = [
    {
      key: "stack",
      label: selectedStacks.length ? `Стек (${selectedStacks.length})` : "Стек",
      active: selectedStacks.length > 0 || openFilter === "stack",
    },
    {
      key: "level",
      label: selectedLevels.length ? `Сложность (${selectedLevels.length})` : "Сложность",
      active: selectedLevels.length > 0 || openFilter === "level",
    },
    {
      key: "hours",
      label: selectedHours.length ? `Часы (${selectedHours.length})` : "Часы",
      active: selectedHours.length > 0 || openFilter === "hours",
    },
    { key: "intern", label: "Стажировка", active: filterIntern || openFilter === "intern" },
    { key: "free", label: "Свободна", active: filterFree || openFilter === "free" },
  ];

  const dropdownOptions =
    openFilter === "stack"
      ? stackOptions.map((v) => ({
          label: v,
          selected: selectedStacks.includes(v),
          onClick: () => toggleMulti("selectedStacks", v),
        }))
      : openFilter === "level"
        ? levelOptions.map((v) => ({
            label: v,
            selected: selectedLevels.includes(v),
            onClick: () => toggleMulti("selectedLevels", v),
          }))
        : openFilter === "hours"
          ? hoursOptions.map((v) => ({
              label: v,
              selected: selectedHours.includes(v),
              onClick: () => toggleMulti("selectedHours", v),
            }))
          : openFilter === "intern"
            ? [
                {
                  label: "Рассматривают стажёров",
                  selected: filterIntern,
                  onClick: () => toggleBool("filterIntern"),
                },
              ]
            : openFilter === "free"
              ? [
                  {
                    label: "Есть свободные места",
                    selected: filterFree,
                    onClick: () => toggleBool("filterFree"),
                  },
                ]
              : [];

  return (
    <div className="px-5 pb-10 pt-1">
      <div className="mb-3.5 text-[28px] font-bold tracking-tight">Лента задач</div>

      <div className="no-scrollbar -mx-5 mb-3.5 flex gap-2 overflow-x-auto px-5 pb-1">
        {sphereDefs.map((sd) => (
          <SpherePill
            key={sd.key}
            label={sd.label}
            bg={selectedSphere === sd.key ? sphereMeta[sd.key].dot : sphereMeta[sd.key].bg}
            color={selectedSphere === sd.key ? "#fff" : sphereMeta[sd.key].color}
            dotColor={selectedSphere === sd.key ? "#fff" : sphereMeta[sd.key].dot}
            onClick={() => setSphere(sd.key)}
          />
        ))}
      </div>

      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {pills.map((p) => (
          <FilterPill
            key={p.key}
            label={p.label}
            active={p.active}
            onClick={() => toggleOpenFilter(p.key)}
          />
        ))}
      </div>

      {openFilter !== null && (
        <FilterDropdown options={dropdownOptions} onDone={closeDropdown} />
      )}

      <div className="mb-3.5" />

      <div className="mb-4.5 flex gap-5 border-b border-black/[0.08]">
        <button
          type="button"
          onClick={() => setSortMode("match")}
          className="hover-lift cursor-pointer py-2.5 text-sm"
          style={{
            fontWeight: sortMode === "match" ? 600 : 500,
            color: sortMode === "match" ? "#1D1D1F" : "#86868B",
            borderBottom: `2px solid ${sortMode === "match" ? "#0071E3" : "transparent"}`,
          }}
        >
          Подходят мне
        </button>
        <button
          type="button"
          onClick={() => setSortMode("new")}
          className="hover-lift cursor-pointer py-2.5 text-sm"
          style={{
            fontWeight: sortMode === "new" ? 600 : 500,
            color: sortMode === "new" ? "#1D1D1F" : "#86868B",
            borderBottom: `2px solid ${sortMode === "new" ? "#0071E3" : "transparent"}`,
          }}
        >
          Новые
        </button>
      </div>

      {filteredTasks.length === 0 && (
        <div className="px-3 py-10 text-center text-sm leading-relaxed text-[#86868B]">
          Задач под твой стек пока нет — включи уведомления
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            sphere={sphereMeta[task.sphere]}
            onClick={() => selectFeedTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
