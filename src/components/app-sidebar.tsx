import * as React from "react";
import { APP_SIDEBAR_NAV_CONFIG } from "@/utils/constants";
import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-4 py-2 font-semibold text-lg">Finance AI</div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={APP_SIDEBAR_NAV_CONFIG} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
