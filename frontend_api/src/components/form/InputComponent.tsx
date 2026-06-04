import { useState } from "react";
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

interface IFileComponentProps {
  isMultiple?: boolean;
  placeholder: string;
  icon?: React.ReactNode;
  registration: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export function FileComponent({
  isMultiple = false,
  placeholder,
  icon,
  registration,
  error,
  className = "",
}: Readonly<IFileComponentProps>) {
  const [fileNames, setFileNames] = useState<string[]>([]);
  return (
    <div className={`w-full mb-8 ${className}`}>
      <label className="group relative flex items-center justify-between gap-3 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/40">
        <span className="flex items-center gap-3 truncate text-left">
          {icon && <span className="text-white/70">{icon}</span>}
          <span>
            {fileNames.length > 0
              ? `${fileNames.length} file(s) selected`
              : placeholder}
          </span>
        </span>

        <span className="rounded px-2 py-1 text-[11px] uppercase tracking-[0.15em] text-white/70 ring-1 ring-white/80">
          Browse
        </span>

        <input
          type="file"
          multiple={isMultiple}
          {...registration}
          onChange={(e) => {
            registration.onChange(e);

            const files = Array.from(e.target.files || []);
            setFileNames(files.map((file) => file.name));
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
      {error && (
        <span className="text-error-500 text-xs font-semibold">{error}</span>
      )}
    </div>
  );
}
