// import * as React from "react"
// import Link from "next/link"
// import { useSidebar } from "@/components/ui/sidebar"
// import { Avatar, AvatarImage } from "@/components/ui/avatar"
// import {
//   Sidebar,
//   SidebarHeader,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import {
//   Home,
//   Users,
//   Box,
//   Menu,
//   Link as LinkIcon,
//   Command,
//   User as UserIcon,
//   FileText,
//   Circle,
//   Layers,
//   MapPin,
//   Shield,
// } from "lucide-react"
// import SidebarContentCustom from "@/components/sidebar-content";

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const { setOpenMobile } = useSidebar()

//   // helper to close mobile overlay when a link is clicked
//   const closeMobile = () => setOpenMobile(false)

//   return (
//     <Sidebar collapsible="icon" {...props}>
//       {/* Rail toggle (clickable area between content and page) */}
//       <SidebarRail />
//       <SidebarHeader>
//            <div className="flex items-center gap-3 px-3">
//              <Link href="/" onClick={closeMobile} className="flex items-center gap-2 text-black font-bold text-lg">
//                <img src="/demplon-logo.png" alt="DEMPLON" className="h-6 w-auto" />
//                <span>DEMPLON</span>
//              </Link>
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarContentCustom />
//       </SidebarContent>

//       <SidebarFooter>
//         <div className="px-3 py-3 text-xs text-muted-foreground">v1</div>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }
