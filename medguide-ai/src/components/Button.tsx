import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-navy text-ivory hover:bg-[#0f2438] shadow-soft border border-navy",
  secondary:
    "bg-transparent text-navy border border-navy/25 hover:border-navy/50 hover:bg-navy/5",
  ghost: "bg-transparent text-navy hover:bg-navy/5 border border-transparent",
  // For use on dark (navy) backgrounds, where `secondary`'s transparent fill
  // would be invisible against the same navy behind it.
  inverse: "bg-ivory text-navy border border-ivory hover:bg-ivory/90",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  onClick?: () => void;
}

interface ActionButtonProps extends CommonProps {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function LinkButton({ href, variant = "primary", className = "", children, onClick }: LinkButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function ActionButton({
  onClick,
  variant = "primary",
  className = "",
  children,
  type = "button",
  disabled,
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
