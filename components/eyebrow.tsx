import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: Readonly<EyebrowProps>) {
  return (
    <div
      className={cn(
        "font-sans text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
