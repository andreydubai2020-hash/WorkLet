export type Screen =
  | "landing"
  | "auth"
  | "onboarding"
  | "feed"
  | "taskDetail"
  | "profile"
  | "review"
  | "companyDashboard"
  | "companyCreate"
  | "companySubmissions"
  | "companyCandidate"
  | "companyTalentPool"
  | "companyInvites";

export type AppMode = "student" | "company";
export type AuthRole = "student" | "company";
export type AuthMode = "login" | "register";
export type SortMode = "match" | "new";
export type FilterKey = "stack" | "level" | "hours" | "intern" | "free";
export type SubmissionStatus = "pending" | "accepted" | "rejected" | "invited";
export type CompanyTaskStatus = "published" | "has_submissions" | "completed";
export type KanbanFilter = "all" | CompanyTaskStatus;
export type CreateMode = "solo" | "pairs";
export type CreatePrivacy = "public" | "invite";
export type InviteStatus = "accepted" | "sent" | "rejected";

export type SphereKey =
  | "it"
  | "smm"
  | "design"
  | "marketing"
  | "analytics"
  | "copywriting"
  | "video";

export type SphereFilterKey = "all" | SphereKey;

export interface SphereMeta {
  label: string;
  bg: string;
  color: string;
  dot: string;
}

export interface Task {
  id: number;
  sphere: SphereKey;
  company: string;
  title: string;
  stack: string;
  level: string;
  hoursBucket: string;
  hours: string;
  intern: boolean;
  postedDaysAgo: number;
  skills: string[];
  desc: string;
  taken: number;
  total: number;
  fullDesc: string;
  criteria: string[];
}

export interface CaseItem {
  title: string;
  score: number;
  description: string;
}

export interface CompanyTask {
  id: number;
  title: string;
  status: CompanyTaskStatus;
  taken: number;
  total: number;
  deadlineText: string;
}

export interface Submission {
  name: string;
  score: number;
  summary: string;
  recommended: boolean;
  status: SubmissionStatus;
  criteria: boolean[];
}

export interface Invite {
  name: string;
  taskTitle: string;
  status: InviteStatus;
}

export interface Step {
  num: string;
  title: string;
  desc: string;
}

export interface Benefit {
  title: string;
  desc: string;
}

export interface Stat {
  value: string;
  numeric: number;
  label: string;
}

export interface SubmitConfig {
  label: string;
  placeholder: string;
  upload: boolean;
}

export interface CandidateCase {
  title: string;
  company: string;
  score: number;
}
