import type { FC, HTMLProps } from "react";

const Input: FC<Omit<HTMLProps<HTMLInputElement>, "className">> = (props) => {
  return (
    <input
      {...props}
      className="px-4 py-3 border-slate-700 border-2 text-slate-700"
    />
  );
};

export default Input;
