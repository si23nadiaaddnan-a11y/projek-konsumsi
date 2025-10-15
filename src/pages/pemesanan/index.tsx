"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter,
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { 
    Calendar as CalendarIcon, 
    Loader2, 
    ChevronDown, 
    Plus, 
    Trash2, 
    CheckCircle, 
    Clock, 
    XCircle, 
    ChevronUp, 
    MapPin, 
    Package, 
    User,
    LayoutGrid, 
    List,
    Building,
    Phone,
    FileText,
    X,
    FolderClock,
    BadgeCheck,
    ListTodo,
    CakeSlice,
    Truck,
    Activity,
    Info,
    TriangleAlert,
    UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { DateRange } from "react-day-picker";

// FIX: Add a dummy tailwind object to prevent ReferenceError in some environments
const tailwind = {};

// =========================================================================
// 1. DEFINISI TIPE DATA DAN MOCK DATA
// =========================================================================
type OrderStatus = 'Pending' | 'Approved' | 'Rejected' | 'Draft';

interface Order {
    id: string;
    kegiatan: string;
    tanggalPengiriman: Date;
    jenisKonsumsi: string;
    qty: number;
    status: OrderStatus;
    tanggalPermintaan: Date;
    untukBagian: string;
    yangMengajukan: string;
    noHp: string;
    namaApprover: string;
    tipeTamu: string;
    lokasiPengiriman: string;
    sesiWaktu: string;
    waktu: string;
    keterangan: string;
    satuan: string;
}

interface FormData {
    kegiatan: string;
    kegiatanLainnya: string;
    tanggalPermintaan: Date;
    tanggalPengiriman: Date;
    untukBagian: string;
    yangMengajukan: string;
    noHp: string;
    namaApprover: string;
    tipeTamu: string;
    lokasiPengiriman: string;
    sesiWaktu: string;
    waktu: string;
    keterangan: string;
    jenisKonsumsi: string;
    satuan: string;
    qty: number | string; 
}

// Data diperbarui untuk mencocokkan tanggal saat ini agar filter berfungsi
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);


const mockHistory: Order[] = [
    {
        id: "ORD001",
        kegiatan: "Rapat Koordinasi Bulanan",
        tanggalPengiriman: today, // Diubah ke hari ini
        jenisKonsumsi: "Nasi Box",
        qty: 35,
        status: 'Approved',
        tanggalPermintaan: new Date(),
        untukBagian: "Dep. Teknologi Informasi PKC (C001370000)",
        yangMengajukan: "Riza Ilhamsyah (12231149)",
        noHp: "08112345678",
        namaApprover: "Jojok Satriadi (1140122)",
        tipeTamu: "Internal Perusahaan",
        lokasiPengiriman: "Ruang Rapat Utama Lt. 2",
        sesiWaktu: "Siang",
        waktu: "12:00",
        keterangan: "Tolong siapkan 5 porsi vegetarian.",
        satuan: "pax",
    },
    {
        id: "ORD002",
        kegiatan: "Kunjungan Investor",
        tanggalPengiriman: today, // Diubah ke hari ini
        jenisKonsumsi: "Prasmanan",
        qty: 15,
        status: 'Pending',
        tanggalPermintaan: new Date(),
        untukBagian: "Dep. Teknologi Informasi PKC (C001370000)",
        yangMengajukan: "Riza Ilhamsyah (12231149)",
        noHp: "08229876543",
        namaApprover: "Direktur Utama",
        tipeTamu: "Klien/Mitra Bisnis",
        lokasiPengiriman: "Aula Serbaguna",
        sesiWaktu: "Siang",
        waktu: "11:30",
        keterangan: "Konsumsi VIP, menu premium.",
        satuan: "pax",
    },
    {
        id: "ORD003",
        kegiatan: "Workshop Pemasaran Digital",
        tanggalPengiriman: tomorrow, // Diubah ke besok
        jenisKonsumsi: "Coffee Break",
        qty: 50,
        status: 'Rejected',
        tanggalPermintaan: new Date(),
        untukBagian: "Dep. Teknologi Informasi PKC (C001370000)",
        yangMengajukan: "Riza Ilhamsyah (12231149)",
        noHp: "08551231233",
        namaApprover: "Kepala Bagian C",
        tipeTamu: "Umum",
        lokasiPengiriman: "Ruang Meeting Anggrek",
        sesiWaktu: "Sore",
        waktu: "15:00",
        keterangan: "Mohon sediakan kopi low acid.",
        satuan: "pax",
    },
    {
        id: "ORD004",
        kegiatan: "Pelatihan Karyawan Baru",
        tanggalPengiriman: nextWeek, // Diubah ke minggu depan
        jenisKonsumsi: "Snack Box",
        qty: 25,
        status: 'Pending',
        tanggalPermintaan: new Date(),
        untukBagian: "Dep. Teknologi Informasi PKC (C001370000)",
        yangMengajukan: "Riza Ilhamsyah (12231149)",
        noHp: "08123456789",
        namaApprover: "Manajer Divisi B",
        tipeTamu: "Internal Perusahaan",
        lokasiPengiriman: "Ruang Pelatihan",
        sesiWaktu: "Pagi",
        waktu: "09:00",
        keterangan: "",
        satuan: "box",
    },
];

const initialFormData: FormData = {
    kegiatan: '',
    kegiatanLainnya: '',
    tanggalPermintaan: new Date(),
    tanggalPengiriman: new Date(),
    untukBagian: 'Dep. Teknologi Informasi PKC (C001370000)',
    yangMengajukan: 'Riza Ilhamsyah (12231149)',
    noHp: '',
    namaApprover: 'Jojok Satriadi (1140122)',
    tipeTamu: '',
    lokasiPengiriman: '',
    sesiWaktu: '',
    waktu: '08:00',
    keterangan: '',
    jenisKonsumsi: '',
    satuan: '',
    qty: 10,
};

