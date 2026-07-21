import { create } from "zustand";
import type {
  AppMode,
  AuthMode,
  AuthRole,
  CompanyTask,
  CreateMode,
  CreatePrivacy,
  FilterKey,
  Invite,
  KanbanFilter,
  Screen,
  SortMode,
  SphereFilterKey,
  SphereKey,
  Submission,
  SubmissionStatus,
} from "../types";
import {
  draftCriteria,
  initialCompanyTasks,
  initialFavCandidates,
  initialInvitesList,
  initialSubmissionsByTask,
} from "./mockData";

interface AppState {
  screen: Screen;
  appMode: AppMode;
  authRole: AuthRole;
  authMode: AuthMode;
  ringScore: number;
  linkCopied: boolean;
  codeCopied: boolean;
  freeTasksLeft: number;
  createStep: 1 | 2 | 3;
  createSpots: number;
  createIntern: boolean;
  createSphere: SphereKey;
  createMode: CreateMode;
  createPrivacy: CreatePrivacy;
  draftCriteriaList: string[];
  draftDifficulty: string;
  selectedCompanyTaskId: number | null;
  companyTasks: CompanyTask[];
  submissionsByTask: Record<number, Submission[]>;
  selectedStacks: string[];
  selectedLevels: string[];
  selectedHours: string[];
  filterIntern: boolean;
  filterFree: boolean;
  openFilter: FilterKey | null;
  sortMode: SortMode;
  caseExpanded: boolean[];
  selectedSphere: SphereFilterKey;
  selectedFeedTaskId: number;
  kanbanFilter: KanbanFilter;
  favCandidates: string[];
  invitesList: Invite[];
  selectedCandidateName: string | null;
  candidateReturnScreen: Screen;

  obStep: 1 | 2 | 3;
  obAge: string | null;
  obCity: string | null;
  obInterests: string[];

  go: (screen: Screen) => void;
  goCompanyAuth: () => void;
  goCompanyInvites: () => void;
  goCompanyTalentPool: () => void;
  goBackFromCandidate: () => void;
  setAuthRole: (role: AuthRole) => void;
  toggleAuthMode: () => void;
  submitAuth: () => void;

  copyLink: () => void;
  copyCode: (code: string) => void;

  toggleOpenFilter: (key: FilterKey) => void;
  closeDropdown: () => void;
  toggleMulti: (key: "selectedStacks" | "selectedLevels" | "selectedHours", value: string) => void;
  toggleBool: (key: "filterIntern" | "filterFree") => void;
  setSortMode: (mode: SortMode) => void;

  toggleCase: (index: number) => void;

  decSpots: () => void;
  incSpots: () => void;
  toggleCreateIntern: () => void;
  setCreateSphere: (sphere: SphereKey) => void;
  setDraftTaskText: (text: string) => void;
  generateSpec: () => void;
  removeCriterion: (index: number) => void;
  cycleDifficulty: () => void;
  goCreateStep3: () => void;
  toggleCreateMode: () => void;
  toggleCreatePrivacy: () => void;
  publishTask: () => void;

  selectCompanyTask: (id: number) => void;
  updateSubmission: (taskId: number, index: number, status: SubmissionStatus) => void;
  bulkAcceptTop: () => void;
  toggleFav: (name: string) => void;
  openCandidateProfile: (name: string, returnScreen: Screen) => void;
  setKanbanFilter: (filter: KanbanFilter) => void;
  duplicateCompanyTask: (id: number) => void;
  closeCompanyTaskEarly: (id: number) => void;

  setSphere: (sphere: SphereFilterKey) => void;
  selectFeedTask: (id: number) => void;
  draftTaskText: string;

  obSetAge: (age: string) => void;
  obSetCity: (city: string) => void;
  obToggleInterest: (interest: string) => void;
  obNext: () => void;
  obBack: () => void;
}

let linkTimeout: ReturnType<typeof setTimeout> | undefined;
let codeTimeout: ReturnType<typeof setTimeout> | undefined;
let ringTimeout: ReturnType<typeof setTimeout> | undefined;

