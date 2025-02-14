import React from "react";
import { Github, Linkedin, ExternalLink, Mail, Globe } from "lucide-react";

type Props = {
  mode: "NORMAL" | "COMMAND" | "INSERT";
  onSelect: (item: string) => void;
};

export default function About({ mode }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold mb-2">Alex(Tianchang) Wang</h1>
        <p className="text-[#fab387]">Software Engineer, Student</p>
        <p className="text-[#fab387] mb-4">Sunnyvale, CA</p>
        <div className="flex justify-center sm:justify-start gap-4">
          <a
            href="https://github.com/chang2000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#89b4fa]"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/tianchangwang/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#89b4fa]"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:wangtcalex@gmail.com"
            className="hover:text-[#89b4fa]"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://devtcwang.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#89b4fa]"
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <p className="leading-relaxed">
          Hello! I'm a passionate software engineer with expertise in building
          scalable web applications. I love working with TypeScript, React, and
          Node.js.
        </p>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <a
              href="https://devtcwang.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#89b4fa]"
            >
              <ExternalLink className="w-4 h-4" />
              Website
            </a>
            <a
              href="mailto:wangtcalex@gmail.com"
              className="flex items-center gap-1 hover:text-[#89b4fa]"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>
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
