import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`hover-lift hover-lift-shadow-blue w-full rounded-full bg-[#0071E3] px-4 py-3.5 text-center text-[15px] font-semibold text-white cursor-pointer ${className}`}
      {...props}
    />
  );
}

export function SecondaryButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`hover-lift hover-lift-shadow-neutral w-full rounded-full bg-[#F5F5F7] px-4 py-3.5 text-center text-[15px] font-semibold text-[#1D1D1F] cursor-pointer ${className}`}
      {...props}
    />
  );
}