export const useAppStore = create<AppState>((set, get) => ({
  screen: "landing",
  appMode: "student",
  authRole: "student",
  authMode: "login",
  ringScore: 0,
  linkCopied: false,
  codeCopied: false,
  freeTasksLeft: 2,
  createStep: 1,
  createSpots: 4,
  createIntern: true,
  createSphere: "it",
  createMode: "solo",
  createPrivacy: "public",
  draftCriteriaList: draftCriteria,
  draftDifficulty: "Легко",
  draftTaskText: "нужен парсер прайсов с трёх сайтов в гугл-таблицу",
  selectedCompanyTaskId: null,
  companyTasks: initialCompanyTasks,
  submissionsByTask: initialSubmissionsByTask,
  selectedStacks: [],
  selectedLevels: [],
  selectedHours: [],
  filterIntern: false,
  filterFree: false,
  openFilter: null,
  sortMode: "match",
  caseExpanded: [true, false, false],
  selectedSphere: "all",
  selectedFeedTaskId: 1,
  kanbanFilter: "all",
  favCandidates: initialFavCandidates,
  invitesList: initialInvitesList,
  selectedCandidateName: null,
  candidateReturnScreen: "companyDashboard",

  obStep: 1,
  obAge: null,
  obCity: null,
  obInterests: [],

  go: (screen) => {
    set({ screen });
    if (screen === "review") {
      clearTimeout(ringTimeout);
      set({ ringScore: 0 });
      ringTimeout = setTimeout(() => set({ ringScore: 87 }), 150);
    }
    if (screen === "companyCreate") {
      set({ createStep: 1 });
    }
  },
  goCompanyAuth: () => {
    set({ authRole: "company" });
    get().go("auth");
  },
  goCompanyInvites: () => get().go("companyInvites"),
  goCompanyTalentPool: () => get().go("companyTalentPool"),
  goBackFromCandidate: () => get().go(get().candidateReturnScreen ?? "companyDashboard"),
  setAuthRole: (authRole) => set({ authRole }),
  toggleAuthMode: () =>
    set((s) => ({ authMode: s.authMode === "login" ? "register" : "login" })),
  submitAuth: () => {
    const { authRole } = get();
    set({ appMode: authRole });
    if (authRole === "company") {
      get().go("companyDashboard");
      return;
    }
    set({ obStep: 1, obAge: null, obCity: null, obInterests: [] });
    get().go("onboarding");
  },

  copyLink: () => {
    const url = "iske.kz/p/azamat";
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    set({ linkCopied: true });
    clearTimeout(linkTimeout);
    linkTimeout = setTimeout(() => set({ linkCopied: false }), 2000);
  },
  copyCode: (code) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    set({ codeCopied: true });
    clearTimeout(codeTimeout);
    codeTimeout = setTimeout(() => set({ codeCopied: false }), 2000);
  },

  toggleOpenFilter: (key) =>
    set((s) => ({ openFilter: s.openFilter === key ? null : key })),
  closeDropdown: () => set({ openFilter: null }),
  toggleMulti: (key, value) =>
    set((s) => {
      const list = s[key];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { [key]: next } as Pick<AppState, typeof key>;
    }),
  toggleBool: (key) => set((s) => ({ [key]: !s[key] }) as Pick<AppState, typeof key>),
  setSortMode: (sortMode) => set({ sortMode }),

  toggleCase: (index) =>
    set((s) => {
      const next = s.caseExpanded.slice();
      next[index] = !next[index];
      return { caseExpanded: next };
    }),

  decSpots: () => set((s) => ({ createSpots: Math.max(1, s.createSpots - 1) })),
  incSpots: () => set((s) => ({ createSpots: Math.min(10, s.createSpots + 1) })),
  toggleCreateIntern: () => set((s) => ({ createIntern: !s.createIntern })),
  setCreateSphere: (createSphere) => set({ createSphere }),
  setDraftTaskText: (draftTaskText) => set({ draftTaskText }),
  generateSpec: () => set({ createStep: 2 }),
  removeCriterion: (index) =>
    set((s) => ({ draftCriteriaList: s.draftCriteriaList.filter((_, i) => i !== index) })),
  cycleDifficulty: () =>
    set((s) => {
      const opts = ["Легко", "Средне", "Сложно"];
      const next = opts[(opts.indexOf(s.draftDifficulty) + 1) % opts.length];
      return { draftDifficulty: next };
    }),
  goCreateStep3: () => set({ createStep: 3 }),
  toggleCreateMode: () =>
    set((s) => ({ createMode: s.createMode === "solo" ? "pairs" : "solo" })),
  toggleCreatePrivacy: () =>
    set((s) => ({ createPrivacy: s.createPrivacy === "public" ? "invite" : "public" })),
  publishTask: () => {
    const s = get();
    const nextId = Math.max(0, ...s.companyTasks.map((t) => t.id)) + 1;
    const newTask: CompanyTask = {
      id: nextId,
      title: "Модуль экспорта отчётов в PDF",
      status: "published",
      taken: 0,
      total: s.createSpots,
      deadlineText: "до 15 августа",
    };
    set({
      companyTasks: [newTask, ...s.companyTasks],
      submissionsByTask: { ...s.submissionsByTask, [nextId]: [] },
      freeTasksLeft: Math.max(0, s.freeTasksLeft - 1),
      createStep: 1,
      createSpots: 4,
      createIntern: true,
      createMode: "solo",
      createPrivacy: "public",
    });
    get().go("companyDashboard");
  },

  selectCompanyTask: (id) => {
    set({ selectedCompanyTaskId: id });
    get().go("companySubmissions");
  },
  updateSubmission: (taskId, index, status) =>
    set((s) => {
      const list = (s.submissionsByTask[taskId] ?? []).slice();
      list[index] = { ...list[index], status };
      return {
        submissionsByTask: { ...s.submissionsByTask, [taskId]: list },
      };
    }),
  bulkAcceptTop: () => {
    const taskId = get().selectedCompanyTaskId;
    if (taskId === null) return;
    set((s) => {
      const list = (s.submissionsByTask[taskId] ?? [])
        .slice()
        .sort((a, b) => b.score - a.score);
      const updated = list.map((sub, i) => ({
        ...sub,
        status: i === 0 ? ("accepted" as const) : sub.status === "pending" ? ("rejected" as const) : sub.status,
      }));
      return { submissionsByTask: { ...s.submissionsByTask, [taskId]: updated } };
    });
  },
  toggleFav: (name) =>
    set((s) => ({
      favCandidates: s.favCandidates.includes(name)
        ? s.favCandidates.filter((n) => n !== name)
        : [...s.favCandidates, name],
    })),
  openCandidateProfile: (name, returnScreen) => {
    set({ selectedCandidateName: name, candidateReturnScreen: returnScreen });
    get().go("companyCandidate");
  },
  setKanbanFilter: (kanbanFilter) => set({ kanbanFilter }),
  duplicateCompanyTask: (id) =>
    set((s) => {
      const t = s.companyTasks.find((x) => x.id === id);
      if (!t) return s;
      const nextId = Math.max(0, ...s.companyTasks.map((x) => x.id)) + 1;
      const dup: CompanyTask = { ...t, id: nextId, title: `${t.title} (копия)`, status: "published", taken: 0 };
      return {
        companyTasks: [dup, ...s.companyTasks],
        submissionsByTask: { ...s.submissionsByTask, [nextId]: [] },
      };
    }),
  closeCompanyTaskEarly: (id) =>
    set((s) => ({
      companyTasks: s.companyTasks.map((x) =>
        x.id === id ? { ...x, status: "completed" as const, deadlineText: "завершена" } : x,
      ),
    })),

  setSphere: (selectedSphere) => set({ selectedSphere }),
  selectFeedTask: (id) => {
    set({ selectedFeedTaskId: id });
    get().go("taskDetail");
  },

  obSetAge: (obAge) => set({ obAge }),
  obSetCity: (obCity) => set({ obCity }),
  obToggleInterest: (interest) =>
    set((s) => ({
      obInterests: s.obInterests.includes(interest)
        ? s.obInterests.filter((x) => x !== interest)
        : [...s.obInterests, interest],
    })),
  obNext: () => {
    const s = get();
    if (s.obStep < 3) {
      set({ obStep: (s.obStep + 1) as 1 | 2 | 3 });
      return;
    }
    get().go("feed");
  },
  obBack: () => set((s) => ({ obStep: Math.max(1, s.obStep - 1) as 1 | 2 | 3 })),
}));
