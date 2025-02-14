import React, { useEffect, useRef } from "react";

type Props = {
  visible: boolean;
  command: string;
  onChange: (value: string) => void;
  onSubmit: (command: string) => void;
  onEscape: () => void;
};

export default function CommandLine({
  visible,
  command,
  onChange,
  onSubmit,
  onEscape,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1e1e2e] border-t border-[#b4befe] p-2">
      <div className="max-w-6xl mx-auto flex items-center gap-2">
        <span>:</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit(command);
            } else if (e.key === "Escape") {
              onEscape();
            }
          }}
          className="flex-1 bg-transparent outline-none text-[#cdd6f4]"
          autoFocus
        />
      </div>
    </div>
  );
}
