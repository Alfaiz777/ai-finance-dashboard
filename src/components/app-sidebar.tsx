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
import logoFull from "@/assets/financeLogo-full.png";
import logoIcon from "@/assets/financeLogo-icon.png";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            isCollapsed ? "h-14" : "h-20"
          }`}
        >
          <img
            src={isCollapsed ? logoIcon : logoFull}
            alt="FinScope"
            className={`object-contain cursor-pointer transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "w-5 h-5 scale-300" // 👈 perfect for icon view
                : "w-35" // 👈 better proportion
            }`}
          />
        </div>
      </SidebarHeader>
      {/* <SidebarHeader>
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            isCollapsed ? "h-14" : "h-20"
          }`}
        >
          <img
            src={isCollapsed ? logoIcon : logoFull}
            alt="FinScope"
            className={`object-contain transition-all duration-300 ${
              isCollapsed
                ? "w-5 h-5 scale-300" // 🔥 bigger + clean icon
                : "w-35" // 🔥 better readable text
            }`}
          />
        </div>
      </SidebarHeader> */}

      <SidebarContent>
        <NavMain items={APP_SIDEBAR_NAV_CONFIG} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
