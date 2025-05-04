import clsx from "clsx";

type TextareaProps = {
  label?: string;
  name: string;
  value?: string;
  className?: string;
  placeholder: string;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea({
  onChange,
  label,
  name,
  placeholder,
  className,
  value,
  onBlur,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <p className="text-[14px] font-medium">{label}</p>}

      <textarea
        suppressHydrationWarning
        className={clsx(
          "bg-background border border-border rounded-lg px-2 py-2.5 text-white-100 placeholder:text-sm placeholder:text-content/50 min-h-[120px]",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset focus:border-border transition-colors",
          className,
        )}
        rows={4}
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </div>
  );
}
