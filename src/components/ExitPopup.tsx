import React, { useEffect } from "react";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ExitPopup({ onConfirm, onCancel }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "y") {
        onConfirm();
      } else if (e.key.toLowerCase() === "n" || e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onConfirm, onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1e1e2e] border border-[#b4befe] p-4 max-w-sm w-full mx-4 shadow-lg">
        <div className="text-center space-y-4">
          <p className="text-[#cdd6f4]">Do you want to exit?</p>
          <div className="flex justify-center gap-4 text-sm">
            <span>
              Type <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">y</kbd> for
              yes
            </span>
            <span>
              Type <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">n</kbd> for
              no
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
