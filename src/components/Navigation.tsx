import React from "react";
import { LucideIcon } from "lucide-react";

type Props = {
  sections: readonly string[];
  activeSection: string;
  icons: Record<string, LucideIcon>;
  isMenuOpen?: boolean;
  onSectionClick?: () => void;
};

export default function Navigation({
  sections,
  activeSection,
  icons,
  isMenuOpen,
  onSectionClick,
}: Props) {
  const handleClick = (section: string) => {
    if (onSectionClick) {
      onSectionClick();
    }
    // Simulate command execution for navigation
    const event = new CustomEvent("executeCommand", {
      detail: { command: section },
    });
    window.dispatchEvent(event);
  };

  return (
    <nav
      className={`
      sm:flex gap-2 border border-[#b4befe] p-2
      ${isMenuOpen ? "flex flex-col" : "hidden sm:flex"}
    `}
    >
      {sections.map((section) => {
        const Icon = icons[section];
        return (
          <button
            key={section}
            onClick={() => handleClick(section)}
            className={`
              flex items-center gap-2 px-3 py-2 sm:py-1 w-full sm:w-auto
              transition-colors duration-200
              ${
                activeSection === section
                  ? "bg-[#b4befe] text-[#1e1e2e]"
                  : "text-[#cdd6f4] hover:bg-[#b4befe] hover:bg-opacity-20"
              }
            `}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="capitalize">{section}</span>
          </button>
        );
      })}
    </nav>
  );
}
