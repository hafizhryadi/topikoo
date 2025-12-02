import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import Table from '@/layouts/app/table';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useMemo, useState } from 'react';

interface TransactionRow {
    id: number;
    date: string;
    note?: string | null;
    phone?: number;
    product_id?: number;
    product?: { id: number; name: string };
    amount?: number;
    unit_price?: number | string;
    total_price?: number | string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

type CreateItem = {
    product_id: number | '';
    amount: number | '';
    unit_price: number | '';
};

type CreateFormData = {
    date: string;
    notes: string;
    phone: string | number;
    items: CreateItem[];
};

export default function Index() {
    const { transactions = [], products = [] } = usePage<
        SharedData & { transactions?: TransactionRow[]; products?: Product[] }
    >().props;
    const [showCreate, setShowCreate] = useState(false);

    const headerClass =
        'px-6 py-3 text-left text-xs font-semibold tracking-wider uppercase text-white';
    const cellClass =
        'px-6 py-4 text-sm whitespace-nowrap text-[#3A2A1E] dark:text-[#FFF6EC]';

    const productsById = useMemo(() => {
        const map: Record<number, Product> = {};
        (products || []).forEach((p: Product) => (map[p.id] = p));
        return map;
    }, [products]);

    const form = useForm<CreateFormData>({
        date: '',
        notes: '',
        phone: '',
        items: [{ product_id: '', amount: 1, unit_price: '' }],
    });

    function addRow() {
        form.setData('items', [
            ...form.data.items,
            { product_id: '', amount: 1, unit_price: '' },
        ]);
    }

    function removeRow(index: number) {
        const next = form.data.items.slice();
        next.splice(index, 1);
        form.setData('items', next);
    }

    function onProductChange(index: number, value: string) {
        const next = form.data.items.slice();
        const pid = value === '' ? '' : Number(value);
        next[index].product_id = pid;
        if (pid && productsById[pid]) {
            next[index].unit_price = productsById[pid].price;
        } else {
            next[index].unit_price = '';
        }
        form.setData('items', next);
    }

    function onAmountChange(index: number, value: string) {
        const next = form.data.items.slice();
        next[index].amount = value === '' ? '' : Number(value);
        form.setData('items', next);
    }

    function onUnitPriceChange(index: number, value: string) {
        const next = form.data.items.slice();
        next[index].unit_price = value === '' ? '' : Number(value);
        form.setData('items', next);
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        form.post('/transactions', {
            onSuccess: () => form.reset('items'),
        });
    }

    const rows = (transactions || []).map((t: TransactionRow) => (
        <tr key={t.id}>
            <td className={cellClass}>
                {new Date(t.date).toLocaleDateString()}
            </td>
            <td className={cellClass.replace('whitespace-nowrap', '')}>
                {t.product?.name || '—'}
            </td>
            <td className={cellClass}>{t.amount ?? '-'}</td>
            <td className={cellClass}>{t.phone || '-'}</td>
            <td className={cellClass}>
                {typeof t.unit_price === 'number'
                    ? t.unit_price.toLocaleString()
                    : t.unit_price}
            </td>
            <td className={cellClass}>
                {typeof t.total_price === 'number'
                    ? t.total_price.toLocaleString()
                    : t.total_price}
            </td>
            <td className={cellClass.replace('whitespace-nowrap', '')}>
                {t.note || '-'}
            </td>
        </tr>
    ));

    return (
        <AppLayout>
            <Head title="Transactions" />
            <div className="min-h-screen bg-[#FFF7ED] py-12 dark:bg-[#6c4f31]">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                            Transactions
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                type="button"
                                onClick={() => setShowCreate((s) => !s)}
                                className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]"
                            >
                                New Transaction
                            </Button>
                            <Button
                                type="button"
                                onClick={() =>
                                    (window.location.href =
                                        '/transactions/report/weekly')
                                }
                                className="rounded-full bg-[#3A2A1E] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#2A1E14]"
                            >
                                Download Weekly Report
                            </Button>
                        </div>
                    </div>

                    {showCreate && (
                        <div className="mb-6 rounded-2xl border border-[#E6D4C5] bg-white/90 p-4 shadow-sm dark:border-[#A9825C] dark:bg-[#886238]">
                            <form onSubmit={submit} className="grid gap-4">
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <div>
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={form.data.date}
                                            onChange={(e) =>
                                                form.setData(
                                                    'date',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        <InputError
                                            message={form.errors.date as string}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="notes">Notes</Label>
                                        <Input
                                            id="notes"
                                            value={form.data.notes}
                                            onChange={(e) =>
                                                form.setData(
                                                    'notes',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={
                                                form.errors.notes as string
                                            }
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={form.data.phone}
                                            onChange={(e) =>
                                                form.setData(
                                                    'phone',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={
                                                form.errors.phone as string
                                            }
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label>Items</Label>
                                    <div className="mt-2 space-y-2">
                                        {form.data.items.map(
                                            (row: CreateItem, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="grid grid-cols-12 items-end gap-2"
                                                >
                                                    <div className="col-span-5">
                                                        <select
                                                            className="mt-1 block w-full rounded-md border border-[#E6D4C5] bg-white px-3 py-2 text-sm text-[#3A2A1E] shadow-sm outline-none focus:border-[#8B4513] focus:ring-1 focus:ring-[#8B4513] dark:border-[#A9825C] dark:bg-[#4a2e16] dark:text-[#FFF6EC]"
                                                            value={String(
                                                                row.product_id ??
                                                                    '',
                                                            )}
                                                            onChange={(e) =>
                                                                onProductChange(
                                                                    idx,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                        >
                                                            <option value="">
                                                                Select product
                                                            </option>
                                                            {(
                                                                products || []
                                                            ).map(
                                                                (
                                                                    p: Product,
                                                                ) => (
                                                                    <option
                                                                        key={p.id}
                                                                        value={
                                                                            p.id
                                                                        }
                                                                    >
                                                                        {
                                                                            p.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            value={row.amount}
                                                            onChange={(e) =>
                                                                onAmountChange(
                                                                    idx,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-span-3">
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            value={
                                                                row.unit_price
                                                            }
                                                            onChange={(e) =>
                                                                onUnitPriceChange(
                                                                    idx,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <div className="text-sm text-[#3A2A1E] dark:text-[#FFF6EC]">
                                                            {Intl.NumberFormat(
                                                                undefined,
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'IDR',
                                                                    maximumFractionDigits: 0,
                                                                },
                                                            ).format(
                                                                (Number(
                                                                    row.unit_price,
                                                                ) || 0) *
                                                                    (Number(
                                                                        row.amount,
                                                                    ) || 0),
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 text-center">
                                                        <button
                                                            type="button"
                                                            className="text-lg font-bold text-red-600 hover:text-red-700"
                                                            onClick={() =>
                                                                removeRow(idx)
                                                            }
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                        <div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={addRow}
                                                className="border-[#8B4513] text-[#8B4513] hover:bg-[#FFF7ED]"
                                            >
                                                Add item
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="submit"
                                        className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]"
                                    >
                                        Create Transaction
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setShowCreate(false)}
                                        className="text-[#8B4513] hover:text-[#6F3510]"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    <Table
                        cols={7} // 👉 7 kolom: Date, Product, Amount, Phone, Unit Price, Total, Notes
                        emptyMessage="No transactions yet."
                        head={
                            // 👉 header bar coklat tua dengan teks putih
                            <tr className="bg-[#8B4513] dark:bg-[#4a2e16]">
                                <th className={headerClass}>Date</th>
                                <th className={headerClass}>Product</th>
                                <th className={headerClass}>Amount</th>
                                <th className={headerClass}>Phone</th>
                                <th className={headerClass}>Unit Price</th>
                                <th className={headerClass}>Total</th>
                                <th className={headerClass}>Notes</th>
                            </tr>
                        }
                        rows={rows}
                    />
                </div>
            </div>
        </AppLayout>
    );
}