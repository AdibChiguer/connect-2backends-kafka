"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <a
              href={item.url}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && (
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                )}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
