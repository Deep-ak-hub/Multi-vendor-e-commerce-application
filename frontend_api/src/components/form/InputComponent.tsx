import type { BaseSyntheticEvent } from "react";

interface IInputComponentProps {
  type: string;
  placeholder: string;
  name: string;
  icon?: React.ReactNode;
  handler: (e: BaseSyntheticEvent) => void;
  className?: string;
}

export default function InputComponent({
  type,
  placeholder,
  name,
  icon,
  handler,
  className = "",
}: Readonly<IInputComponentProps>) {
  return (
    <div className={`w-full mb-8 ${className}`}>
      <div className="flex items-center border-b border-white/70 pb-2">
        
        {icon && <span className="mr-3">{icon}</span>}

        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handler}
          className="bg-transparent outline-none w-full placeholder-white/80"
        />
      </div>
    </div>
  );
}