const kegiatanOptions = ["Bahan Minum Karyawan", "Baporkes", "BK3N", "Extra Fooding", "Extra Fooding Shift", "Extra Fooding SKJ", "Festival Inovasi", "Halal Bi Halal", "Hari Guru", "Hari Raya Idu Adha", "Hari Raya Idul Fitri", "HUT PKC", "HUT RI", "Jamuan Diluar Kawasan", "Jamuan Tamu Perusahaan", "Jumat Bersih", "Kajian Rutin", "Ketupat Lebaran", "Konsumsi Buka Puasa", "Konsumsi Makan Sahur", "Konsumsi TA", "Lain-lain Jamuan Tamu", "Lain-lain Perayaan", "Lain-lain Rapat Kantor", "Lembur Perta", "Lembur Rutin", "Lembur Shutdown", "Not Defined", "Nuzurul Quran", "Open Storage","Pengajian Keliling", "Pengantongan Akhir Tahun", "Pengembangan SDM", "PKM Masjid Nahlul Hayat", "Program Akhlak", "Program Makmur", "Program WMS", "Proper Emas", "Proyek Replacament K1A & NZE", "Rakor Direksi Anper PI Group", "Rapat Direksi", "Rapat Distribusi B", "Rapat Distribusi D", "Rapat Gabungan Dekom, Direksi, SVP", "Rapat Internal", "Rapat Komite Audit"];
const bagianOptions = ["Teknologi Informasi"];
const approverOptions = ["Arief Darmawan (3072535)","Anggita Maya Septianingsih (3082589)", "Agung Gustiawan (3092789)", "Andika Arif Rachman (3082592)", "Ardhimas Yuda Baskoro (3042172)", "Amin Puji Hariyanto (3133210)", "Andi Komara (3072517)", "Desra Heriman (3072531)", "Danang Siswantoro (3052402)", "Dady Rahman (3052404)", "Dian Ramdani (3082628)", "Dede Sopian (3072524)", "Dian Risdiana (3072532)", "Dodi Pramadi (3972081)", "Eka Priyatna (3102904)", "Fika Hikmaturrahman (3123195)", "Fajar Nugraha (3022134)", "Freddy Harianto (3072526)", "Febri Rubragandi N (3052400)", "Flan Adi Nugraha Suhara (3052394)", "Gina Amarilis (3082590)", "Henisya Permata Sari (3072498)", "Hikmat Rachmatullah (3072497)", "Handi Rustian (3072485)", "Iswahyudi Mertosono (3082594)", "Indra Irianto (3022136)", "Ira Purnama Sari (3072489)", "Ibrahim Herlambang (3072488)", "Jojok Satriadi (1140122)", "Jondra (3052403)"];
const tipeTamuOptions = ["Internal Perusahaan", "Pejabat Pemerintah", "Klien/Mitra Bisnis", "Umum"];
const lokasiOptions = ["Ruang Meeting Anggrek", "Ruang Rapat Utama Lt. 2", "Aula Serbaguna", "Kantor Pusat", "Ruang Pelatihan"];
const jenisKonsumsiOptions = ["Prasmanan", "Nasi Box", "Snack Box", "Coffee Break"];
const satuanOptions = ["pax", "box", "porsi", "unit", "gelas"];
const sesiWaktuOptions = ["Pagi", "Siang", "Sore", "Malam", "Sahur", "Buka Puasa"];
const waktuOptions = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00",
];

