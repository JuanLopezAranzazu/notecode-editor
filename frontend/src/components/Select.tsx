import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function Select({
  id,
  label,
  value,
  options,
  onChange,
  disabled,
}: SelectProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-mist-300">
      <label htmlFor={id} className="hidden sm:inline">
        {label}
      </label>
      <RadixSelect.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          id={id}
          aria-label={label}
          className="flex items-center gap-1.5 rounded-md border border-ink-600 bg-ink-700 px-2.5 py-1.5
            text-sm text-mist-100 shadow-sm shadow-black/20 transition-colors hover:border-signal/60
            focus:border-signal focus:outline-none data-[placeholder]:text-mist-400
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RadixSelect.Value />
          <RadixSelect.Icon>
            <ChevronDown className="h-3.5 w-3.5 text-mist-300" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={6}
            className="z-50 max-h-72 overflow-hidden rounded-md border border-ink-600 bg-ink-700
              shadow-lg shadow-black/40 animate-in fade-in-0 zoom-in-95"
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  className="relative flex cursor-pointer select-none items-center rounded px-7 py-1.5
                    text-sm text-mist-100 outline-none data-[highlighted]:bg-ink-600
                    data-[highlighted]:text-signal"
                >
                  <RadixSelect.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check className="h-3.5 w-3.5" />
                  </RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
}
