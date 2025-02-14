import React, { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration);

  // Calculate SVG parameters for the clock
  const size = 20; // Size of the clock
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let progressInterval: ReturnType<typeof setInterval>;

    if (!isPaused) {
      const startTime = Date.now();
      const endTime = startTime + remainingTime;

      timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, remainingTime);

      // Update progress every 10ms
      progressInterval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        const progressValue = (remaining / duration) * 100;
        setProgress(progressValue);
        setRemainingTime(remaining);

        if (progressValue <= 0) {
          clearInterval(progressInterval);
        }
      }, 10);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose, isPaused, remainingTime]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 hidden sm:block"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 1,
          }}
        >
          <motion.div
            className="bg-[#1e1e2e] border border-[#b4befe] text-[#cdd6f4] px-4 py-3 rounded shadow-lg flex items-center gap-2 max-w-md"
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.1 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <AlertCircle className="w-5 h-5 text-[#b4befe]" />
            </motion.div>
            <motion.p
              className="text-sm flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.p>
            <div className="relative w-5 h-5 shrink-0">
              <svg
                className="transform -rotate-90 w-5 h-5"
                viewBox={`0 0 ${size} ${size}`}
              >
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="#313244"
                  strokeWidth={strokeWidth}
                />
                <motion.circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={isPaused ? "#89b4fa" : "#b4befe"}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </svg>
            </div>
            <motion.button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="text-[#b4befe] hover:text-[#89b4fa] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
