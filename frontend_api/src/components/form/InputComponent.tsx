import type { UseFormRegisterReturn } from "react-hook-form";

interface IInputComponentProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  registration: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export default function InputComponent({
  type,
  placeholder,
  icon,
  registration,
  error,
  className = "",
}: Readonly<IInputComponentProps>) {
  return (
    <div className={`w-full mb-8 ${className}`}>
      <div className="flex items-center border-b border-white/70 pb-2">
        {icon && <span className="mr-3">{icon}</span>}

        <input
          type={type}
          placeholder={placeholder}
          {...registration}
          className="bg-transparent outline-none w-full placeholder-white/80"
        />
      </div>
      {error && (
        <span className="text-error-500 text-x font-semibold">{error}</span>
      )}
    </div>
  );
}