// =========================================================================
// 2. UTILITAS STATUS
// =========================================================================
const getStatusDisplay = (status: OrderStatus) => {
    switch (status) {
        case 'Approved':
            return { icon: CheckCircle, text: 'Disetujui', color: 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30' };
        case 'Pending':
            return { icon: Clock, text: 'Menunggu', color: 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30' };
        case 'Rejected':
            return { icon: XCircle, text: 'Ditolak', color: 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30' };
        default:
            return { icon: Clock, text: 'Draft', color: 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800' };
    }
};

// =========================================================================
// 3. KOMPONEN TAMPILAN RIWAYAT
// =========================================================================
const OrderCard: React.FC<{ order: Order; onDeleteRequest: (order: Order) => void; onViewDetails: (order: Order) => void; }> = ({ order, onDeleteRequest, onViewDetails }) => {
    const statusDisplay = getStatusDisplay(order.status);
    const StatusIcon = statusDisplay.icon;
    const dateFormatted = order.tanggalPengiriman.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <Card className="w-full h-full flex flex-col shadow-md transition-all duration-300 group hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 relative overflow-hidden border">
            <CardHeader className="p-4 pb-2 flex-row items-start justify-between border-b">
                <div className="flex flex-col space-y-1">
                    <CardTitle className="text-sm font-bold text-violet-600 dark:text-violet-400">{order.id}</CardTitle>
                    <CardDescription className="text-xs">{dateFormatted} | {order.waktu}</CardDescription>
                </div>
                <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full", statusDisplay.color)}>
                    <StatusIcon className="h-3 w-3" />
                    {statusDisplay.text}
                </span>
            </CardHeader>
            <CardContent className="p-4 pt-4 space-y-3 text-sm flex-grow">
                <span className="font-semibold text-base leading-tight text-foreground">{order.kegiatan}</span>
                <div className="flex items-start space-x-3 text-muted-foreground border-t pt-3">
                    <Package className="h-4 w-4 text-violet-500 mt-1 flex-shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Menu</span>
                        <span className="font-medium text-foreground">{order.jenisKonsumsi} ({order.qty} {order.satuan})</span>
                    </div>
                </div>
            </CardContent>
           <CardFooter className="p-2 border-t flex justify-end gap-2">
    <Button 
        size="sm" 
        className="bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/60 dark:text-violet-300 dark:hover:bg-violet-900" 
        onClick={() => onViewDetails(order)}
    >
        Detail
    </Button>
    {order.status !== 'Approved' && (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-100 hover:text-red-600" onClick={() => onDeleteRequest(order)}><Trash2 className="h-4 w-4" /></Button>
    )}
</CardFooter>
        </Card>
    );
};

const OrderListItem: React.FC<{ order: Order; onDeleteRequest: (order: Order) => void; onViewDetails: (order: Order) => void; }> = ({ order, onDeleteRequest, onViewDetails }) => {
    const statusDisplay = getStatusDisplay(order.status);
    const StatusIcon = statusDisplay.icon;
    return (
        <Card className="transition-all duration-300 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                <div className="flex items-center gap-4 mb-2 sm:mb-0 flex-grow min-w-0">
                    <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-base text-violet-600 dark:text-violet-400 truncate">{order.kegiatan}</span>
                        <span className="text-sm text-muted-foreground">{order.id} &bull; {order.jenisKonsumsi}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-shrink-0">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full", statusDisplay.color)}><StatusIcon className="h-3 w-3" />{statusDisplay.text}</span>
                    <Button size="sm" className="h-8 bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/60 dark:text-violet-300 dark:hover:bg-violet-900" onClick={() => onViewDetails(order)}
> Detail
</Button>                   {order.status !== 'Approved' && (
                        <Button variant="secondary" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-100 hover:text-red-600" title="Hapus" onClick={() => onDeleteRequest(order)}><Trash2 className="h-4 w-4" /></Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

// =========================================================================
// 4. KOMPONEN RIWAYAT
// =========================================================================
interface OrderHistoryProps {
    history: Order[];
    onDeleteRequest: (order: Order) => void;
    onViewDetails: (order: Order) => void;
    viewMode: 'grid' | 'list';
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ history, onDeleteRequest, onViewDetails, viewMode }) => {
    const hasHistory = history.length > 0;

    return (
        <div className="w-full mt-4 min-h-[50vh]">
            {!hasHistory ? (
               <div className="h-full flex items-center justify-center text-center text-muted-foreground rounded-xl border-2 border-dashed">
                   <div className="flex flex-col items-center justify-center space-y-3">
                       <CakeSlice className="h-12 w-12 text-muted-foreground/30" />
                       <span className="text-lg font-semibold text-foreground/80">Belum Ada Pesanan</span>
                       <p className="text-muted-foreground max-w-xs text-sm">Tidak ada data pesanan yang cocok dengan filter yang Anda pilih.</p>
                   </div>
               </div>
            ) : (
                <AnimatePresence>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {history.map(order => (<motion.div key={order.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}><OrderCard order={order} onDeleteRequest={onDeleteRequest} onViewDetails={onViewDetails} /></motion.div>))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {history.map(order => (<motion.div key={order.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}><OrderListItem order={order} onDeleteRequest={onDeleteRequest} onViewDetails={onViewDetails} /></motion.div>))}
                        </div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

// =========================================================================
// 5. KOMPONEN FORM
// =========================================================================
interface OrderFormProps {
    initialData: FormData;
    onSubmit: (data: Order) => void;
    onCancel: () => void;
    isSuccessful: boolean;
    setIsSuccessful: (isSuccessful: boolean) => void;
}

const OrderFormContent: React.FC<OrderFormProps> = ({ initialData, onSubmit, onCancel, isSuccessful, setIsSuccessful }) => {
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    
    const handleChange = (name: keyof FormData, value: string | number | Date) => {
        const finalValue = name === 'qty' && value !== '' ? parseInt(value as string, 10) : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
        if (errors[name]) { setErrors(prev => { const newErrors = { ...prev }; delete newErrors[name]; return newErrors; }); }
    };
    
    const handleDateChange = (name: keyof FormData, date: Date | undefined) => { if (date) { setFormData(prev => ({ ...prev, [name]: date })); } };
    
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.kegiatan) newErrors.kegiatan = "Kegiatan wajib diisi.";
        if (formData.kegiatan === 'Lainnya' && !formData.kegiatanLainnya) newErrors.kegiatanLainnya = "Harap sebutkan nama kegiatan.";
        if (!formData.namaApprover) newErrors.namaApprover = "Approver wajib dipilih.";
        if (!formData.lokasiPengiriman) newErrors.lokasiPengiriman = "Lokasi wajib diisi.";
        if (!formData.jenisKonsumsi) newErrors.jenisKonsumsi = "Jenis konsumsi wajib diisi.";
        if (Number(formData.qty) <= 0) newErrors.qty = "Jumlah harus lebih dari 0.";
        if (!formData.satuan) newErrors.satuan = "Satuan wajib diisi.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReviewSubmit = (e: React.FormEvent) => { e.preventDefault(); if (isSuccessful) setIsSuccessful(false); if (validateForm()) { setIsReviewOpen(true); } };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsReviewOpen(false);
        const finalKegiatan = formData.kegiatan === 'Lainnya' ? formData.kegiatanLainnya : formData.kegiatan;
        const newOrder: Order = { ...formData, id: `ORD${Math.floor(Math.random() * 90000) + 10000}`, qty: typeof formData.qty === 'string' ? parseInt(formData.qty, 10) : formData.qty, status: 'Pending', kegiatan: finalKegiatan, };
        onSubmit(newOrder);
        setIsSuccessful(true);
    };
    
    useEffect(() => { if(isSuccessful) { setFormData(initialFormData); setErrors({}); } }, [isSuccessful]);

    const allOptions = useMemo(() => ({ kegiatanOptions, bagianOptions, approverOptions, tipeTamuOptions, lokasiOptions, jenisKonsumsiOptions, satuanOptions, sesiWaktuOptions, waktuOptions }), []);
    
    const ReviewDetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
        <div className="flex justify-between items-start py-2">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-semibold text-right">{value}</dd>
        </div>
    );

    return (
        <Card className="w-full max-w-3xl shadow-xl border">
            <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-foreground">Formulir Pemesanan Konsumsi</CardTitle>
                <CardDescription>
                    {isSuccessful ? (<span className="text-green-600 font-medium">Pesanan Anda berhasil dikirim!</span>) : ("Isi detail di bawah ini untuk memulai pesanan Anda.")}
                </CardDescription>
            </CardHeader>

            {isSuccessful ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <CardContent className="text-center py-10 space-y-4"><CheckCircle className="mx-auto h-16 w-16 text-green-500" /><h3 className="text-xl font-semibold text-foreground">Pemesanan Selesai</h3><p className="text-muted-foreground">Permintaan Anda telah dibuat dan menunggu persetujuan.</p></CardContent>
                    <CardFooter className="flex-col sm:flex-row justify-center gap-4 p-6">
                        <Button variant="outline" onClick={onCancel}><ChevronUp className="mr-2 h-4 w-4" />Kembali ke Riwayat</Button>
                        <Button onClick={() => setIsSuccessful(false)}> <Plus className="mr-2 h-4 w-4" /> Buat Pesanan Baru </Button>
                    </CardFooter>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <form onSubmit={handleReviewSubmit}>
                        <CardContent className="grid gap-6 p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-violet-100 dark:bg-violet-900/50 p-4 rounded-lg flex items-start gap-3 border border-violet-200 dark:border-violet-800">
                                    <Info className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-violet-800 dark:text-violet-200">Informasi Order</h4>
                                        <ul className="text-sm text-violet-700 dark:text-violet-300 list-disc pl-4 mt-1 space-y-1">
                                            <li>Order dilakukan minimal H-1 kegiatan.</li>
                                            <li>Order dapat dilakukan pada pukul 07:00 - 14:00.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-lg flex items-start gap-3 border border-amber-200 dark:border-amber-800">
                                    <TriangleAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-amber-800 dark:text-amber-200">Informasi Transaksi</h4>
                                        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                            Informasi untuk pemesanan order wajib di-approve oleh approval.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kegiatan">Nama Kegiatan / Event</Label>
                                <Select onValueChange={(value) => handleChange('kegiatan', value)} value={formData.kegiatan}><SelectTrigger id="kegiatan" className={cn({ "border-red-500": errors.kegiatan })}><SelectValue placeholder="Pilih nama kegiatan/event" /></SelectTrigger><SelectContent>{allOptions.kegiatanOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
                                {errors.kegiatan && <p className="text-xs text-red-600">{errors.kegiatan}</p>}
                            </div>
                            
                            <AnimatePresence>
                            {formData.kegiatan === 'Lainnya' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="space-y-2 overflow-hidden">
                                    <Label htmlFor="kegiatanLainnya">Sebutkan Nama Kegiatan</Label>
                                    <Input id="kegiatanLainnya" placeholder="Contoh: Peresmian Kantor Cabang Baru" value={formData.kegiatanLainnya} onChange={(e) => handleChange('kegiatanLainnya', e.target.value)} className={cn({ "border-red-500": errors.kegiatanLainnya })}/>
                                    {errors.kegiatanLainnya && <p className="text-xs text-red-600">{errors.kegiatanLainnya}</p>}
                                </motion.div>
                            )}
                            </AnimatePresence>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="tanggalPermintaan">Tanggal Permintaan</Label><Popover><PopoverTrigger asChild><Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !formData.tanggalPermintaan && 'text-muted-foreground' )}><CalendarIcon className="mr-2 h-4 w-4" />{formData.tanggalPermintaan ? formData.tanggalPermintaan.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : <span>Pilih tanggal</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={formData.tanggalPermintaan} onSelect={(date) => handleDateChange('tanggalPermintaan', date)} initialFocus /></PopoverContent></Popover></div>
                                <div className="space-y-2"><Label htmlFor="tanggalPengiriman">Tanggal Pengiriman</Label><Popover><PopoverTrigger asChild><Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !formData.tanggalPengiriman && 'text-muted-foreground' )}><CalendarIcon className="mr-2 h-4 w-4" />{formData.tanggalPengiriman ? formData.tanggalPengiriman.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : <span>Pilih tanggal</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={formData.tanggalPengiriman} onSelect={(date) => handleDateChange('tanggalPengiriman', date)} initialFocus /></PopoverContent></Popover></div>
                            </div>
                            
                            <div className="space-y-4 pt-4 border-t">
                                <h4 className="text-lg font-semibold text-violet-700 dark:text-violet-400">Detail Pemesan</h4>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label htmlFor="yangMengajukan">Yang Mengajukan (Nama)</Label><Input id="yangMengajukan" value={formData.yangMengajukan} readOnly className="bg-violet-50 dark:bg-violet-900/50 border-violet-200" /></div>
                                    <div className="space-y-2"><Label htmlFor="untukBagian">Untuk Bagian/Unit</Label><Input id="untukBagian" value={formData.untukBagian} readOnly className="bg-violet-50 dark:bg-violet-900/50 border-violet-200" /></div>
                                    <div className="space-y-2"><Label htmlFor="noHp">No. HP Pengaju</Label><Input id="noHp" placeholder="08xxxxxxxxxx" value={formData.noHp} onChange={(e) => handleChange('noHp', e.target.value)} /></div>
                                    <div className="space-y-2"><Label htmlFor="tipeTamu">Tamu (Tipe)</Label><Select onValueChange={(value) => handleChange('tipeTamu', value)} value={formData.tipeTamu}><SelectTrigger id="tipeTamu"><SelectValue placeholder="Pilih Tipe Tamu" /></SelectTrigger><SelectContent>{allOptions.tipeTamuOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select></div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <h4 className="text-lg font-semibold text-violet-700 dark:text-violet-400">Informasi Pengiriman & Konsumsi</h4>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="space-y-2"><Label htmlFor="lokasiPengiriman">Lokasi Pengiriman</Label><Select onValueChange={(value) => handleChange('lokasiPengiriman', value)} value={formData.lokasiPengiriman}><SelectTrigger id="lokasiPengiriman" className={cn({ "border-red-500": errors.lokasiPengiriman })}><SelectValue placeholder="Pilih lokasi pengiriman" /></SelectTrigger><SelectContent>{allOptions.lokasiOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>{errors.lokasiPengiriman && <p className="text-xs text-red-600">{errors.lokasiPengiriman}</p>}</div>
                                    <div className="space-y-2"><Label htmlFor="sesiWaktu">Waktu</Label><Select onValueChange={(value) => handleChange('sesiWaktu', value)} value={formData.sesiWaktu}><SelectTrigger id="sesiWaktu"><SelectValue placeholder="Pilih waktu" /></SelectTrigger><SelectContent>{allOptions.sesiWaktuOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select></div>
                                    <div className="space-y-2"><Label htmlFor="waktuPengiriman">Pukul</Label><Select onValueChange={(value) => handleChange('waktu', value)} value={formData.waktu}><SelectTrigger id="waktuPengiriman"><SelectValue placeholder="Pilih jam" /></SelectTrigger><SelectContent>{allOptions.waktuOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select></div>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="space-y-2"><Label htmlFor="jenisKonsumsi">Jenis Konsumsi</Label><Select onValueChange={(value) => handleChange('jenisKonsumsi', value)} value={formData.jenisKonsumsi}><SelectTrigger id="jenisKonsumsi" className={cn({ "border-red-500": errors.jenisKonsumsi })}><SelectValue placeholder="Pilih jenis" /></SelectTrigger><SelectContent>{allOptions.jenisKonsumsiOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>{errors.jenisKonsumsi && <p className="text-xs text-red-600">{errors.jenisKonsumsi}</p>}</div>
                                    <div className="space-y-2"><Label htmlFor="qty">Qty</Label><Input id="qty" type="number" placeholder="Jumlah" value={formData.qty} onChange={(e) => handleChange('qty', e.target.value)} className={cn({ "border-red-500": errors.qty })} />{errors.qty && <p className="text-xs text-red-600">{errors.qty}</p>}</div>
                                    <div className="space-y-2"><Label htmlFor="satuan">Satuan</Label><Select onValueChange={(value) => handleChange('satuan', value)} value={formData.satuan}><SelectTrigger id="satuan" className={cn({ "border-red-500": errors.satuan })}><SelectValue placeholder="Pilih satuan" /></SelectTrigger><SelectContent>{allOptions.satuanOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>{errors.satuan && <p className="text-xs text-red-600">{errors.satuan}</p>}</div>
                                </div>
                                <div className="space-y-2"><Label htmlFor="keterangan">Keterangan / Catatan Tambahan</Label><Textarea id="keterangan" placeholder="Catatan" value={formData.keterangan} onChange={(e) => handleChange('keterangan', e.target.value)} /></div>
                            </div>

                            <div className="bg-violet-50 dark:bg-violet-900/50 p-4 rounded-lg border border-violet-200 dark:border-violet-800 space-y-2">
                                <Label htmlFor="namaApprover" className="text-violet-800 dark:text-violet-200 font-bold text-base">Persetujuan</Label>
                                <p className="text-sm text-violet-700 dark:text-violet-300 mb-3">Pilih nama pejabat yang menyetujui pemesanan ini.</p>
                                <Select onValueChange={(value) => handleChange('namaApprover', value)} value={formData.namaApprover}><SelectTrigger id="namaApprover" className={cn("bg-background", { "border-red-500": errors.namaApprover })}><SelectValue placeholder="Pilih nama approver" /></SelectTrigger><SelectContent>{allOptions.approverOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>{errors.namaApprover && <p className="text-xs text-red-600">{errors.namaApprover}</p>}
                            </div>

                        </CardContent>
                        <CardFooter className="flex justify-between p-6 bg-violet-50 dark:bg-violet-950/50 rounded-b-lg">
                            <Button type="button" variant="ghost" onClick={onCancel}>Batal</Button>
                            <Button type="submit" className="text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 transform hover:scale-105">Buat Pesanan <ChevronDown className="h-4 w-4 ml-2 transform rotate-[-90deg]" /></Button>
                        </CardFooter>
                    </form>
                </motion.div>
            )}

<Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
    <DialogContent className="sm:max-w-md p-0 bg-background">
        <DialogHeader className="p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/50 dark:to-fuchsia-950/50">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Review Pesanan Anda
            </DialogTitle>
            <DialogDescription>Pastikan semua detail sudah benar sebelum mengirim.</DialogDescription>
        </DialogHeader>

        {/* [PERBAIKAN UTAMA] Menambahkan background dan padding pada area konten */}
        <div className="grid gap-4 p-6 text-sm text-foreground max-h-[60vh] overflow-y-auto bg-slate-50 dark:bg-slate-900">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                {/* Membungkus setiap bagian dalam 'card' agar rapi */}
                <div className="bg-background p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-violet-600 mb-2 flex items-center gap-2"><Activity className="w-4 h-4" /> Detail Acara</h4>
                    <dl className="space-y-1 divide-y divide-violet-100 dark:divide-violet-900">
                        <ReviewDetailRow label="Kegiatan" value={formData.kegiatan === 'Lainnya' ? formData.kegiatanLainnya : formData.kegiatan} />
                        <ReviewDetailRow label="Tgl. Pengiriman" value={`${formData.tanggalPengiriman.toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}, ${formData.sesiWaktu} ${formData.waktu}`} />
                    </dl>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                 <div className="bg-background p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-violet-600 mb-2 flex items-center gap-2"><Package className="w-4 h-4" /> Rincian Konsumsi</h4>
                    <dl className="space-y-1 divide-y divide-violet-100 dark:divide-violet-900">
                        <ReviewDetailRow label="Menu" value={`${formData.jenisKonsumsi} (${formData.qty} ${formData.satuan})`} />
                        <ReviewDetailRow label="Lokasi" value={formData.lokasiPengiriman} />
                        {formData.keterangan && <ReviewDetailRow label="Catatan" value={<span className="text-left block">{formData.keterangan}</span>} />}
                    </dl>
                </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="bg-background p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-violet-600 mb-2 flex items-center gap-2"><UserCheck className="w-4 h-4" /> Persetujuan</h4>
                    <dl className="space-y-1 divide-y divide-violet-100 dark:divide-violet-900">
                        <ReviewDetailRow label="Approver" value={formData.namaApprover} />
                    </dl>
                </div>
            </motion.div>
        </div>
        
        <DialogFooter className="p-6 bg-violet-50 dark:bg-violet-950/50">
            <Button type="button" variant="outline" onClick={() => setIsReviewOpen(false)} disabled={isSubmitting}>Edit Kembali</Button>
            <Button onClick={handleFinalSubmit} disabled={isSubmitting} className="text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 transform hover:scale-105">{isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</>) : (<>Submit Pesanan</>)}</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>

        </Card>
    );
};


// =========================================================================
// 6. KOMPONEN DIALOG KONFIRMASI & DETAIL
// =========================================================================
const ConfirmationDialog: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string; }> = ({ isOpen, onClose, onConfirm, title, description }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader>
            <DialogFooter>
                <Button variant="ghost" onClick={onClose}>Batal</Button>
                <Button onClick={onConfirm} className="text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105">
                    Hapus
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const OrderDetailsDialog: React.FC<{ order: Order | null; isOpen: boolean; onClose: () => void; }> = ({ order, isOpen, onClose }) => {
    if (!order) return null;
    const statusDisplay = getStatusDisplay(order.status);
    const StatusIcon = statusDisplay.icon;
    
    const detailItem = (Icon: React.ElementType, label: string, value: string | React.ReactNode) => (
        <div className="flex items-start space-x-4">
            <div className="bg-violet-100 dark:bg-violet-900 p-2 rounded-full">
                <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="flex flex-col text-sm pt-1">
                <span className="font-semibold text-foreground">{label}</span>
                <span className="text-muted-foreground">{value}</span>
            </div>
        </div>
    );

    const timelineEvents = [
        { status: `Pesanan Dibuat oleh ${order.yangMengajukan}`, date: order.tanggalPermintaan, icon: Plus },
    ];

    if (order.status === 'Approved' || order.status === 'Rejected') {
        const approvalDate = new Date(order.tanggalPermintaan);
        approvalDate.setMinutes(approvalDate.getMinutes() + 15);
        timelineEvents.push({ 
            status: `Pesanan ${order.status === 'Approved' ? 'Disetujui' : 'Ditolak'} oleh ${order.namaApprover}`, 
            date: approvalDate,
            icon: order.status === 'Approved' ? CheckCircle : XCircle
        });
    }
    if (order.status === 'Approved') {
        const step3Date = new Date(order.tanggalPermintaan); step3Date.setMinutes(step3Date.getMinutes() + 30);
        const step4Date = new Date(order.tanggalPermintaan); step4Date.setMinutes(step4Date.getMinutes() + 45);
        const step5Date = new Date(order.tanggalPermintaan); step5Date.setMinutes(step5Date.getMinutes() + 60);
        timelineEvents.push({ status: 'Pesanan Dikirim ke Mitra', date: step3Date, icon: Activity });
        timelineEvents.push({ status: 'Pesanan DiProses Mitra', date: step4Date, icon: Clock });
        timelineEvents.push({ status: 'Pesanan dalam Pengiriman', date: step5Date, icon: Truck });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl p-0 bg-background">
                <DialogHeader className="p-6 rounded-t-lg bg-gradient-to-br from-violet-50 to-fuchsia-50 border-b-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                                Detail Pesanan: {order.id}
                            </DialogTitle>
                            <DialogDescription>{order.kegiatan}</DialogDescription>
                        </div>
                        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full", statusDisplay.color)}><StatusIcon className="h-3 w-3" />{statusDisplay.text}</span>
                    </div>
                </DialogHeader>
                
                {/* [PERBAIKAN] Menambahkan warna latar belakang ke area konten utama */}
                <div className="px-6 py-6 max-h-[70vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50">
                    
                    {/* [PERBAIKAN] Kolom Kiri dibungkus dalam 'card' */}
                    <div className="space-y-6 bg-background p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg text-foreground">Informasi Pesanan</h3>
                        <div className="space-y-4">
                            {detailItem(User, "Yang Mengajukan", order.yangMengajukan)}
                            {detailItem(Building, "Untuk Bagian", order.untukBagian)}
                            {detailItem(Phone, "No. HP Kontak", order.noHp || "-")}
                            {detailItem(CalendarIcon, "Tgl. Pengiriman", `${order.tanggalPengiriman.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}, ${order.sesiWaktu} pukul ${order.waktu}`)}
                            {detailItem(Package, "Menu Order", `${order.jenisKonsumsi} @ ${order.qty} ${order.satuan}`)}
                            {detailItem(MapPin, "Lokasi", order.lokasiPengiriman)}
                            {order.keterangan && detailItem(FileText, "Keterangan", order.keterangan)}
                        </div>
                    </div>

                    {/* [PERBAIKAN] Kolom Kanan dibungkus dalam 'card' */}
                    <div className="space-y-6 bg-background p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg text-foreground">Riwayat Status</h3>
                        <div className="relative pl-6">
                            <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-violet-200 dark:bg-violet-700"></div>
                            {timelineEvents.map((event, index) => {
                                const isLast = index === timelineEvents.length - 1;
                                return (
                                <div key={index} className="relative mb-6">
                                    <div className={cn("absolute -left-[20px] top-1 w-4 h-4 rounded-full", isLast ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 ring-4 ring-violet-200 dark:ring-violet-900/50' : 'bg-violet-300 dark:bg-violet-600')}></div>
                                    <div className="text-xs text-muted-foreground">{event.date.toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                                    <p className="text-sm font-medium text-foreground">{event.status}</p>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
// =========================================================================
// 7. KOMPONEN FILTER STATUS BARU
// =========================================================================
interface StatusFilterTabsProps {
    activeFilter: OrderStatus | 'All';
    onFilterChange: (status: OrderStatus | 'All') => void;
    counts: Record<OrderStatus | 'All', number>;
}

const StatusFilterTabs: React.FC<StatusFilterTabsProps> = ({ activeFilter, onFilterChange, counts }) => {
    const filters: { label: string; value: OrderStatus | 'All'; icon: React.ElementType }[] = [
        { label: "All", value: "All", icon: ListTodo },
        { label: "Menunggu", value: "Pending", icon: FolderClock },
        { label: "Disetujui", value: "Approved", icon: BadgeCheck },
        { label: "Ditolak", value: "Rejected", icon: XCircle },
    ];

    return (
        <div className="flex flex-wrap items-center gap-2">
            {filters.map(filter => {
                const Icon = filter.icon;
                return (
                    <Button 
                        key={filter.value} 
                        variant={activeFilter === filter.value ? "default" : "outline"}
                        size="sm"
                        className={cn(
                            "flex items-center gap-2 transition-all duration-300",
                            activeFilter === filter.value 
                                ? "text-white bg-gradient-to-r from-violet-500 to-fuchsia-500" 
                                : "bg-background text-foreground"
                        )}
                        onClick={() => onFilterChange(filter.value)}
                    >
                        <Icon className="h-4 w-4" />
                        <span>{filter.label}</span>
                        <span className={cn(
                            "ml-1 text-xs font-bold px-2 py-0.5 rounded-full",
                            activeFilter === filter.value 
                                ? "bg-white text-violet-700"
                                : "bg-violet-200 dark:bg-violet-700 text-violet-600 dark:text-violet-300"
                        )}>
                            {counts[filter.value]}
                        </span>
                    </Button>
                );
            })}
        </div>
    );
}

// =========================================================================
// 8. KOMPONEN UTAMA HALAMAN
// =========================================================================
export default function ConsumptionOrderPage() {
    const [history, setHistory] = useState<Order[]>(mockHistory);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    
    // State untuk Dialog
    const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
    const [isDeleteAllConfirmOpen, setDeleteAllConfirmOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState<Order | null>(null);

    // State untuk Kalender dan Filter
    const [date, setDate] = React.useState<DateRange | undefined>({ from: new Date(new Date().setHours(0,0,0,0)), to: undefined });
    const [activeStatusFilter, setActiveStatusFilter] = useState<OrderStatus | 'All'>('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isOrderTimeLocked, setIsOrderTimeLocked] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const currentHour = new Date().getHours();
            if (currentHour >= 14) {
                setIsOrderTimeLocked(true);
            }
        };
        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);


    const filteredHistory = useMemo(() => {
        let orders = history;
        // Filter berdasarkan tanggal
        if (date?.from) {
             orders = orders.filter(order => {
                const orderDate = new Date(order.tanggalPengiriman);
                orderDate.setHours(0, 0, 0, 0); // Normalisasi tanggal order
                const fromDate = new Date(date.from!);
                fromDate.setHours(0, 0, 0, 0); // Normalisasi tanggal dari
                
                if (date.to) {
                    const toDate = new Date(date.to);
                    toDate.setHours(0, 0, 0, 0); // Normalisasi tanggal ke
                    return orderDate >= fromDate && orderDate <= toDate;
                }
                return orderDate.getTime() === fromDate.getTime();
            });
        }
        
        // Filter berdasarkan status
        if (activeStatusFilter !== 'All') {
            orders = orders.filter(order => order.status === activeStatusFilter);
        }

        return orders;
    }, [history, date, activeStatusFilter]);

    const statusCounts = useMemo(() => {
        const counts: Record<OrderStatus | 'All', number> = { All: 0, Pending: 0, Approved: 0, Rejected: 0, Draft: 0 };
        // Logika penghitungan harus berdasarkan tanggal yang difilter juga agar konsisten
        let baseOrders = history;
         if (date?.from) {
             baseOrders = baseOrders.filter(order => {
                const orderDate = new Date(order.tanggalPengiriman);
                orderDate.setHours(0, 0, 0, 0);
                const fromDate = new Date(date.from!);
                fromDate.setHours(0, 0, 0, 0);
                if (date.to) {
                    const toDate = new Date(date.to);
                    toDate.setHours(0, 0, 0, 0);
                    return orderDate >= fromDate && orderDate <= toDate;
                }
                return orderDate.getTime() === fromDate.getTime();
            });
        }
        
        counts.All = baseOrders.length;
        baseOrders.forEach(order => {
            if (counts[order.status] !== undefined) {
                counts[order.status]++;
            }
        });
        return counts;
    }, [history, date]);

    const handleFormSubmit = (newOrder: Order) => { setHistory(prev => [newOrder, ...prev]); };
    const handleDelete = (order: Order) => { setHistory(prev => prev.filter(item => item.id !== order.id)); setOrderToDelete(null); };
    const handleDeleteAll = () => {
        const remainingOrders = history.filter(order => !filteredHistory.includes(order));
        setHistory(remainingOrders);
        setDeleteAllConfirmOpen(false);
    };
    
    useEffect(() => { if (isSuccessful) { const timer = setTimeout(() => setIsFormVisible(false), 3000); return () => clearTimeout(timer); } }, [isSuccessful]);
    
    if (isFormVisible) {
        return <div className="p-4 sm:p-6 md:p-8 flex justify-center items-start min-h-screen bg-slate-50 dark:bg-slate-900"><OrderFormContent initialData={initialFormData} onSubmit={handleFormSubmit} onCancel={() => setIsFormVisible(false)} isSuccessful={isSuccessful} setIsSuccessful={setIsSuccessful} /></div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8">
            <style>{`
                .rdp-day_selected,
                .rdp-day_selected:focus-visible,
                .rdp-day_selected:hover {
                    background: linear-gradient(to right, #8b5cf6, #d946ef) !important;
                    color: white !important;
                    opacity: 1 !important;
                    border-radius: 9999px !important;
                }
                .rdp-day_range_start,
                .rdp-day_range_end {
                    background: linear-gradient(to right, #8b5cf6, #d946ef) !important;
                    color: white !important;
                    opacity: 1 !important;
                    border-radius: 9999px !important;
                }
                .rdp-day_range_middle {
                    background-color: rgba(167, 139, 250, 0.2) !important;
                    color: #4c1d95 !important;
                    border-radius: 0 !important;
                }
                .dark .rdp-day_range_middle {
                    color: #c4b5fd !important;
                }
            `}</style>
            <Card>
                <CardHeader className="p-6">
                    <div className="bg-violet-50 dark:bg-violet-950/50 p-6 rounded-lg border border-violet-200 dark:border-violet-800 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex items-start gap-4">
                             <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className="hidden sm:block"
                            >
                                <CakeSlice className="w-16 h-16 text-violet-400" />
                            </motion.div>
                            <div>
                                <CardTitle className="text-2xl font-bold text-foreground">Konsumsi</CardTitle>
                                <CardDescription>Pengajuan Konsumsi Karyawan.</CardDescription>
                            </div>
                        </div>

                        <div className="flex flex-col items-stretch gap-4 w-full md:w-auto">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal h-auto py-2 px-3 flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-0.5",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="h-5 w-5 text-violet-500" />
                                    <span className="text-sm font-semibold">
                                        {date?.from ? (
                                        date.to ? (
                                            <>
                                            {date.from.toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })} -{" "}
                                            {date.to.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </>
                                        ) : (
                                            date.from.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
                                        )
                                        ) : (
                                        "Pilih tanggal"
                                        )}
                                    </span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={1}
                                />
                                </PopoverContent>
                            </Popover>
                            
                            <div className="relative">
                                <Button 
                                    onClick={() => { setIsFormVisible(true); setIsSuccessful(false); }} 
                                    className="text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 transform hover:scale-105 w-full py-3 px-6"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Buat Pesanan
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div className="w-full sm:w-auto">
                            <StatusFilterTabs activeFilter={activeStatusFilter} onFilterChange={setActiveStatusFilter} counts={statusCounts} />
                        </div>
                        
                        <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
                            <div className="p-1 bg-violet-100 dark:bg-violet-900 rounded-lg flex">
                                <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => setViewMode('grid')} aria-label="Grid View"><LayoutGrid className="h-4 w-4" /></Button>
                                <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => setViewMode('list')} aria-label="List View"><List className="h-4 w-4" /></Button>
                            </div>
                            {filteredHistory.length > 0 && (
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setDeleteAllConfirmOpen(true)}><Trash2 className="mr-1.5 h-3 w-3" />Hapus Semua</Button>
                            )}
                        </div>
                    </div>

                    <OrderHistory 
                        history={filteredHistory} 
                        onDeleteRequest={setOrderToDelete} 
                        onViewDetails={setOrderDetails} 
                        viewMode={viewMode}
                    />
                </CardContent>
            </Card>

            <ConfirmationDialog isOpen={!!orderToDelete} onClose={() => setOrderToDelete(null)} onConfirm={() => handleDelete(orderToDelete!)} title="Anda Yakin?" description={`Pesanan dengan ID ${orderToDelete?.id} akan dihapus secara permanen.`} />
            <ConfirmationDialog isOpen={isDeleteAllConfirmOpen} onClose={() => setDeleteAllConfirmOpen(false)} onConfirm={handleDeleteAll} title="Hapus Semua Riwayat?" description={`Semua ${filteredHistory.length} pesanan yang tampil akan dihapus. Tindakan ini tidak dapat dibatalkan.`} />
            <OrderDetailsDialog order={orderDetails} isOpen={!!orderDetails} onClose={() => setOrderDetails(null)} />
        </div>
    );
}

