import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (interests.length > 0) {
      onSelect(interests[0].name);
    }
  }, [onSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== "NORMAL") return;

      switch (e.key.toLowerCase()) {
        case "j":
        case "arrowdown":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = (prev + 1) % interests.length;
            onSelect(interests[newIndex].name);
            return newIndex;
          });
          break;
        case "k":
        case "arrowup":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev === 0 ? interests.length - 1 : prev - 1;
            onSelect(interests[newIndex].name);
            return newIndex;
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, onSelect]);

  return (
    <div>
      <h2 className="text-xl mb-4">What I'm Into</h2>
      <div className="space-y-2">
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
