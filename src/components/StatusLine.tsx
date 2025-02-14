import React from "react";
import { Circle } from "lucide-react";

type Props = {
  mode: "NORMAL" | "COMMAND" | "INSERT";
  activeSection: string;
  selectedItem?: string;
};

export default function StatusLine({
  mode,
  activeSection,
  selectedItem,
}: Props) {
  const isCommand = mode === "COMMAND";

  return (
    <div
      className={`fixed ${
        isCommand ? "bottom-[40px]" : "bottom-0"
      } left-0 right-0 bg-[#b4befe] text-[#1e1e2e] px-2 sm:px-4 py-1 transition-[bottom]`}
    >
      <div className="max-w-6xl mx-auto flex flex-row items-center gap-2 sm:gap-4 text-sm">
        <div className="flex items-center gap-2 shrink-0">
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
