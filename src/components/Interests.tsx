import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Gamepad2,
  Wrench,
  Leaf,
  Dumbbell,
  Keyboard,
} from "lucide-react";

const interests = [
  {
    id: 1,
    name: "Web-based Games",
    description: "Building interactive 3D experiences with Three.js",
    icon: Gamepad2,
  },
  {
    id: 2,
    name: "Frontend Tool Chain",
    description: "Exploring and optimizing modern frontend development tools",
    icon: Wrench,
  },
  {
    id: 3,
    name: "Terrarium",
    description: "Creating and maintaining miniature ecosystems",
    icon: Leaf,
  },
  {
    id: 4,
    name: "Boxing",
    description: "Training and practicing the sweet science",
    icon: Dumbbell,
  },
  {
    id: 5,
    name: "Glove 80 Ergo Keyboard",
    description: "Customizing and optimizing my ergonomic keyboard setup",
    icon: Keyboard,
  },
];

type Props = {
  mode: "NORMAL" | "COMMAND" | "INSERT";
  onSelect: (name: string) => void;
};

export default function Interests({ mode, onSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (interests.length > 0) {
      onSelect(interests[0].name);
    }
  }, [onSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== "NORMAL") return;

      if (e.key === "j" || e.key === "k") {
        e.preventDefault();
        const direction = e.key === "j" ? 1 : -1;
        setSelectedIndex((prev) => {
          const newIndex = Math.max(
            0,
            Math.min(interests.length - 1, prev + direction)
          );

          // Scroll the selected item into view
          const container = containerRef.current;
          const selectedElement = container?.children[newIndex] as HTMLElement;
          if (container && selectedElement) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = selectedElement.getBoundingClientRect();

            if (elementRect.bottom > containerRect.bottom) {
              container.scrollTop += elementRect.bottom - containerRect.bottom;
            } else if (elementRect.top < containerRect.top) {
              container.scrollTop += elementRect.top - containerRect.top;
            }
          }

          onSelect(interests[newIndex].name);
          return newIndex;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, onSelect]);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl mb-4">What I'm Into</h2>
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-[#313244] scrollbar-track-transparent"
      >
        {interests.map((interest, index) => {
          const Icon = interest.icon;
          return (
            <div
              key={interest.id}
              className={`p-4 border ${
                selectedIndex === index
                  ? "border-[#b4befe] bg-[#b4befe] bg-opacity-20"
                  : "border-[#313244]"
              } cursor-pointer hover:border-[#b4befe] hover:bg-[#b4befe] hover:bg-opacity-10 transition-colors`}
              onClick={() => {
                setSelectedIndex(index);
                onSelect(interest.name);
              }}
            >
              <div className="flex items-center">
                {selectedIndex === index && (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                <Icon className="w-5 h-5 mr-3" />
                <div className="flex-1">
                  <h3 className="font-bold">{interest.name}</h3>
                  <p className="text-[#fab387] text-sm">
                    {interest.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-[#a6e3a1]">
        {mode === "NORMAL"
          ? "Use j/k to navigate • i to enter insert mode"
          : mode === "INSERT"
          ? "Press ESC to return to normal mode"
          : "Enter command"}
      </div>
    </div>
  );
}
