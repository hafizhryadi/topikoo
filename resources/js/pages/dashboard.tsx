import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Package,
    Percent,
    ShoppingCart,
    TicketPercent,
    Users,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface MetricsProps {
    [key: string]: unknown;
    metrics?: {
        items: number;
        products: number;
        transactions: number;
        daily_usages: number;
        revenue: number;
        unique_customers: number;
        promo_codes_total: number;
        promo_codes_unredeemed: number;
    };
}

export default function Dashboard() {
    const { props } = usePage<MetricsProps>();
    const m = props.metrics ?? {
        items: 0,
        products: 0,
        transactions: 0,
        daily_usages: 0,
        revenue: 0,
        unique_customers: 0,
        promo_codes_total: 0,
        promo_codes_unredeemed: 0,
    };

    const fmtCurrency = (v: number) =>
        Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(v);
    const averageTransactionValue =
        m.transactions > 0 ? Math.round(m.revenue / m.transactions) : 0;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {/* Wrapper utama dengan tema kopi */}
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl bg-[#FFF7ED] p-6 dark:bg-[#1d150c]">
                {/* Header */}
                <header className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-30 w-30 items-center justify-center">
                            <img src="topico_logo.png" alt="" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-[#2C1810] dark:text-white">
                                Topiicoo Dashboard
                            </h1>
                            <p className="text-sm text-[#7C6A5A] dark:text-[#D7C4B8]">
                                Ringkasan cepat aktivitas inventory & CRM dalam
                                satu tempat.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-full bg-[#F5E6D4] px-4 py-2 text-xs font-medium text-[#5C4033] dark:bg-[#A9825C] dark:text-[#FFF6EC]">
                        Selamat datang kembali, admin
                    </div>
                </header>

                {/* MENU / SUMMARY CARDS */}
                <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
                    <Link
                        href="/items"
                        className="group flex flex-col gap-3 rounded-2xl border border-[#E6D4C5] bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#A9825C] dark:bg-[#886238]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-[#B0845A] uppercase">
                                    Items
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                                    Inventory & Stock
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4E6]">
                                <Package className="h-5 w-5 text-[#8B4513]" />
                            </div>
                        </div>
                        <p className="text-sm text-[#7C6A5A] dark:text-[#E6D5C7]">
                            Total item types terdaftar.
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-[#5C4033] dark:text-[#FFF6EC]">
                            <span className="rounded-full bg-[#F7E6D4] px-3 py-1 font-medium dark:bg-[#A9825C]">
                                {m.items} jenis
                            </span>
                            <span className="group-hover:text-[#8B4513]">
                                ›
                            </span>
                        </div>
                    </Link>

                    <Link
                        href="/products"
                        className="group flex flex-col gap-3 rounded-2xl border border-[#E6D4C5] bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#A9825C] dark:bg-[#886238]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-[#B0845A] uppercase">
                                    Products
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                                    Menu Aktif
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDECEC]">
                                <ShoppingCart className="h-5 w-5 text-[#A85125]" />
                            </div>
                        </div>
                        <p className="text-sm text-[#7C6A5A] dark:text-[#E6D5C7]">
                            Produk kopi / minuman dijual.
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-[#5C4033] dark:text-[#FFF6EC]">
                            <span className="rounded-full bg-[#F7E6D4] px-3 py-1 font-medium dark:bg-[#A9825C]">
                                {m.products} produk
                            </span>
                            <span className="group-hover:text-[#8B4513]">
                                ›
                            </span>
                        </div>
                    </Link>

                    <Link
                        href="/transactions"
                        className="group flex flex-col gap-3 rounded-2xl border border-[#E6D4C5] bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#A9825C] dark:bg-[#886238]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-[#B0845A] uppercase">
                                    Transactions
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                                    Penjualan
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5FF]">
                                <BarChart3 className="h-5 w-5 text-[#8B4513]" />
                            </div>
                        </div>
                        <p className="text-sm text-[#7C6A5A] dark:text-[#E6D5C7]">
                            Total transaksi tercatat.
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-[#5C4033] dark:text-[#FFF6EC]">
                            <span className="rounded-full bg-[#F7E6D4] px-3 py-1 font-medium dark:bg-[#A9825C]">
                                {m.transactions} trx
                            </span>
                            <span className="group-hover:text-[#8B4513]">
                                ›
                            </span>
                        </div>
                    </Link>

                    <Link
                        href="/daily-usages"
                        className="group flex flex-col gap-3 rounded-2xl border border-[#E6D4C5] bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#A9825C] dark:bg-[#886238]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-[#B0845A] uppercase">
                                    Daily Usages
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                                    Pemakaian Bahan
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4E6]">
                                <Percent className="h-5 w-5 text-[#8B4513]" />
                            </div>
                        </div>
                        <p className="text-sm text-[#7C6A5A] dark:text-[#E6D5C7]">
                            Log pemakaian harian tercatat.
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-[#5C4033] dark:text-[#FFF6EC]">
                            <span className="rounded-full bg-[#F7E6D4] px-3 py-1 font-medium dark:bg-[#A9825C]">
                                {m.daily_usages} log
                            </span>
                            <span className="group-hover:text-[#8B4513]">
                                ›
                            </span>
                        </div>
                    </Link>

                    <Link
                        href="/leaderboard"
                        className="group flex flex-col gap-3 rounded-2xl border border-[#E6D4C5] bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#A9825C] dark:bg-[#886238]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-[#B0845A] uppercase">
                                    Leaderboard
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                                    Top Customers
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDECEC]">
                                <Users className="h-5 w-5 text-[#A85125]" />
                            </div>
                        </div>
                        <p className="text-sm text-[#7C6A5A] dark:text-[#E6D5C7]">
                            Pelanggan unik tercatat.
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-[#5C4033] dark:text-[#FFF6EC]">
                            <span className="rounded-full bg-[#F7E6D4] px-3 py-1 font-medium dark:bg-[#A9825C]">
                                {m.unique_customers} pelanggan
                            </span>
                            <span className="group-hover:text-[#8B4513]">
                                ›
                            </span>
                        </div>
                    </Link>

                    <Link
                        href="/redeem"
                        className="group flex flex-col gap-3 rounded-2xl border border-[#E6D4C5] bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#A9825C] dark:bg-[#886238]"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-[#B0845A] uppercase">
                                    Promos
                                </p>
                                <h2 className="mt-1 text-lg font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                                    Kode Promo
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5FF]">
                                <TicketPercent className="h-5 w-5 text-[#8B4513]" />
                            </div>
                        </div>
                        <p className="text-sm text-[#7C6A5A] dark:text-[#E6D5C7]">
                            Redeem kode promo
                        </p>
                        <div className="mt-auto flex items-center justify-between text-xs text-[#5C4033] dark:text-[#FFF6EC]">
                            <span className="">
                                {/* {m.promo_codes_unredeemed}/{m.promo_codes_total} */}
                            </span>
                            <span className="group-hover:text-[#8B4513]">
                                ›
                            </span>
                        </div>
                    </Link>
                </section>

                {/* PANEL AKTIVITAS */}
                <section className="mt-8 grid gap-4 rounded-2xl bg-[#FFF6ED] p-6 md:grid-cols-[1.3fr_1fr] dark:bg-[#6c4f31]">
                    {/* Kiri: Aktivitas Terbaru */}
                    <div>
                        <h2 className="text-lg font-semibold text-[#3C2415] dark:text-[#FFF6EC]">
                            Aktivitas Terbaru
                        </h2>
                        <p className="mt-1 text-sm text-[#8B6B4A] dark:text-[#E6D5C7]">
                            Pantau pergerakan stok dan aktivitas sistem Topiicoo
                            di sini.
                        </p>

                        <div className="mt-4 space-y-3">
                            {/* Status 1 */}
                            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-sm dark:bg-[#886238]">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                                <div>
                                    <p className="text-sm font-medium text-[#3C2415] dark:text-[#FFF6EC]">
                                        Ringkasan Penjualan
                                    </p>
                                    <p className="text-xs text-[#8B6B4A] dark:text-[#E6D5C7]">
                                        Total revenue tercatat:{' '}
                                        {fmtCurrency(m.revenue)}
                                    </p>
                                </div>
                            </div>

                            {/* Status 2 */}
                            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-sm dark:bg-[#886238]">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f97316]" />
                                <div>
                                    <p className="text-sm font-medium text-[#3C2415] dark:text-[#FFF6EC]">
                                        Nilai Rata-Rata Transaksi
                                    </p>
                                    <p className="text-xs text-[#8B6B4A] dark:text-[#E6D5C7]">
                                        Rata-rata per transaksi:{' '}
                                        {fmtCurrency(averageTransactionValue)} •
                                        Total transaksi: {m.transactions}
                                    </p>
                                </div>
                            </div>

                            {/* Status 3 */}
                            <div className="flex items-start gap-3 rounded-xl bg-white/80 p-3 shadow-sm dark:bg-[#886238]">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#eab308]" />
                                <div>
                                    <p className="text-sm font-medium text-[#3C2415] dark:text-[#FFF6EC]">
                                        Aktivitas Sistem
                                    </p>
                                    <p className="text-xs text-[#8B6B4A] dark:text-[#E6D5C7]">
                                        Log harian: {m.daily_usages} •
                                        Transaksi: {m.transactions} • Pelanggan:{' '}
                                        {m.unique_customers}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kanan: Ringkasan Cepat */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold tracking-wide text-[#A46A3B] dark:text-[#FFF6EC]">
                            RINGKASAN CEPAT
                        </h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 shadow-sm dark:bg-[#886238]">
                                <div>
                                    <p className="text-xs font-medium text-[#8B6B4A] dark:text-[#E6D5C7]">
                                        Total Produk
                                    </p>
                                    <p className="text-base font-semibold text-[#3C2415] dark:text-[#FFF6EC]">
                                        {m.products} produk
                                    </p>
                                </div>
                                <span className="rounded-full bg-[#FFF0D9] px-3 py-1 text-xs font-medium text-[#A46A3B] dark:bg-[#A9825C] dark:text-[#FFF6EC]">
                                    Inventory
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 shadow-sm dark:bg-[#886238]">
                                <div>
                                    <p className="text-xs font-medium text-[#8B6B4A] dark:text-[#E6D5C7]">
                                        Item Types
                                    </p>
                                    <p className="text-base font-semibold text-[#3C2415] dark:text-[#FFF6EC]">
                                        {m.items} jenis
                                    </p>
                                </div>
                                <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-medium text-[#15803d] dark:bg-[#A9825C] dark:text-[#FFF6EC]">
                                    Ready to sell
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 shadow-sm dark:bg-[#886238]">
                                <div>
                                    <p className="text-xs font-medium text-[#8B6B4A] dark:text-[#E6D5C7]">
                                        Customers
                                    </p>
                                    <p className="text-base font-semibold text-[#3C2415] dark:text-[#FFF6EC]">
                                        {m.unique_customers} unik
                                    </p>
                                </div>
                                <span className="rounded-full bg-[#FFEAD5] px-3 py-1 text-xs font-medium text-[#C05621] dark:bg-[#A9825C] dark:text-[#FFF6EC]">
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
