import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  FileText,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <>
      <Head>
        <title>DEMPLON - Portal Aplikasi</title>
        <meta name="description" content="Portal aplikasi DEMPLON" />
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
                  Portal Aplikasi
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">DEMPLON</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                Akses semua aplikasi dan layanan perusahaan dalam satu tempat.
                Mudah, cepat, dan efisien.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/konsumsi">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Buka Konsumsi
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portal">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-violet-600 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950"
                  >
                    Lihat Semua Aplikasi
                  </Button>
                </Link>
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
                  Aplikasi Populer
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link href={feature.href}>
                      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-violet-200 dark:hover:border-violet-800">
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <feature.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {feature.description}
                          </p>
                          <div className="mt-4 text-violet-600 dark:text-violet-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Buka aplikasi
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
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
