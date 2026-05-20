import type { BaseSyntheticEvent } from "react";

export interface IEmailComponentProps {
  name: string;
  handler: (e: BaseSyntheticEvent) => void;
}

export interface IPasswordComponentProps {
  name: string;
  handler: (e: BaseSyntheticEvent) => void;
}

export const EmailInputComponent = ({
  name,
  handler,
}: Readonly<IEmailComponentProps>) => {
  return (
    <>
      <input
        type="text"
        placeholder="Email ID"
        name={name}
        onChange={handler}
        className="bg-transparent outline-none w-full placeholder-white/80"
      />
    </>
  );
};

export const PasswordInputComponent = ({
  name,
  handler,
}: Readonly<IPasswordComponentProps>) => {
  return (
    <>
      <input
        type="password"
        placeholder="Password"
        name={name}
        onChange={handler}
        className="bg-transparent outline-none w-full placeholder-white/80"
      />
    </>
  );
};
