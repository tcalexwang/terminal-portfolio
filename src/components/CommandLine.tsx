import React, { useEffect, useRef } from 'react';

type Props = {
  visible: boolean;
  command: string;
  onChange: (value: string) => void;
  onSubmit: (command: string) => void;
  onEscape: () => void;
};

export default function CommandLine({ visible, command, onChange, onSubmit, onEscape }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-12 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4 bg-black border border-green-500 p-2">
      <div className="flex items-center gap-2 max-w-6xl mx-auto">
        <span>:</span>
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit(command);
            } else if (e.key === 'Escape') {
              onEscape();
            }
          }}
          className="flex-1 bg-transparent outline-none text-green-500"
          autoFocus
        />
      </div>
    </div>
  );
}