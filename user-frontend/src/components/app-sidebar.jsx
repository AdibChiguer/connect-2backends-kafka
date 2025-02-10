"use client";

import * as React from "react";
import { AudioWaveform, GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { IconChecklist, IconPackages, IconObjectScan  } from "@tabler/icons-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconPackages,
    },
    {
      title: "Book details",
      url: "/book-details",
      icon: IconChecklist,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Main Navigation */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* User Section */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      {/* Sidebar Rail */}
      <SidebarRail />
    </Sidebar>
  );
}
