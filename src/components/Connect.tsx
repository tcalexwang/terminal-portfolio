import React, { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Globe, ChevronRight } from "lucide-react";

type Props = {
  mode: "NORMAL" | "COMMAND" | "INSERT";
  onSelect: (item: string) => void;
};

export default function Connect({ mode, onSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

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

      switch (e.key.toLowerCase()) {
        case "j":
        case "arrowdown":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = (prev + 1) % links.length;
            onSelect(links[newIndex].label);
            return newIndex;
          });
          break;
        case "k":
        case "arrowup":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev === 0 ? links.length - 1 : prev - 1;
            onSelect(links[newIndex].label);
            return newIndex;
          });
          break;
      }
    };

    const handleActivateSelection = () => {
      const selectedLink = links[selectedIndex];
      window.open(selectedLink.href, "_blank");
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
  }, [mode, onSelect, selectedIndex, links]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl mb-4">Let's Connect</h2>
      {/* <div className="mt-8 p-4 border border-green-800">
        <h3 className="font-bold mb-2">Open to Opportunities</h3>
        <p className="text-green-400">
          Currently interested in SDE roles in the US.!
        </p>
      </div> */}

      <div className="grid gap-4">
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

      <div className="text-sm text-[#a6e3a1]">
        {mode === "NORMAL"
          ? "Use j/k to navigate • Enter to open link"
          : mode === "INSERT"
          ? "Press ESC to return to normal mode"
          : "Enter command"}
      </div>
    </div>
  );
}
