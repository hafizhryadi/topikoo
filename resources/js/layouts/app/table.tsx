import React, { ReactNode } from 'react';

interface TableProps {
    head?: ReactNode;
    rows?: ReactNode;
    emptyMessage?: string;
    cols?: number;
    className?: string;
}

export default function Table({
    head,
    rows,
    emptyMessage = 'No records.',
    cols = 1,
    className = '',
}: TableProps) {
    const hasRows = React.Children.count(rows) > 0;

    return (
        <div className={`overflow-hidden sm:rounded-lg ${className}`}>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#E6D5C7] dark:divide-[#3A2A1E]">
                        {head && (
                            <thead className="bg-[#351c00] dark:bg-[#5e4029]">
                                {head}
                            </thead>
                        )}

                        <tbody className="divide-y divide-[#E6D5C7] bg-white dark:divide-[#3A2A1E] dark:bg-[#2A1E14]">
                            {hasRows ? (
                                rows
                            ) : (
                                <tr>
                                    <td
                                        colSpan={cols}
                                        className="px-6 py-4 text-center text-sm text-[#6F3510] dark:text-[#E6D5C7]"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
