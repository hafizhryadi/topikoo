import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import Table from '@/layouts/app/table';
import { SharedData } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Product {
    id: number;
    name: string;
    description?: string | null;
    price: number | string;
    created_at?: string;
}

export default function Index() {
    const { products } = usePage<SharedData & { products: Product[] }>().props;
    const [showCreate, setShowCreate] = useState(false);

    const form = useForm<{
        name: string;
        description: string;
        price: number | string;
    }>({
        name: '',
        description: '',
        price: '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        form.post('/products', {
            onSuccess: () => {
                setShowCreate(false);
                form.reset();
            },
        });
    }

    return (
        <AppLayout>
            <Head title="Products" />
            <div className="min-h-screen bg-[#FFF7ED] p-6 py-12 dark:bg-[#1d150c]">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                            Products
                        </h2>
                        <div>
                            <Button
                                type="button"
                                onClick={() => setShowCreate((s) => !s)}
                                className="rounded-full bg-[#8B4513] px-5 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510]"
                            >
                                New Product
                            </Button>
                        </div>
                    </div>

                    {showCreate && (
                        <div className="mb-6 rounded-2xl border border-[#E6D4C5] bg-white/90 p-4 shadow-sm dark:border-[#A9825C] dark:bg-[#886238]">
                            <form onSubmit={submit} className="grid gap-3">
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
                                                form.setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={form.errors.name as string}
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
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
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
                                    <InputError
                                        message={
                                            form.errors.description as string
                                        }
                                        className="mt-1"
                                    />
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

                    <Table
                        cols={4}
                        emptyMessage="No products found."
                        head={
                            <tr className="bg-[#8B4513] dark:bg-[#4a2e16]">
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-white uppercase">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-white uppercase">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-white uppercase">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-white uppercase">
                                    Actions
                                </th>
                            </tr>
                        }
                        rows={
                            products && products.length > 0
                                ? products.map((p) => (
                                      <tr key={p.id}>
                                          <td className="px-6 py-4 text-sm whitespace-nowrap text-[#3A2A1E] dark:text-[#FFF6EC]">
                                              {p.name}
                                          </td>
                                          <td className="px-6 py-4 text-sm text-[#3A2A1E] dark:text-[#FFF6EC]">
                                              {p.description || '-'}
                                          </td>
                                          <td className="px-6 py-4 text-sm whitespace-nowrap text-[#3A2A1E] dark:text-[#FFF6EC]">
                                              {typeof p.price === 'number'
                                                  ? p.price.toLocaleString()
                                                  : p.price}
                                          </td>
                                          <td className="px-6 py-4 text-right text-sm text-[#3A2A1E] dark:text-[#FFF6EC]">
                                              <div className="inline-flex gap-2">
                                                  <Link
                                                      href={`/products/${p.id}/edit`}
                                                      className="text-sm text-[#8B4513] hover:text-[#6F3510]"
                                                  >
                                                      Edit
                                                  </Link>
                                                  <button
                                                      type="button"
                                                      className="text-sm text-red-600 hover:text-red-700"
                                                      onClick={() => {
                                                          if (
                                                              confirm(
                                                                  'Delete this product?',
                                                              )
                                                          ) {
                                                              router.delete(
                                                                  `/products/${p.id}`,
                                                              );
                                                          }
                                                      }}
                                                  >
                                                      Delete
                                                  </button>
                                              </div>
                                          </td>
                                      </tr>
                                  ))
                                : null
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
