import React from "react";

export interface ButtonComponentProps {
  type?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  placeholder?: string;
  isSubmitting?: boolean;
}

export default function ButtonComponent({
  className = "",
  children,
  icon,
  placeholder,
  isSubmitting = false,
}: ButtonComponentProps) {
  return (
    <button className={className} disabled={isSubmitting}>
      {icon}
      {children || placeholder}
    </button>
  );
}
