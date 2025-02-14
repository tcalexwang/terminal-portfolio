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
        <div className="text-[#fab387] mb-1 text-xl sm:text-2xl font-bold tracking-tight">
          <span className="animate-pulse-glow">Software Engineer</span> @{" "}
          <a
            href="https://alaria.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-block"
          >
            <span
              className="font-bold text-2xl sm:text-4xl text-[#F38BA8] tracking-tight hover:animate-pulse"
              style={{
                textShadow: "0.5px 0.5px 0 #fff, 1px 1px 0 rgba(0,0,0,0.2)",
              }}
            >
              Alaria Studio
            </span>

            {/* Preview Card */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transform group-hover:translate-y-0 -translate-y-4
              transition-all duration-300 ease-elastic
              w-[300px] z-10 animate-float"
            >
              <div
                className="bg-[#313244] rounded-lg shadow-xl overflow-hidden
                transform origin-top scale-90 group-hover:scale-100 
                transition-all duration-300 ease-elastic
                hover:shadow-[0_0_20px_rgba(180,190,254,0.3)]
                group-hover:rotate-0 -rotate-2"
              >
                {/* Preview Image */}
                <div className="w-full h-[150px] bg-[#1e1e2e] overflow-hidden">
                  <img
                    src={`https://api.microlink.io/?url=https://alaria.studio&screenshot=true&meta=false&embed=screenshot.url`}
                    alt="Alaria Studio Preview"
                    className="w-full h-full object-cover
                      transform scale-105 group-hover:scale-100
                      transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                {/* Preview Content with Staggered Animation */}
                <div className="p-3 transform">
                  <h4
                    className="font-bold text-sm mb-1 
                    opacity-0 group-hover:opacity-100
                    translate-y-2 group-hover:translate-y-0
                    transition-all duration-300 delay-100"
                  >
                    Alaria Studio
                  </h4>
                  <p
                    className="text-xs text-[#cdd6f4] mb-1
                    opacity-0 group-hover:opacity-100
                    translate-y-2 group-hover:translate-y-0
                    transition-all duration-300 delay-150"
                  >
                    Creative Technology Studio
                  </p>
                  <p
                    className="text-xs text-[#fab387]
                    opacity-0 group-hover:opacity-100
                    translate-y-2 group-hover:translate-y-0
                    transition-all duration-300 delay-200"
                  >
                    alaria.studio
                  </p>
                </div>
              </div>
              {/* Animated Arrow */}
              <div
                className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 
                bg-[#313244] transform -rotate-45
                scale-0 group-hover:scale-100
                transition-transform duration-300 delay-150
                origin-center"
              ></div>
            </div>
          </a>
        </div>
        <p className="text-[#fab387] mb-6">Sunnyvale, CA</p>
        <div className="flex justify-center sm:justify-start gap-6">
          <a
            href="https://github.com/tcalexwang"
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
          playing with Reasoning LLMs Now
        </p>
        <p className="leading-relaxed max-w-2xl">
          currently building{" "}
          <a
            href="https://keyforge.alaria.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#89b4fa] hover:text-[#b4befe] transition-colors"
          >
            Keyforge
          </a>
          , a secure and handy place to put your api secrets.
        </p>

        <p className="leading-relaxed max-w-2xl">always delivers</p>
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
