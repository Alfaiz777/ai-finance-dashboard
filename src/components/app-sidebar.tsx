import * as React from "react";
import { APP_SIDEBAR_NAV_CONFIG } from "@/utils/constants";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  useSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import logoIcon from "@/assets/financeLogo-icon.png";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="border-r border-border/40 bg-background/70 backdrop-blur-xl"
    >
      <SidebarHeader>
        <div
          className={`flex items-center justify-center border-b border-border/40 transition-all duration-300 ${
            isCollapsed ? "h-14" : "h-20"
          }`}
        >
          <Link to="/dashboard" className="group">
            {isCollapsed ? (
              <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md shadow-black/20 ml-3">
                <img
                  src={logoIcon}
                  alt="FinScope"
                  className="w-5 h-5 object-contain scale-400"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 mt-8">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg shadow-black/30">
                  <img
                    src={logoIcon}
                    alt="FinScope"
                    className="w-8 h-8 object-contain scale-400"
                  />
                </div>

                <span className="text-sm font-semibold tracking-tight text-foreground">
                  FinScope
                </span>
                <span className="text-xs font-semibold tracking-tight text-foreground">
                  Unified Finance. Smart Insights
                </span>
              </div>
            )}
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <NavMain items={APP_SIDEBAR_NAV_CONFIG} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
