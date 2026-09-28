import Link from "next/link";
import { MessageSquare } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/30">
        <MessageSquare className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-lg font-semibold tracking-tight">Chatify</span>
    </Link>
  );
}
