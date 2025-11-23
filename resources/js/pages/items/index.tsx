import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index as itemsIndex, store as itemsStore } from '@/routes/items';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Item {
    id: number;
    name: string;
    description?: string | null;
    quantity: number;
    price: number;
    value: number;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown;
}

export default function ItemsIndex() {
    const [showCreate, setShowCreate] = useState(false);
    const form = useForm({
        name: '',
        quantity: 0,
        price: 0,
        description: '',
    });
    const { items } = usePage<SharedData & { items: Item[] }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Items', href: itemsIndex().url },
    ];

    const fmt = (v: unknown) => {
        if (v === null || v === undefined) return '-';
        if (typeof v === 'number') return v.toLocaleString();
        return String(v);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />

            <div className="dark min-h-screen p-6">
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-lg font-medium">Items</h1>
                    <div>
                        {/* Toggle inline create form */}
                        <Button
                            type="button"
                            onClick={() => setShowCreate((s) => !s)}
                        >
                            New item
                        </Button>
                    </div>
                </header>

                {showCreate && (
                    <div className="mb-6 rounded-md bg-card p-4 shadow-sm">
                        <form
                            onSubmit={(e: FormEvent) => {
                                e.preventDefault();
                                form.post(itemsStore().url, {
                                    onSuccess: () => {
                                        setShowCreate(false);
                                        form.reset();
                                    },
                                });
                            }}
                            className="grid gap-3"
                        >
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        className="mt-1 block w-full"
                                        required
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData('name', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={form.errors.name as string}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={String(form.data.quantity)}
                                        onChange={(e) =>
                                            form.setData(
                                                'quantity',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={String(form.data.price)}
                                    onChange={(e) =>
                                        form.setData(
                                            'price',
                                            Number(e.target.value),
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    className="mt-1 block w-full"
                                    value={form.data.description ?? ''}
                                    onChange={(e) =>
                                        form.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                />

                                {form.errors.description && (
                                    <div className="alert alert-danger mt-2">
                                        {form.errors.description}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <Button type="submit">Create</Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setShowCreate(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
                <div className="overflow-x-auto rounded-md bg-background shadow-sm">
                    <table className="min-w-full table-auto text-sm text-foreground">
                        <thead className="bg-card text-left text-card-foreground">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Quantity</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {items && items.length > 0 ? (
                                items.map((item: Item) => (
                                    <tr
                                        key={item.id as number}
                                        className="text-foreground odd:bg-card even:bg-background"
                                    >
                                        <td className="px-4 py-3 align-top">
                                            {fmt(item.id)}
                                        </td>
                                        <td className="px-4 py-3 align-top font-medium">
                                            {fmt(item.name)}
                                        </td>
                                        <td className="max-w-xl px-4 py-3 align-top leading-6 wrap-break-word whitespace-normal">
                                            {fmt(item.description)}
                                        </td>
                                        <td className="px-4 py-3 align-top leading-6 whitespace-normal">
                                            {fmt(item.quantity)}
                                        </td>
                                        <td className="px-4 py-3 align-top leading-6 whitespace-normal">
                                            {typeof item.price === 'number'
                                                ? item.price.toLocaleString()
                                                : fmt(item.price)}
                                        </td>
                                        <td className="px-4 py-3 align-top leading-6 whitespace-normal">
                                            {typeof item.value === 'number'
                                                ? item.value.toLocaleString()
                                                : fmt(item.value)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-4 py-6 text-center text-sm text-gray-500"
                                    >
                                        No items found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
