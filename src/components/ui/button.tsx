import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold tracking-tight transition-all duration-200 select-none whitespace-nowrap focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary: "btn-electric",
  secondary:
    "bg-paper text-ink border border-line-2 shadow-[var(--shadow-sm)] hover:border-blue-500 hover:text-blue-700 hover:-translate-y-0.5",
  dark:
    "bg-ink text-white hover:bg-graphite hover:-translate-y-0.5",
  ghost: "text-slate hover:text-blue-700",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  type = "button",
  ...rest
}: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
