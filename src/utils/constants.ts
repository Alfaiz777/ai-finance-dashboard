import {
  Home,
  CreditCard,
  BarChart3,
  Landmark,
  Users,
  Bot,
  Settings,
} from "lucide-react";

import { ROUTES } from "@/navigators/routes";
import type { LucideIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

export const APP_SIDEBAR_NAV_CONFIG: SidebarItem[] = [
  {
    title: "Overview",
    icon: Home,
    path: ROUTES.DASHBOARD,
  },
  {
    title: "Transactions",
    icon: CreditCard,
    path: ROUTES.EXPENSES,
  },
  {
    title: "Spend Analysis",
    icon: BarChart3,
    path: ROUTES.ANALYTICS,
  },
  {
    title: "Assets",
    icon: Landmark,
    path: ROUTES.ASSETS,
  },
  {
    title: "Split & Owe",
    icon: Users,
    path: ROUTES.SPLITWISE,
  },
  {
    title: "AI Advisor",
    icon: Bot,
    path: ROUTES.AI_CHAT,
  },
  {
    title: "Settings",
    icon: Settings,
    path: ROUTES.SETTINGS,
  },
];
