import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface PageProps {
    [key: string]: unknown;
    title?: string;
    action?: string;
}

interface ValidationErrors {
    [field: string]: string[];
}

interface ApiResponseSuccess {
    success?: boolean;
    status?: string;
    message?: string;
    data?: unknown;
}

interface ApiResponseError {
    success?: boolean;
    message?: string;
    errors?: ValidationErrors;
}

export default function RedeemForm() {
    const { props } = usePage<PageProps>();
    const action = props.action ?? '/redeem';
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getCsrfToken = () =>
        document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') ?? '';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus(null);
        setError(null);

        if (!code.trim()) {
            setError('Promo code is required.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    Accept: 'application/json',
                },
                body: JSON.stringify({ code }),
                credentials: 'same-origin',
            });

            const contentType = res.headers.get('content-type') || '';
            const isJson = contentType.includes('application/json');
            const data: ApiResponseSuccess | ApiResponseError | string = isJson
                ? await res.json()
                : await res.text();

            if (res.ok) {
                const msg = isJson
                    ? (data as ApiResponseSuccess).status ||
                      (data as ApiResponseSuccess).message ||
                      ''
                    : String(data);
                setStatus(msg || 'Saved.');
                setCode('');
            } else if (res.status === 422 && isJson) {
                let firstError = 'Validation failed.';
                const errData = data as ApiResponseError;
                if (errData && errData.errors) {
                    const errsObj = errData.errors;
                    const values = Object.values(errsObj);
                    const first = values.length ? values[0] : undefined;
                    if (Array.isArray(first) && first.length)
                        firstError = String(first[0]);
                }
                setError(firstError);
            } else if (isJson) {
                const errMsg =
                    (data as ApiResponseError).message ||
                    (data as ApiResponseSuccess).message ||
                    '';
                setError(errMsg || 'An error occurred.');
            } else {
                setError(String(data) || 'An error occurred.');
            }
        } catch {
            setError('Network error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <Head title={props.title ?? 'Manual Promo Redeem'} />
            <div className="mx-auto my-10 max-w-lg rounded-2xl border border-[#E6D5C7] bg-[#FFF7ED] p-6 shadow-sm dark:border-[#3A2A1E] dark:bg-[#6c4f31]">
                <h3 className="mb-5 text-lg font-semibold text-[#2C1810] dark:text-[#FFF6EC]">
                    {props.title ?? 'Manual Promo Redeem'}
                </h3>

                {status && (
                    <div className="mb-4 rounded-md bg-[#FFF6EC] px-4 py-3 text-sm text-[#6F3510] dark:bg-[#3A2A1E] dark:text-[#E6D5C7]">
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="code"
                            className="block text-sm font-medium text-[#6F3510] dark:text-[#FFF6EC]"
                        >
                            Promo Code
                        </label>
                        <input
                            id="code"
                            name="code"
                            className={`mt-1 block w-full rounded-md border border-[#E6D5C7] bg-white px-3 py-2 text-[#3A2A1E] placeholder-[#8B7E74] shadow-sm focus:border-[#8B4513] focus:ring-1 focus:ring-[#8B4513] focus:outline-none dark:border-[#3A2A1E] dark:bg-[#2A1E14] dark:text-[#FFF6EC] ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                            required
                            autoFocus
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        {error && (
                            <div className="mt-2 text-sm text-red-600">
                                {error}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded-full bg-[#8B4513] px-5 py-2 text-sm font-semibold tracking-tight text-[#FFF6EC] shadow-md hover:bg-[#6F3510] disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
