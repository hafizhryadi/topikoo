import { Head, Link } from '@inertiajs/react';
import { login } from '@/routes';
import { Coffee, BarChart3, Users, ClipboardList } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="topii.coo – Sistem UMKM Kopi" />

            <div className="min-h-screen bg-linear-to-br from-[#b87033] via-[#c47a3a] to-[#a9642b] text-white">
                {/* NAVBAR */}
                <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3b2414]/85 text-sm font-semibold">
                            tc
                        </div>
                        <div className="leading-tight">
                            <p className="text-lg font-semibold">topii.coo</p>
                            <p className="text-xs text-white/80">
                                UMKM Coffee Management System
                            </p>
                        </div>
                    </div>

                    <nav className="hidden items-center gap-6 text-sm text-white/85 md:flex">
                        <a href="#fitur" className="hover:text-white">
                            Fitur
                        </a>
                        <a href="#manfaat" className="hover:text-white">
                            Manfaat
                        </a>
                        <a href="#cara-pakai" className="hover:text-white">
                            Cara Pakai
                        </a>
                    </nav>

                    <Link
                        href={login()}
                        className="rounded-full border border-white/30 bg-white/5 px-5 py-2 text-sm font-medium shadow-sm backdrop-blur hover:bg-white/15"
                    >
                        Masuk Admin
                    </Link>
                </header>

                {/* HERO */}
                <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-4 lg:flex-row lg:items-center lg:px-8 lg:pb-24">
                    {/* Kiri: penjelasan umum */}
                    <section className="flex-1 space-y-6">
        
                        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                            Kelola stok, penjualan, dan pelanggan dalam satu sistem terpadu.
                        </h1>

                        <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
                            topii.coo membantu pelaku UMKM mencatat
                            persediaan, memantau penjualan harian, dan
                            menyimpan data pelanggan di satu sistem.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                href={login()}
                                className="rounded-full bg-[#3b2414] px-6 py-2.5 text-sm font-semibold shadow-md shadow-black/30 hover:bg-[#2b1a0f]"
                            >
                                Masuk sebagai Admin
                            </Link>
                        </div>
                    </section>

                    {/* Kanan: ringkasan kartu */}
                    <section className="flex-1">
                        <div className="rounded-3xl bg-[#fdf5ee] p-6 text-[#3b2414] shadow-xl shadow-black/30 lg:p-7">
                            <p className="text-xs font-medium text-[#b87033]">
                                Ringkasan Usaha
                            </p>
                            {/* mini stats (bisa nanti diambil dari database) */}
                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl bg-white p-3 text-xs shadow-sm">
                                    <div className="mb-1 flex items-center gap-2 text-[11px] font-medium text-[#b87033]">
                                        <Coffee className="h-3.5 w-3.5" />
                                        Produk
                                    </div>
                                    <div className="text-lg font-semibold">
                                        1 item
                                    </div>
                                    <div className="mt-0.5 text-[11px] text-gray-500">
                                        Contoh data dari modul Items.
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white p-3 text-xs shadow-sm">
                                    <div className="mb-1 flex items-center gap-2 text-[11px] font-medium text-[#b87033]">
                                        <BarChart3 className="h-3.5 w-3.5" />
                                        Penjualan
                                    </div>
                                    <div className="text-lg font-semibold">
                                        Rekap harian
                                    </div>
                                    <div className="mt-0.5 text-[11px] text-gray-500">
                                        Laporan otomatis dari transaksi.
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white p-3 text-xs shadow-sm">
                                    <div className="mb-1 flex items-center gap-2 text-[11px] font-medium text-[#b87033]">
                                        <Users className="h-3.5 w-3.5" />
                                        Pelanggan
                                    </div>
                                    <div className="text-lg font-semibold">
                                        Tercatat rapi
                                    </div>
                                    <div className="mt-0.5 text-[11px] text-gray-500">
                                        Cocok untuk program loyalti.
                                    </div>
                                </div>
                            </div>

                            {/* list fitur singkat */}
                            <div
                                id="fitur"
                                className="mt-5 rounded-2xl bg-white p-4 text-xs shadow-sm"
                            >
                                <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-[#b87033]">
                                    <ClipboardList className="h-3.5 w-3.5" />
                                    Fitur utama topii.coo
                                </div>
                                <ul className="space-y-1 text-[11px] text-gray-700">
                                    <li>• Pencatatan stok bahan baku & produk.</li>
                                    <li>• Monitoring penjualan harian.</li>
                                    <li>• Data pelanggan untuk CRM sederhana.</li>
                                    <li>• Laporan ringkas untuk pemilik UMKM.</li>
                                </ul>
                                <p className="mt-3 text-[11px] text-[#7a5a40]">
                                    Untuk mengubah data, admin harus login
                                    terlebih dahulu.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                {/* SECTION MANFAAT + FOOTER */}
                <section
                    id="manfaat"
                    className="bg-[#fdf5ee]/80 text-[#3b2414]"
                >
                    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row lg:px-8">
                        <div className="flex-1 space-y-3">
                            <h3 className="text-lg font-semibold">
                                Kenapa menggunakan sistem topii.coo?
                            </h3>
                            <ul className="space-y-2 text-sm text-[#6b4a30]">
                                <li>
                                    • Tampilan sederhana, bisa diakses lewat
                                    browser HP.
                                </li>
                                <li>
                                    • Membantu memisahkan stok usaha dengan lebih mudah.
                                </li>
                                <li>
                                    • Rekap penjualan membantu perhitungan
                                    keuntungan harian.
                                </li>
                            </ul>
                        </div>

                        <div
                            id="cara-pakai"
                            className="flex-1 space-y-3 text-sm text-[#6b4a30]"
                        >
                            <h3 className="text-lg font-semibold">
                                Cara pakai singkat
                            </h3>
                            <ol className="list-decimal space-y-1 pl-5">
                                <li>Admin login melalui tombol “Masuk Admin”.</li>
                                <li>Daftarkan item & bahan baku.</li>
                                <li>Catat penjualan dan pemakaian stok.</li>
                                <li>
                                    Lihat ringkasan di dashboard untuk pengambilan
                                    keputusan.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <footer className="border-t border-[#e2cfbf] py-4 text-center text-xs text-[#8b6a4b]">
                        © {new Date().getFullYear()} topii.coo — Sistem
                        manajemen sederhana untuk UMKM kopi.
                    </footer>
                </section>
            </div>
        </>
    );
}
