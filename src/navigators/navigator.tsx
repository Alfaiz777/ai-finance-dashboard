import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTES } from "./routes";
import AppLayout from "@/components/layout/AppLayout";

// pages
import Dashboard from "@/pages/Dashboard";
import Assets from "@/pages/Assets";
import Expenses from "@/pages/Expenses";
import Settings from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import SplitWise from "@/pages/Splitwise";
import AIChat from "@/pages/AIChat";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.EXPENSES,
        element: <Expenses />,
      },
      {
        path: ROUTES.ANALYTICS,
        element: <Analytics />,
      },
      {
        path: ROUTES.ASSETS,
        element: <Assets />,
      },
      {
        path: ROUTES.SPLITWISE,
        element: <SplitWise />,
      },
      {
        path: ROUTES.AI_CHAT,
        element: <AIChat />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
    ],
  },
]);

export default function Navigator() {
  return <RouterProvider router={router} />;
}
