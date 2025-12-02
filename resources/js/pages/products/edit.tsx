import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

type Product = {
    id: number;
    name: string;
    description?: string | null;
    price: number | string;
};

export default function Edit() {
    const { product } = usePage<SharedData & { product: Product }>().props;

    const form = useForm<{
        name: string;
        description: string;
        price: number | string;
    }>({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        router.put(`/products/${product.id}`, form.data, {
            onSuccess: () => router.visit('/products'),
        });
    }

    return (
        <AppLayout>
            <Head title={`Edit ${product.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Edit Product
                    </h2>
                    <form onSubmit={submit} className="grid gap-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={form.errors.name as string}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                value={String(form.data.price)}
                                onChange={(e) =>
                                    form.setData(
                                        'price',
                                        e.target.value === ''
                                            ? ''
                                            : Number(e.target.value),
                                    )
                                }
                                required
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
                                value={form.data.description}
                                onChange={(e) =>
                                    form.setData('description', e.target.value)
                                }
                            />
                            <InputError
                                message={form.errors.description as string}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                type="submit"
                                className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]"
                            >
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.visit('/products')}
                                className="text-[#8B4513] hover:text-[#6F3510]"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
