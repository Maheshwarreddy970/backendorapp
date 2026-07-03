"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  Mail,
  Briefcase,
  Clock,
  TrendingUp,
  Ticket,
  Lightbulb,
  Settings,
  PawPrint,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { title: "Calendar", href: "/admin/calendar", icon: Calendar },
  { title: "Services", href: "/admin/services", icon: Briefcase },
  { title: "Availability", href: "/admin/availability", icon: Clock },
  { title: "Coupons", href: "/admin/coupons", icon: Ticket },
  { title: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { title: "Invitations", href: "/admin/invitations", icon: Mail },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Safely extract initials for the avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-sidebar-border bg-sidebar"
    >
      {/* 1. Header with dynamic collapsing profile */}
      <SidebarHeader className="p-4 border-b border-sidebar-border/50">
        <div className={cn(
          "flex items-center transition-all duration-300",
          isCollapsed ? "justify-center" : "gap-3 px-1"
        )}>
          {/* Workspace brand / Icon */}
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-200 hover:scale-105">
            <PawPrint className="size-4" />
          </div>
          
          {/* Expanded State Text */}
          {!isCollapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight transition-opacity duration-300">
              <span className="truncate font-semibold text-sidebar-foreground">
                NexPetCare
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Platform Admin
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* 2. Interactive Navigation Section */}
      <SidebarContent className="px-3 pt-4 gap-1">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive} 
                  tooltip={item.title}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none",
                      isActive
                        ? " text-primary font-semibold "
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    {/* Tiny active-state indicator pill along the left edge */}
                    {isActive && (
                      <span className="absolute left-0 top-[15%] h-[70%] w-1 rounded-r-full bg-primary" />
                    )}

                    <item.icon
                      className={cn(
                        "size-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                        isActive ? "text-primary" : "text-muted-foreground/80 group-hover:text-sidebar-accent-foreground"
                      )}
                    />
                    
                    {!isCollapsed && (
                      <span className={cn("truncate flex-1 transition-opacity duration-200", isActive ? "font-semibold text-primary" : "text-muted-foreground/80 group-hover:text-sidebar-accent-foreground")}>
                        {item.title}
                      </span>
                    )}

                    {/* Subtle right chevron indicators for deeper navigation context */}
                    {!isCollapsed && !isActive && (
                      <ChevronRight className="size-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 ease-in-out duration-1000  transition-opacity duration-200 text-muted-foreground/50 ml-auto" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* 3. Collapsing Profile details and Logout Controls */}
      <SidebarFooter className="p-3 border-t border-sidebar-border/50 bg-sidebar-accent/10 mt-auto">
        <div className={cn(
          "flex flex-col gap-3 transition-all duration-300",
          isCollapsed ? "items-center" : "p-1"
        )}>
          {/* User Meta Card (Collapses down to a clean, centralized circular avatar) */}
          <div className={cn(
            "flex items-center w-full transition-all duration-200",
            isCollapsed ? "justify-center" : "gap-3"
          )}>
            <Avatar className="size-8 shrink-0 ring-2 ring-primary/10 transition-transform hover:scale-105">
              <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            
            {!isCollapsed && (
              <div className="grid flex-1 text-left text-xs leading-tight min-w-0">
                <span className="truncate font-semibold text-sidebar-foreground">
                  {user?.name || "Administrator"}
                </span>
                <span className="truncate text-muted-foreground/80">
                  {user?.email || "admin@workspace.com"}
                </span>
              </div>
            )}
          </div>

          {/* Logout Action Button wrapper */}
          <div className="w-full">
            <LogoutButton />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}