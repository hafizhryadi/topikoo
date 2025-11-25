import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const isLoggedIn = !!auth.user;

    return (
        <>
            <Head title="Welcome - topii.coo">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen flex flex-col"
                style={{
                    background:
                        'linear-gradient(135deg, #D4A574 0%, #C68642 50%, #A0682A 100%)',
                }}
            >
                {/* Navbar */}
                <header className="w-full px-6 py-4 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B4513] shadow-md">
                            <span className="text-lg font-bold text-white">
                                tc
                            </span>
                        </div>
                        <div className="leading-tight">
                            <h1 className="text-lg font-bold text-[#2C1810]">
                                topii.coo
                            </h1>
                            <p className="text-xs text-[#FDF5EC] opacity-90">
                                Sistem Manajemen UMKM Terpadu
                            </p>
                        </div>
                    </div>

                    {/* Right nav */}
                    <nav className="flex items-center gap-3 text-sm">
                        {isLoggedIn ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#8B4513] shadow-sm hover:bg-white transition"
                            >
                                Buka Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-full border border-white/70 px-4 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition"
                                >
                                    Masuk
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Main content */}
                <main className="flex-1 flex items-center justify-center px-6 pb-10">
                    <div className="w-full max-w-5xl grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
                        {/* Left: hero text */}
                        <div className="space-y-4 text-white">
                            <p className="inline-flex items-center rounded-full bg-black/10 px-3 py-1 text-xs font-medium backdrop-blur">
                                ☕ UMKM Coffee Management
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                Kelola stok, penjualan, dan pelanggan UMKM kopimu
                                dalam satu sistem terpadu.
                            </h2>
                            <p className="text-sm md:text-base text-white/90 max-w-md">
                                topii.coo membantu pelaku UMKM mengatur persediaan,
                                memantau penjualan harian, dan mengenal pelanggan
                                dengan lebih dekat—tanpa ribet, dengan tampilan
                                hangat bertema kopi.
                            </p>

                            <div className="flex flex-wrap gap-3 mt-4">
                                {!isLoggedIn && (
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center justify-center rounded-lg bg-[#8B4513] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#6F3610] hover:shadow-lg transition"
                                    >
                                        Mulai Masuk
                                    </Link>
                                )}

                                {isLoggedIn && (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#8B4513] shadow-md hover:bg-[#FFF6EE] transition"
                                    >
                                        Lanjut ke Dashboard
                                    </Link>
                                )}

                                <span className="text-xs text-white/85">
                                    Tidak perlu instalasi rumit — langsung gunakan
                                    di browser.
                                </span>
                            </div>
                        </div>

                        {/* Right: preview card */}
                        <div className="flex justify-center md:justify-end">
                            <div className="w-full max-w-sm rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur">
                                <h3
                                    className="text-lg font-bold mb-4"
                                    style={{ color: '#2C1810' }}
                                >
                                    Ringkasan UMKM-mu
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="rounded-xl border border-[#F2E4D3] bg-[#FFF7EC] p-3">
                                            <p className="text-[10px] text-[#7A5A43]">
                                                Total Produk
                                            </p>
                                            <p className="text-xl font-bold text-[#8B4513]">
                                                150
                                            </p>
                                            <p className="text-[10px] text-[#B08A68]">
                                                +12% bulan ini
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-[#F2E4D3] bg-[#FFF7EC] p-3">
                                            <p className="text-[10px] text-[#7A5A43]">
                                                Penjualan
                                            </p>
                                            <p className="text-xl font-bold text-[#8B4513]">
                                                Rp 45,5Jt
                                            </p>
                                            <p className="text-[10px] text-[#B08A68]">
                                                +8% bulan ini
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-[#F2E4D3] bg-[#FFF7EC] p-3">
                                            <p className="text-[10px] text-[#7A5A43]">
                                                Pelanggan
                                            </p>
                                            <p className="text-xl font-bold text-[#8B4513]">
                                                328
                                            </p>
                                            <p className="text-[10px] text-[#B08A68]">
                                                +15% baru
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 rounded-xl border border-[#F2E4D3] bg-[#FFF9F3] p-4">
                                        <p className="text-xs font-semibold text-[#7A5A43] mb-2">
                                            Aktivitas Terbaru
                                        </p>
                                        <ul className="space-y-2 text-xs text-[#5C4033]">
                                            <li>✅ Pesanan #1234 telah selesai</li>
                                            <li>
                                                📦 Stok kopi gula aren telah diperbarui
                                            </li>
                                            <li>👥 Pelanggan baru terdaftar</li>
                                        </ul>
                                    </div>

                                    <p className="mt-3 text-[10px] text-[#B08A68] text-right">
                                        Tampilan dashboard akan muncul setelah kamu masuk.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
