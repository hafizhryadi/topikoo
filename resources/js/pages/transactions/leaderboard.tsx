import AppLayout from '@/layouts/app-layout';
import Table from '@/layouts/app/table';
import { Head, usePage } from '@inertiajs/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

type LeaderboardRow = {
    phone: string;
    total_spent: number | string;
};

export default function Leaderboard() {
    const { leaderboard = [] } = usePage<{ leaderboard?: LeaderboardRow[] }>()
        .props;

    const headerClass =
        'px-6 py-3 text-left text-xs font-semibold tracking-wider uppercase text-white';
    const cellClass =
        'px-6 py-4 text-sm whitespace-nowrap text-[#3A2A1E] dark:text-[#FFF6EC]';

    const normalized = leaderboard.map((row) => ({
        phone: row.phone,
        total: Number(row.total_spent),
        raw: row,
    }));

    const top3Sorted = normalized
        .filter((r) => !Number.isNaN(r.total))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

    const chartData =
        top3Sorted.length >= 3
            ? [
                  top3Sorted[1],
                  top3Sorted[0],
                  top3Sorted[2],
              ].map((r) => ({
                  phone: r.phone,
                  total: r.total,
              }))
            : top3Sorted.map((r) => ({
                  phone: r.phone,
                  total: r.total,
              }));

    const rows = leaderboard.map((row, idx) => (
        <tr key={idx}>
            <td className={cellClass}>{row.phone || '-'}</td>
            <td className={cellClass}>
                {typeof row.total_spent === 'number'
                    ? Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          maximumFractionDigits: 0,
                      }).format(row.total_spent)
                    : row.total_spent}
            </td>
        </tr>
    ));

    return (
        <AppLayout>
            <Head title="Leaderboard" />
            <div className="min-h-screen bg-[#FFF7ED] py-12 dark:bg-[#6c4f31]">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                            Leaderboard
                        </h2>
                    </div>

                    <div className="mb-10 rounded-2xl border border-[#E6D4C5] bg-white/90 p-6 shadow-sm dark:border-[#A9825C] dark:bg-[#886238]">
                        <h3 className="mb-4 text-lg font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                            Top 3 Pembeli Terbesar
                        </h3>

                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 24,
                                        right: 16,
                                        left: 40,
                                        bottom: 32,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="phone"
                                        tickFormatter={(_, index) =>
                                            index === 1
                                                ? 'Top 1'
                                                : index === 0
                                                  ? 'Top 2'
                                                  : 'Top 3'
                                        }
                                        tick={{
                                            fill: '#2C1810',
                                            fontSize: 12,
                                            fontWeight: 600,
                                        }}
                                    />
                                    <YAxis
                                        tickFormatter={(value: number) =>
                                            Intl.NumberFormat('id-ID', {
                                                maximumFractionDigits: 0,
                                            }).format(value)
                                        }
                                        width={70}
                                    />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                maximumFractionDigits: 0,
                                            }).format(value)
                                        }
                                        labelFormatter={(label, payload) => {
                                            const idx =
                                                (payload?.[0]?.payload &&
                                                    chartData.indexOf(
                                                        payload[0].payload,
                                                    )) || 0;
                                            return idx === 1
                                                ? 'Top 1'
                                                : idx === 0
                                                  ? 'Top 2'
                                                  : 'Top 3';
                                        }}
                                    />
                                    <Bar dataKey="total" fill="#8B4513" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <Table
                        cols={2}
                        emptyMessage="No data yet."
                        head={
                            <tr className="bg-[#8B4513] dark:bg-[#4a2e16]">
                                <th className={headerClass}>Phone</th>
                                <th className={headerClass}>Total Spent</th>
                            </tr>
                        }
                        rows={rows}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
