"use client";

import { type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    path: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs text-muted-foreground tracking-wide px-2 mb-2 mt-4">
        Finance Platform
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <SidebarMenuItem key={item.title}>
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`
                      group relative flex items-center gap-3 rounded-xl px-3 py-2
                      transition-all duration-200 ease-in-out

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r from-blue-500/15 to-indigo-500/15 
                            text-blue-600 shadow-sm
                            before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
                            before:h-5 before:w-[3px] before:rounded-full before:bg-blue-500
                          `
                          : `
                            text-muted-foreground 
                            hover:bg-muted/50 hover:text-foreground
                            hover:translate-x-1
                          `
                      }
                    `}
                  >
                    <Icon
                      className={`
                        h-4 w-4 transition-all
                        ${
                          isActive
                            ? "text-blue-600"
                            : "group-hover:text-foreground"
                        }
                      `}
                    />
                    <span className="text-sm font-medium tracking-tight">
                      {item.title}
                    </span>
                    {/* GLOW EFFECT (active only) */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-xl bg-blue-500/10 blur-md opacity-40 -z-10" />
                    )}
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
