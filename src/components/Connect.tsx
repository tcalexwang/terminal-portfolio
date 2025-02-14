import React from "react";
import { Mail, Github, Linkedin, Globe } from "lucide-react";

type Props = {
  mode: "NORMAL" | "COMMAND" | "INSERT";
  onSelect: (item: string) => void;
};

export default function Connect({ mode }: Props) {
  const links = [
    {
      icon: Mail,
      label: "Email",
      value: "wangtcalex@gmail.com",
      href: "mailto:wangtcalex@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@chang2000",
      href: "https://github.com/chang2000",
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
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-[#313244] hover:border-[#b4befe] hover:bg-[#b4befe] hover:bg-opacity-20 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <div>
                <div className="font-bold">{link.label}</div>
                <div className="text-[#fab387]">{link.value}</div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="text-sm text-[#a6e3a1]">
        {mode === "NORMAL"
          ? "Click any link to connect"
          : mode === "INSERT"
          ? "Press ESC to return to normal mode"
          : "Enter command"}
      </div>
    </div>
  );
}
