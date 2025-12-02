import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import Table from '@/layouts/app/table';
import {
    create as createRoute,
    index as indexRoute,
} from '@/routes/daily-usages';
import { Head, Link } from '@inertiajs/react';

interface DailyUsageItemSnapshot {
    id: number;
    quantity_used: number;
    total_price: number | string;
    item_name: string; 
}

interface DailyUsage {
    id: number;
    date: string;
    notes: string;
    items: DailyUsageItemSnapshot[];
}

interface Props {
    daily_usages: DailyUsage[];
}

export default function Index({ daily_usages }: Props) {
    return (
        <AppLayout
            breadcrumbs={[{ title: 'Daily Usages', href: indexRoute().url }]}
        >
            <Head title="Daily Usages" />

            <div className="min-h-screen bg-[#FFF7ED] py-12 dark:bg-[#6c4f31]">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                            Daily Usages
                        </h2>
                        <Link href={createRoute().url}>
                            <Button className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]">
                                Record New Usage
                            </Button>
                        </Link>
                    </div>

                    <Table
                        cols={4}
                        emptyMessage="No daily usages recorded."
                        head={
                            <tr className="bg-[#8B4513] dark:bg-[#4a2e16]">
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Items
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Total Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                                    Notes
                                </th>
                            </tr>
                        }
                        rows={daily_usages.map((usage) => (
                            <tr key={usage.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#3A2A1E] dark:text-[#FFF6EC]">
                                    {new Date(usage.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-[#3A2A1E] dark:text-[#FFF6EC]">
                                    <ul className="list-disc pl-4">
                                        {usage.items.map((item) => (
                                            <li key={item.id}>
                                                {item.item_name}: {item.quantity_used}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#3A2A1E] dark:text-[#FFF6EC]">
                                    {Intl.NumberFormat(undefined, {
                                        style: 'currency',
                                        currency: 'IDR',
                                        maximumFractionDigits: 0,
                                    }).format(
                                        usage.items.reduce(
                                            (sum, it) =>
                                                sum + Number(it.total_price ?? 0),
                                            0,
                                        ),
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-[#3A2A1E] dark:text-[#FFF6EC]">
                                    {usage.notes || '-'}
                                </td>
                            </tr>
                        ))}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
