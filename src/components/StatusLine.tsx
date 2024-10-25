import React from 'react';
import { Circle } from 'lucide-react';

type Props = {
  mode: 'NORMAL' | 'COMMAND' | 'INSERT';
  activeSection: string;
  selectedItem?: string;
};

export default function StatusLine({ mode, activeSection, selectedItem }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-black px-2 sm:px-4 py-1">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3" fill="currentColor" />
          <span className="font-bold">{mode}</span>
        </div>
        <div className="truncate">
          {activeSection}
          {selectedItem && ` > ${selectedItem}`}
        </div>
      </div>
    </div>
  );
}