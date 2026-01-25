import { useEffect, useRef } from "react";

type FormInputProps = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
};

function FormInput({
  value,
  handleChange,
  name,
  label,
  required = false,
  placeholder,
}: FormInputProps) {
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstFieldRef.current) firstFieldRef.current.focus();
  }, []);
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? ""}
        required={required}
        ref={name == "name" ? firstFieldRef : null}
        className="w-full px-3 py-2 border border-[var(--card-border)] text-[var(--card-text)] rounded-lg placeholder:text-[var(--placeholder)] outline-none focus:border-blue-300"
      />
    </div>
  );
}

export default FormInput;
