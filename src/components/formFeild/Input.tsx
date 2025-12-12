import { forwardRef, useId } from "react";

export type InputProps = {
  label?: string;
  type: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(function input(
  { label, type = "text", className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        {...props}
      ></input>
    </div>
  );
});
