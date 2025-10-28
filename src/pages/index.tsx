import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Layers,
  FileText,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
  Search,
  Home as HomeIcon,
  User,
  Clock,
  Package,
  Link as LinkIcon,
  File,
  Circle,
  MapPin,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// All menu items from sidebar
const allMenuItems = [
  // GENERALS
  { title: "Home", icon: HomeIcon, href: "/", section: "GENERALS" },
  { title: "Profile", icon: User, href: "/profile", section: "GENERALS" },
  { title: "Employment", icon: Users, href: "/employment", section: "GENERALS" },
  { title: "Kehadiran, Koreksi, Cuti, dan Dinas", icon: Clock, href: "/attendance", section: "GENERALS" },
  // MAIN MENU
  { title: "Portal Aplikasi", icon: Package, href: "/portal", section: "MAIN MENU" },
  { title: "Library", icon: BookOpen, href: "/library", section: "MAIN MENU" },
  { title: "Shortlink", icon: LinkIcon, href: "/shortlink", section: "MAIN MENU" },
  // APPS & FEATURES
  { title: "E-Prosedur", icon: FileText, href: "/e-prosedur", section: "APPS & FEATURES" },
  { title: "Employee Directory", icon: Users, href: "/directory", section: "APPS & FEATURES" },
  { title: "SIADIL", icon: File, href: "/siadil", section: "APPS & FEATURES" },
  { title: "SYSTIK", icon: Circle, href: "/systik", section: "APPS & FEATURES" },
  { title: "Konsumsi", icon: Layers, href: "/konsumsi", section: "APPS & FEATURES" },
  { title: "Dokumentu", icon: File, href: "/dokumentu", section: "APPS & FEATURES" },
  { title: "MyStatement", icon: FileText, href: "/mystatement", section: "APPS & FEATURES" },
  { title: "Work Area", icon: MapPin, href: "/work-area", section: "APPS & FEATURES" },
  { title: "Peraturan Perundangan", icon: Shield, href: "/peraturan", section: "APPS & FEATURES" },
];

const features = [
  {
    title: "Konsumsi",
    description: "Sistem pengajuan dan manajemen konsumsi untuk kegiatan internal",
    icon: Layers,
    href: "/konsumsi",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "E-Prosedur",
    description: "Akses prosedur dan dokumentasi perusahaan",
    icon: FileText,
    href: "/e-prosedur",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Employee Directory",
    description: "Direktori karyawan dan informasi kontak",
    icon: Users,
    href: "/directory",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Library",
    description: "Perpustakaan digital dan sumber daya perusahaan",
    icon: BookOpen,
    href: "/library",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter menu items based on search
  const filteredMenuItems = allMenuItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show featured apps when no search, or search results
  const displayItems = searchQuery ? filteredMenuItems : features;

  return (
    <>
      <Head>
        <title>DEMPLON - Selamat Datang Di</title>
        <meta name="description" content="Selamat Datang di DEMPLON" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-[calc(100vh-8rem)] flex flex-col">
        <section className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 mb-6">
                <Sparkles className="h-4 w-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                  Welcome to DEMPLON
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  Selamat Datang di
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">DEMPLON</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                Akses semua aplikasi dan layanan perusahaan dalam satu tempat.
                Mudah, cepat, dan efisien.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto"
              >
                <Link href="/konsumsi" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Buka Konsumsi
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Cari aplikasi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-violet-300 focus:border-violet-500 dark:border-violet-700 dark:focus:border-violet-500 bg-white dark:bg-slate-800 shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                <span className="text-slate-900 dark:text-white">
                  {searchQuery ? `Hasil Pencarian (${displayItems.length})` : "Aplikasi Populer"}
                </span>
              </h2>

              {displayItems.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                  <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Tidak ada aplikasi yang ditemukan untuk &quot;{searchQuery}&quot;
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayItems.map((item, index) => {
                    // Check if item is from features (has gradient) or from allMenuItems
                    const isFeature = 'gradient' in item;
                    const gradient = isFeature ? item.gradient : 'from-slate-500 to-slate-700';
                    const description = isFeature ? item.description : item.section;
                    
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                      >
                        <Link href={item.href}>
                          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-violet-200 dark:hover:border-violet-800">
                            <CardContent className="p-6">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <item.icon className="h-6 w-6 text-white" />
                              </div>
                              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                                {item.title}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {description}
                              </p>
                              <div className="mt-4 text-violet-600 dark:text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                Buka aplikasi
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <section className="py-8 px-4 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
               2025 DEMPLON. All rights reserved. v1.0.0
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
