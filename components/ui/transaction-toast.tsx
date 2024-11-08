import { Copy, Check } from 'lucide-react'

interface TransactionToastProps {
    hash: string;
    hasCopied: boolean;
    onCopy: (hash: string) => Promise<void>;
}

export function TransactionToast({ hash, hasCopied, onCopy }: TransactionToastProps) {
    return (
        <div className="mt-2 p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs break-all flex items-center justify-between">
            <span>{hash}</span>
            <button
                onClick={() => onCopy(hash)}
                className="ml-2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
            >
                {hasCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </button>
        </div>
    )
} 