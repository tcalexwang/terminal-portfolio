import React from "react";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

type Props = {
  mode: "NORMAL" | "COMMAND" | "INSERT";
  onSelect: (item: string) => void;
};

export default function About({ mode }: Props) {
  return (
    <div className="space-y-8 px-4 sm:px-0 py-6 sm:py-8">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold mb-3">Alex(Tianchang) Wang</h1>
        <p className="text-[#fab387] mb-1">Software Engineer @ Alaria Studio</p>
        <p className="text-[#fab387] mb-6">Sunnyvale, CA</p>
        <div className="flex justify-center sm:justify-start gap-6">
          <a
            href="https://github.com/chang2000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#89b4fa] transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/tianchangwang/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#89b4fa] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:wangtcalex@gmail.com"
            className="hover:text-[#89b4fa] transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://devtcwang.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#89b4fa] transition-colors"
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <p className="leading-relaxed max-w-2xl">
          Building scalable web applications with TypeScript, React, and Node.js
          at Alaria Studio.
        </p>
      </div>

      <div className="text-sm text-[#a6e3a1] text-center sm:text-left">
        {mode === "NORMAL"
          ? "Use :projects to see my work"
          : mode === "INSERT"
          ? "Press ESC to return to normal mode"
          : "Enter command"}
      </div>
    </div>
  );
}
