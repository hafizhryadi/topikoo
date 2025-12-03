import AppLayout from '@/layouts/app-layout';
import Table from '@/layouts/app/table';
import { Head, usePage } from '@inertiajs/react';

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

    const rows = (leaderboard || []).map((row, idx) => (
        <tr key={idx}>
            <td className={cellClass}>{row.phone || '-'}</td>
            <td className={cellClass}>
                {typeof row.total_spent === 'number'
                    ? Intl.NumberFormat(undefined, {
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
            <div className="bg-[#FFF7ED] p-6 dark:bg-[#1d150c]">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Leaderboard
                        </h2>
                    </div>

                    <Table
                        cols={2}
                        emptyMessage="No data yet."
                        head={
                            <tr>
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
