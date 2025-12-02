import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import {
    destroy as itemsDestroy,
    index as itemsIndex,
    store as itemsStore,
    update as itemsUpdate,
} from '@/routes/items';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
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
    const [editingId, setEditingId] = useState<number | null>(null);
    const form = useForm<{
        name: string;
        quantity: number | string;
        price: number | string;
        description: string;
    }>({
        name: '',
        quantity: '',
        price: '',
        description: '',
    });
    const editForm = useForm<{
        name: string;
        quantity: number | string;
        price: number | string;
        description: string;
    }>({
        name: '',
        quantity: '',
        price: '',
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

            <div className="dark min-h-screen p-6 bg-[#FFF7ED] dark:bg-[#6c4f31]">
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-lg font-medium">Items</h1>
                    <div>
                        <Button
                            type="button"
                            onClick={() => setShowCreate((s) => !s)}
                            className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]"
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
                                        required
                                        className="mt-1 block w-full"
                                        value={String(form.data.quantity)}
                                        onChange={(e) =>
                                            form.setData(
                                                'quantity',
                                                e.target.value === ''
                                                    ? ''
                                                    : Number(e.target.value),
                                            )
                                        }
                                    />
                                    <InputError
                                        message={form.errors.quantity as string}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    required
                                    className="mt-1 block w-full"
                                    value={String(form.data.price)}
                                    onChange={(e) =>
                                        form.setData(
                                            'price',
                                            e.target.value === ''
                                                ? ''
                                                : Number(e.target.value),
                                        )
                                    }
                                />
                                <InputError
                                    message={form.errors.price as string}
                                    className="mt-1"
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
                                <Button
                                    type="submit"
                                    className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]"
                                >
                                    Create
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
                <div className="grid">
                    {items && items.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
                            {items.map((item: Item) => (
                                <article
                                    key={item.id as number}
                                    className="relative flex flex-col items-center justify-between rounded-md border-2 bg-card p-6 text-center shadow-sm"
                                >
                                    <div className="absolute top-3 right-3">
                                        {typeof item.quantity === 'number' &&
                                        item.quantity > 5 ? (
                                            <span className="inline-flex items-center rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium text-white">
                                                In stock
                                            </span>
                                        ) : typeof item.quantity === 'number' &&
                                          item.quantity > 0 ? (
                                            <span className="inline-flex items-center rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-medium text-white">
                                                Low
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
                                                Out
                                            </span>
                                        )}
                                    </div>

                                    {editingId === item.id ? (
                                        <form
                                            onSubmit={(e: FormEvent) => {
                                                e.preventDefault();
                                                editForm.put(
                                                    itemsUpdate(item.id).url,
                                                    {
                                                        onSuccess: () =>
                                                            setEditingId(null),
                                                    },
                                                );
                                            }}
                                            className="mt-2 grid w-full gap-3 text-left"
                                        >
                                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                                <div>
                                                    <Label
                                                        htmlFor={`name_${item.id}`}
                                                    >
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id={`name_${item.id}`}
                                                        className="mt-1 block w-full"
                                                        required
                                                        value={String(
                                                            editForm.data.name,
                                                        )}
                                                        onChange={(e) =>
                                                            editForm.setData(
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={
                                                            editForm.errors
                                                                .name as string
                                                        }
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label
                                                        htmlFor={`quantity_${item.id}`}
                                                    >
                                                        Quantity
                                                    </Label>
                                                    <Input
                                                        id={`quantity_${item.id}`}
                                                        type="number"
                                                        required
                                                        className="mt-1 block w-full"
                                                        value={String(
                                                            editForm.data
                                                                .quantity,
                                                        )}
                                                        onChange={(e) =>
                                                            editForm.setData(
                                                                'quantity',
                                                                e.target
                                                                    .value ===
                                                                    ''
                                                                    ? ''
                                                                    : Number(
                                                                          e
                                                                              .target
                                                                              .value,
                                                                      ),
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={
                                                            editForm.errors
                                                                .quantity as string
                                                        }
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label
                                                    htmlFor={`price_${item.id}`}
                                                >
                                                    Price
                                                </Label>
                                                <Input
                                                    id={`price_${item.id}`}
                                                    type="number"
                                                    required
                                                    className="mt-1 block w-full"
                                                    value={String(
                                                        editForm.data.price,
                                                    )}
                                                    onChange={(e) =>
                                                        editForm.setData(
                                                            'price',
                                                            e.target.value ===
                                                                ''
                                                                ? ''
                                                                : Number(
                                                                      e.target
                                                                          .value,
                                                                  ),
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        editForm.errors
                                                            .price as string
                                                    }
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div>
                                                <Label
                                                    htmlFor={`description_${item.id}`}
                                                >
                                                    Description
                                                </Label>
                                                <Input
                                                    id={`description_${item.id}`}
                                                    className="mt-1 block w-full"
                                                    value={
                                                        (editForm.data
                                                            .description ??
                                                            '') as string
                                                    }
                                                    onChange={(e) =>
                                                        editForm.setData(
                                                            'description',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {editForm.errors
                                                    .description && (
                                                    <div className="alert alert-danger mt-2">
                                                        {
                                                            editForm.errors
                                                                .description
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-2 flex items-center justify-center gap-3">
                                                <Button
                                                    type="submit"
                                                    className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        setEditingId(null)
                                                    }
                                                    className="text-[#8B4513] hover:text-[#6F3510]"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    className="rounded-full bg-red-600 px-5 text-sm font-semibold tracking-tight text-white shadow-md hover:bg-red-700"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Delete this item?',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                itemsDestroy(
                                                                    item.id,
                                                                ).url,
                                                                {
                                                                    onSuccess:
                                                                        () =>
                                                                            setEditingId(
                                                                                null,
                                                                            ),
                                                                    preserveScroll: true,
                                                                },
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <header className="flex w-full items-center justify-center">
                                                <h3 className="text-lg font-bold text-card-foreground">
                                                    {fmt(item.name)}
                                                </h3>
                                            </header>

                                            <p className="mt-3 text-sm leading-6 whitespace-normal text-card-foreground">
                                                {fmt(item.description)}
                                            </p>

                                            <dl className="mt-4 grid w-full grid-cols-1 gap-y-2 text-sm text-foreground">
                                                <div>
                                                    <dt className="text-xs text-gray-400">
                                                        Quantity
                                                    </dt>
                                                    <dd className="font-medium">
                                                        {fmt(item.quantity)}
                                                    </dd>
                                                </div>

                                                <div>
                                                    <dt className="text-xs text-gray-400">
                                                        Price
                                                    </dt>
                                                    <dd className="font-medium">
                                                        {typeof item.price ===
                                                        'number'
                                                            ? item.price.toLocaleString()
                                                            : fmt(item.price)}
                                                    </dd>
                                                </div>

                                                <div>
                                                    <dt className="text-xs text-gray-400">
                                                        Value
                                                    </dt>
                                                    <dd className="font-medium">
                                                        Rp.{' '}
                                                        {typeof item.value ===
                                                        'number'
                                                            ? item.value.toLocaleString()
                                                            : fmt(item.value)}
                                                    </dd>
                                                </div>
                                            </dl>

                                            <div className="mt-4 flex items-center justify-center gap-3">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="rounded-full border-[#8B4513] text-[#8B4513] hover:text-[#6F3510]"
                                                    onClick={() => {
                                                        setEditingId(item.id);
                                                        editForm.setData({
                                                            name: item.name,
                                                            quantity:
                                                                item.quantity,
                                                            price: item.price,
                                                            description:
                                                                (item.description as string) ??
                                                                '',
                                                        });
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    className="rounded-full bg-red-600 px-5 text-sm font-semibold tracking-tight text-white shadow-md hover:bg-red-700"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Delete this item?',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                itemsDestroy(
                                                                    item.id,
                                                                ).url,
                                                                {
                                                                    preserveScroll: true,
                                                                },
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-6 text-center text-sm text-gray-500">
                            No items found
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
