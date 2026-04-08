import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logo.png"
        alt="VEDTEIX Logo"
        fill
        sizes="40px"
        className="object-contain"
        priority
      />
    </div>
  );
}
