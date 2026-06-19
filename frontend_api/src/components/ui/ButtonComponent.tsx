import React from "react";

export interface ButtonComponentProps {
  type?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  placeholder?: string;
  isSubmitting?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonComponent({
  className = "",
  children,
  icon,
  placeholder,
  isSubmitting = false,
  onClick,
}: ButtonComponentProps) {
  return (
    <button className={className} disabled={isSubmitting} onClick={onClick}>
      {icon}
      {children || placeholder}
    </button>
  );
}
