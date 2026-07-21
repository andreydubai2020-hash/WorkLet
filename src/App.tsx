import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "./store/useAppStore";
import { TabBar } from "./components/TabBar";
import { LandingScreen } from "./components/screens/LandingScreen";
import { AuthScreen } from "./components/screens/AuthScreen";
import { OnboardingScreen } from "./components/screens/OnboardingScreen";
import { FeedScreen } from "./components/screens/FeedScreen";
import { TaskDetailScreen } from "./components/screens/TaskDetailScreen";
import { StudentProfileScreen } from "./components/screens/StudentProfileScreen";
import { CompanyProfileScreen } from "./components/screens/CompanyProfileScreen";
import { ReviewScreen } from "./components/screens/ReviewScreen";
import { CompanyDashboardScreen } from "./components/screens/CompanyDashboardScreen";
import { CompanyCreateTaskScreen } from "./components/screens/CompanyCreateTaskScreen";
import { CompanySubmissionsScreen } from "./components/screens/CompanySubmissionsScreen";
import { CompanyCandidateScreen } from "./components/screens/CompanyCandidateScreen";
import { CompanyTalentPoolScreen } from "./components/screens/CompanyTalentPoolScreen";
import { CompanyInvitesScreen } from "./components/screens/CompanyInvitesScreen";

function screenFor(screen: string, appMode: string) {
  switch (screen) {
    case "landing":
      return <LandingScreen />;
    case "auth":
      return <AuthScreen />;
    case "onboarding":
      return <OnboardingScreen />;
    case "feed":
      return <FeedScreen />;
    case "taskDetail":
      return <TaskDetailScreen />;
    case "profile":
      return appMode === "company" ? <CompanyProfileScreen /> : <StudentProfileScreen />;
    case "review":
      return <ReviewScreen />;
    case "companyDashboard":
      return <CompanyDashboardScreen />;
    case "companyCreate":
      return <CompanyCreateTaskScreen />;
    case "companySubmissions":
      return <CompanySubmissionsScreen />;
    case "companyCandidate":
      return <CompanyCandidateScreen />;
    case "companyTalentPool":
      return <CompanyTalentPoolScreen />;
    case "companyInvites":
      return <CompanyInvitesScreen />;
    default:
      return null;
  }
}

function ActiveScreen() {
  const screen = useAppStore((s) => s.screen);
  const appMode = useAppStore((s) => s.appMode);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {screenFor(screen, appMode)}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen justify-center bg-[#E7E7EA] sm:py-8">
      <div className="flex w-full max-w-[480px] flex-col bg-white sm:min-h-[800px] sm:rounded-[32px] sm:shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:overflow-hidden">
        <div className="no-scrollbar flex-1 overflow-auto pt-2">
          <ActiveScreen />
        </div>
        <TabBar />
      </div>
    </div>
  );
}
