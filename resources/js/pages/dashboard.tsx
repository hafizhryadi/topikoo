import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { index as itemsIndex } from '@/routes/items';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Coffee, Package, Users, BarChart3 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            {/* Wrapper utama dengan tema kopi */}
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl bg-[#FFF7ED] p-6">
                {/* Header */}
                <header className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B4513] shadow-md">
                            <Coffee className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-[#2C1810]">
                                Topiicoo Dashboard
                            </h1>
                            <p className="text-sm text-[#7C6A5A]">
                                Ringkasan cepat aktivitas inventory & CRM dalam satu tempat.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-full bg-[#F5E6D4] px-4 py-2 text-xs font-medium text-[#5C4033]">
                        Selamat datang kembali, admin
                    </div>
                </header>

                {/* MENU CARDS */}
                <section className="grid gap-4 md:grid-cols-3">
                    {/* Inventory / Items */}
                    <Link
                        href={itemsIndex().url}
                        className="group flex flex-col justify-between rounded-2xl border border-[#E6D4C5] bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#B0845A]">
                                    Inventory
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810]">
                                    Items & Stok Bahan Baku Usaha
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4E6]">
                                <Package className="h-5 w-5 text-[#8B4513]" />
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-[#7C6A5A]">
                            Kelola daftar produk kopi, jumlah stok, dan nilai persediaan.
                        </p>
                        <div className="mt-4 flex items-center justify-between text-xs text-[#5C4033]">
                            <span className="rounded-full bg-[#F7E6D4] px-3 py-1 font-medium">
                                Lihat Items
                            </span>
                            <span className="group-hover:text-[#8B4513]">
                                ›
                            </span>
                        </div>
                    </Link>

                    {/* CRM */}
                    <div className="flex flex-col justify-between rounded-2xl border border-[#E6D4C5] bg-white/80 p-5 opacity-90 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#B0845A]">
                                    CRM
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810]">
                                    Pelanggan
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDECEC]">
                                <Users className="h-5 w-5 text-[#A85125]" />
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-[#7C6A5A]">
                            Modul CRM akan membantu melacak pelanggan, pesanan, dan loyalitas.
                        </p>
                        <div className="mt-4 text-xs font-medium text-[#B0845A]">
                            ..........
                        </div>
                    </div>

                    {/* Reports */}
                    <div className="flex flex-col justify-between rounded-2xl border border-[#E6D4C5] bg-white/80 p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-[#B0845A]">
                                    Reports
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810]">
                                    Laporan Harian
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5FF]">
                                <BarChart3 className="h-5 w-5 text-[#8B4513]" />
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-[#7C6A5A]">
                            Rekap pemakaian item harian, nilai stok, dan performa penjualan.
                        </p>
                        <div className="mt-4 text-xs font-medium text-[#B0845A]">
                            ................
                        </div>
                    </div>
                </section>

                {/* PANEL AKTIVITAS */}
                <section className="mt-8 grid gap-4 rounded-2xl bg-[#FFF6ED] p-6 md:grid-cols-[1.3fr_1fr]">
                    {/* Kiri: Aktivitas Terbaru */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#3C2415]">
                            Aktivitas Terbaru
                        </h2>
                        <p className="mt-1 text-sm text-[#8B6B4A]">
                            Pantau pergerakan stok dan aktivitas sistem Topiicoo di sini.
                        </p>

                        <div className="mt-4 space-y-3">
                            {/* Status 1 */}
                            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-sm">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                                <div>
                                    <p className="text-sm font-medium text-[#3C2415]">
                                        Inventory
                                    </p>
                                    <p className="text-xs text-[#8B6B4A]">
                                        1 produk aktif terdaftar di modul Items. Nilai persediaan
                                        sudah terbaca di sistem.
                                    </p>
                                </div>
                            </div>

                            {/* Status 2 */}
                            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-sm">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f97316]" />
                                <div>
                                    <p className="text-sm font-medium text-[#3C2415]">
                                        Reminder Stok
                                    </p>
                                    <p className="text-xs text-[#8B6B4A]">
                                        Pastikan stok rutin diperbarui sebelum jadwal jualan agar
                                        laporan harian tetap akurat.
                                    </p>
                                </div>
                            </div>

                            {/* Status 3 */}
                            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-sm">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#eab308]" />
                                <div>
                                    <p className="text-sm font-medium text-[#3C2415]">
                                        Catatan Produk
                                    </p>
                                    <p className="text-xs text-[#8B6B4A]">
                                        Lengkapi deskripsi produk (jenis kopi, kemasan, catatan
                                        rasa) untuk memudahkan laporan dan CRM.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kanan: Ringkasan Cepat */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold tracking-wide text-[#A46A3B]">
                            RINGKASAN CEPAT
                        </h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 shadow-sm">
                                <div>
                                    <p className="text-xs font-medium text-[#8B6B4A]">
                                        Total Produk
                                    </p>
                                    <p className="text-base font-semibold text-[#3C2415]">
                                        1 item
                                    </p>
                                </div>
                                <span className="rounded-full bg-[#FFF0D9] px-3 py-1 text-xs font-medium text-[#A46A3B]">
                                    Inventory
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 shadow-sm">
                                <div>
                                    <p className="text-xs font-medium text-[#8B6B4A]">
                                        Status Stok
                                    </p>
                                    <p className="text-base font-semibold text-[#16a34a]">
                                        Aman
                                    </p>
                                </div>
                                <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-medium text-[#15803d]">
                                    Ready to sell
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 shadow-sm">
                                <div>
                                    <p className="text-xs font-medium text-[#8B6B4A]">
                                        Modul Aktif
                                    </p>
                                    <p className="text-base font-semibold text-[#3C2415]">
                                        Items
                                    </p>
                                </div>
                                <span className="rounded-full bg-[#FFEAD5] px-3 py-1 text-xs font-medium text-[#C05621]">
                                    Dasar laporan harian
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}
