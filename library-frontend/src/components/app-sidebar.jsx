"use client";

import * as React from "react";
import { AudioWaveform, GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { IconChecklist, IconPackages, IconObjectScan  } from "@tabler/icons-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconPackages,
    },
    {
      title: "Create Book",
      url: "/create",
      icon: IconChecklist,
    },
  ],
};

export function AppSidebar({ user, logOut , ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Main Navigation */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* User Section */}
      <SidebarFooter>
        <NavUser user={user} logOut={logOut} />
      </SidebarFooter>

      {/* Sidebar Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
