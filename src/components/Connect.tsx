import React, { useState, useEffect, useRef } from "react";
import { Mail, Github, Linkedin, Globe, ChevronRight } from "lucide-react";

type Props = {
  mode: "NORMAL" | "COMMAND" | "INSERT";
  onSelect: (item: string) => void;
};

export default function Connect({ mode, onSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const links = [
    {
      icon: Mail,
      label: "Email",
      value: "wangtcalex@gmail.com",
      href: "mailto:wangtcalex@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub (I was previously @chang2000)",
      value: "@tcalexwang",
      href: "https://github.com/tcalexwang",
    },
    // {
    //   icon: Twitter,
    //   label: 'Twitter',
    //   value: '@handle',
    //   href: 'https://twitter.com'
    // },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "in/tianchangwang",
      href: "https://www.linkedin.com/in/tianchangwang/",
    },
    {
      icon: Globe,
      label: "Website",
      value: "devtcwang.com",
      href: "https://devtcwang.com",
    },
  ];

  useEffect(() => {
    if (links.length > 0) {
      onSelect(links[0].label);
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
            Math.min(links.length - 1, prev + direction)
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

          onSelect(links[newIndex].label);
          return newIndex;
        });
      }
    };

    const handleActivateSelection = () => {
      if (mode === "NORMAL") {
        const selectedLink = links[selectedIndex];
        window.open(selectedLink.href, "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(
      "activateSelection",
      handleActivateSelection as EventListener
    );

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        "activateSelection",
        handleActivateSelection as EventListener
      );
    };
  }, [mode, onSelect]);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl mb-4">Let's Connect</h2>
      {/* <div className="mt-8 p-4 border border-green-800">
        <h3 className="font-bold mb-2">Open to Opportunities</h3>
        <p className="text-green-400">
          Currently interested in SDE roles in the US.!
        </p>
      </div> */}

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-[#313244] scrollbar-track-transparent"
      >
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <div
              key={link.label}
              className={`p-4 border ${
                selectedIndex === index
                  ? "border-[#b4befe] bg-[#b4befe] bg-opacity-20"
                  : "border-[#313244]"
              } cursor-pointer hover:border-[#b4befe] hover:bg-[#b4befe] hover:bg-opacity-10 transition-colors`}
              onClick={() => {
                setSelectedIndex(index);
                onSelect(link.label);
                window.open(link.href, "_blank");
              }}
            >
              <div className="flex items-center">
                {selectedIndex === index && (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                <Icon className="w-5 h-5 mr-4" />
                <div>
                  <div className="font-bold">{link.label}</div>
                  <div className="text-[#fab387]">{link.value}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-[#a6e3a1]">
        {mode === "NORMAL"
          ? "Use j/k to navigate • Enter to open link"
          : mode === "INSERT"
          ? "Press ESC to return to normal mode"
          : "Enter command"}
      </div>
    </div>
  );
}
