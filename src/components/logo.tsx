import Image from "next/image";
import { cn } from "@/lib/utils";

/* Icon-only katana-orbit mark, cropped from the official logo. */
export function Mark({ className, white = false }: { className?: string; white?: boolean }) {
  return (
    <Image
      src={white ? "/img/mark-white.png" : "/img/mark.png"}
      alt=""
      width={256}
      height={256}
      quality={100}
      aria-hidden
      className={cn("object-contain", className)}
    />
  );
}

/* Full horizontal wordmark (official asset). Caller sets the height. */
export function Logo({ className, white = false }: { className?: string; white?: boolean }) {
  return (
    <Image
      src={white ? "/img/logo-white.png" : "/img/logo.png"}
      alt="GoStaffer"
      width={2000}
      height={459}
      quality={100}
      priority
      sizes="240px"
      className={cn("w-auto max-w-none", className)}
    />
  );
}
