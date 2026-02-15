import { forwardRef, useId } from "react";

export type SelectProps = {
  label?: string;
  className?: string;
  options: string[];
} & React.InputHTMLAttributes<HTMLSelectElement>;

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, className, ...props },
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

      <select
        id={id}
        className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}"
        ref={ref}
        {...props}
      >
        <option value="">-- Choose an option --</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});
