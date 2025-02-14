import React, { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden sm:block">
      <div className="bg-[#1e1e2e] border border-[#b4befe] text-[#cdd6f4] px-4 py-3 rounded shadow-lg flex items-center gap-2 max-w-md">
        <AlertCircle className="w-5 h-5 text-[#b4befe]" />
        <p className="text-sm flex-1">{message}</p>
        <button
          onClick={handleClose}
          className="text-[#b4befe] hover:text-[#89b4fa] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
