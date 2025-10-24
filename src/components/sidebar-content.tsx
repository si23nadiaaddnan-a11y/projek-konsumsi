// "use client"

// import React, { useState, useEffect } from "react";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Home, User, ClipboardList, Clock, Box, Menu, Link as LinkIcon, FileText, Circle, MapPin, Shield } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function SidebarContentCustom() {
//   const { setOpenMobile } = useSidebar();
//   const pathname = usePathname();
//   const [active, setActive] = useState<string>("");

//   useEffect(() => {
//     if (pathname) setActive(pathname);
//   }, [pathname]);

//   return (
//     <div className="p-4">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="flex items-center gap-2">
//           <Link href="/" onClick={() => setOpenMobile(false)} className="text-black font-bold text-sm">
//           </Link>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 mb-4">
//         <Avatar>
//           <AvatarImage src="/avatar.jpg" alt="Riza Ilhamsyah" />
//         </Avatar>
//         <div>
//           <div className="text-sm font-semibold">Riza Ilhamsyah</div>
//           <div className="text-xs text-muted-foreground">12231149</div>
//         </div>
//       </div>

//       <SidebarGroup>
//         <SidebarGroupLabel>GENERALS</SidebarGroupLabel>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/"
//                 onClick={() => {
//                   setActive("/");
//                   setOpenMobile(false);
//                 }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/" ? "rounded-md bg-violet-600 text-white" : ""}`}><Home className="h-6 w-6" /><span>Home</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/profile"
//                 onClick={() => {
//                   setActive("/profile");
//                   setOpenMobile(false);
//                 }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/profile" ? "rounded-md bg-violet-600 text-white" : ""}`}><User className="h-6 w-6" /><span>Profile</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/employment"
//                 onClick={() => {
//                   setActive("/employment");
//                   setOpenMobile(false);
//                 }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/employment" ? "rounded-md bg-violet-600 text-white" : ""}`}><ClipboardList className="h-6 w-6" /><span>Employment</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton>
//               <div className={`flex items-center gap-3 px-2 py-2 ${active === "/attendance" ? "rounded-md bg-violet-600 text-white" : ""}`} onClick={() => { setActive("/attendance"); setOpenMobile(false); }}><Clock className="h-6 w-6" /><span>Kehadiran, Koreksi, Cuti, dan Dinas</span></div>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarGroup>

//       <div className="my-4" />

//       <SidebarGroup>
//         <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/portal"
//                 onClick={() => { setActive("/portal"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/portal" ? "rounded-md bg-violet-600 text-white" : ""}`}><Box className="h-6 w-6" /><span>Portal Aplikasi</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/library"
//                 onClick={() => { setActive("/library"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/library" ? "rounded-md bg-violet-600 text-white" : ""}`}><Menu className="h-6 w-6" /><span>Library</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/shortlink"
//                 onClick={() => { setActive("/shortlink"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/shortlink" ? "rounded-md bg-violet-600 text-white" : ""}`}><LinkIcon className="h-6 w-6" /><span>Shortlink</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarGroup>

//       <div className="my-4" />

//       <SidebarGroup>
//         <SidebarGroupLabel>APPS & FEATURES</SidebarGroupLabel>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/siadil"
//                 onClick={() => { setActive("/siadil"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/siadil" ? "rounded-md bg-violet-600 text-white" : ""}`}><FileText className="h-6 w-6" /><span>SIADIL</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>

//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/systik"
//                 onClick={() => { setActive("/systik"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/systik" ? "rounded-md bg-violet-600 text-white" : ""}`}><Circle className="h-6 w-6" /><span>SYSTIK</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/konsumsi"
//                 onClick={() => { setActive("/konsumsi"); setOpenMobile(false); }}
//               >
//                 <div className={`mt-3 rounded-md p-3 flex items-center gap-3 ${active === "/konsumsi" ? "bg-violet-600 text-white" : ""}`}>
//                   <Box className="h-6 w-6" />
//                   <span className="font-medium">Konsumsi</span>
//                 </div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/dokumenku"
//                 onClick={() => { setActive("/dokumenku"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/dokumenku" ? "rounded-md bg-violet-600 text-white" : ""}`}><FileText className="h-6 w-6" /><span>Dokumenku</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>

//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/mystatement"
//                 onClick={() => { setActive("/mystatement"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/mystatement" ? "rounded-md bg-violet-600 text-white" : ""}`}><FileText className="h-6 w-6" /><span>MyStatement</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>

//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/work-area"
//                 onClick={() => { setActive("/work-area"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/work-area" ? "rounded-md bg-violet-600 text-white" : ""}`}><MapPin className="h-6 w-6" /><span>Work Area</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>

//           <SidebarMenuItem>
//             <SidebarMenuButton asChild>
//               <Link
//                 href="/peraturan"
//                 onClick={() => { setActive("/peraturan"); setOpenMobile(false); }}
//               >
//                 <div className={`flex items-center gap-3 px-2 py-2 ${active === "/peraturan" ? "rounded-md bg-violet-600 text-white" : ""}`}><Shield className="h-6 w-6" /><span>Peraturan Perundangan</span></div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarGroup>
//     </div>

//   );
// }
