import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import {
    create as createRoute,
    index as indexRoute,
    store,
} from '@/routes/daily-usages';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Item {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface Props {
    items: Item[];
}

interface DailyUsageItemForm {
    item_id: string;
    quantity_used: string;
    notes: string;
}

export default function Create({ items }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
        notes: '',
        items: [
            { item_id: '', quantity_used: '', notes: '' },
        ] as DailyUsageItemForm[],
    });

    const addItem = () => {
        setData('items', [
            ...data.items,
            { item_id: '', quantity_used: '', notes: '' },
        ]);
    };

    const removeItem = (index: number) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData('items', newItems);
    };

    const updateItem = (
        index: number,
        field: keyof DailyUsageItemForm,
        value: string,
    ) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('items', newItems);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(store().url);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Daily Usages', href: indexRoute().url },
                { title: 'Create', href: createRoute().url },
            ]}
        >
            <Head title="Record Daily Usage" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="mb-6 text-xl font-semibold">
                                Record Daily Usage
                            </h2>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.date}
                                        onChange={(e) =>
                                            setData('date', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.date}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="notes">Notes</Label>
                                    <Input
                                        id="notes"
                                        className="mt-1 block w-full"
                                        value={data.notes}
                                        onChange={(e) =>
                                            setData('notes', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.notes}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium">
                                            Items Used
                                        </h3>
                                        <Button
                                            type="button"
                                            onClick={addItem}
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full border-[#8B4513] text-[#8B4513] hover:text-[#6F3510]"
                                        >
                                            Add Item
                                        </Button>
                                    </div>

                                    {data.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-4 rounded-md border p-4 sm:flex-row sm:items-start"
                                        >
                                            <div className="flex-1">
                                                <Label
                                                    htmlFor={`item_${index}`}
                                                >
                                                    Item
                                                </Label>
                                                <select
                                                    id={`item_${index}`}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                    value={item.item_id}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'item_id',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                >
                                                    <option value="">
                                                        Select an item
                                                    </option>
                                                    {items.map((i) => (
                                                        <option
                                                            key={i.id}
                                                            value={i.id}
                                                        >
                                                            {i.name} (Stock:{' '}
                                                            {i.quantity})
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError
                                                    message={
                                                        (
                                                            errors as Record<
                                                                string,
                                                                string
                                                            >
                                                        )[
                                                            `items.${index}.item_id`
                                                        ]
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="w-full sm:w-32">
                                                <Label
                                                    htmlFor={`quantity_${index}`}
                                                >
                                                    Quantity
                                                </Label>
                                                <Input
                                                    id={`quantity_${index}`}
                                                    type="number"
                                                    min="1"
                                                    className="mt-1 block w-full"
                                                    value={item.quantity_used}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'quantity_used',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                <InputError
                                                    message={
                                                        (
                                                            errors as Record<
                                                                string,
                                                                string
                                                            >
                                                        )[
                                                            `items.${index}.quantity_used`
                                                        ]
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <Label
                                                    htmlFor={`notes_${index}`}
                                                >
                                                    Notes (Optional)
                                                </Label>
                                                <Input
                                                    id={`notes_${index}`}
                                                    className="mt-1 block w-full"
                                                    value={item.notes}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'notes',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="mt-6">
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                    disabled={
                                                        data.items.length === 1
                                                    }
                                                >
                                                    <span className="sr-only">
                                                        Remove
                                                    </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="h-4 w-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]"
                                    >
                                        Save Daily Usage
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
