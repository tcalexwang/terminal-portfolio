import React, { useState, useEffect } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 991,
    name: "Keyforge",
    description:
      "Keyforge is a API Key Management System that allows you to manage your API keys in a convenient and secure way.",
    tech: ["Next.js", "Nginx", "Payment Infrastructure"],
  },
  {
    id: 995,
    name: "Tech Consulting Business",
    description:
      "I run a tech consulting business, helping companies with their tech needs.",
    tech: [],
  },
  {
    id: 994,
    name: "AI Mind",
    description:
      "A digital representation of any minds, a platform for providing chatbots with long-term memory and personaliities.",
    tech: ["Next.js", "Upstash", "Self hosted LLM", "Prisma ORM"],
  },
  {
    id: 996,
    name: "AI Video Enhancement(Backend)",
    description: "In an unicorn AI company",
    tech: ["Golang", "Docker", "gRPC", "MySQL"],
  },
  {
    id: 997,
    name: "AI Image Dataset Annotation Tool",
    description: "In an unicorn AI company",
    tech: ["React", "CanvasJS"],
  },
  {
    id: 998,
    name: "Yeah! A Dress-Up Game!",
    description:
      "A collab with Maria Cai, showcasing a series of illustration art",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Drizzle ORM"],
    demo: "https://yeah-dressup.vercel.app/",
  },
  {
    id: 999,
    name: "Movie Blind Box",
    description: "A community-driven movie recommendation platform",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Prisma ORM"],
    demo: "https://movie-blindbox.us",
  },
];

type Props = {
  mode: "NORMAL" | "COMMAND" | "INSERT";
  onSelect: (name: string) => void;
};

export default function Projects({ mode, onSelect }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (projects.length > 0) {
      onSelect(projects[0].name);
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
            const newIndex = (prev + 1) % projects.length;
            onSelect(projects[newIndex].name);
            return newIndex;
          });
          break;
        case "k":
        case "arrowup":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev === 0 ? projects.length - 1 : prev - 1;
            onSelect(projects[newIndex].name);
            return newIndex;
          });
          break;
      }
    };

    const handleActivateSelection = () => {
      const selectedProject = projects[selectedIndex];
      if (selectedProject.demo) {
        window.open(selectedProject.demo, "_blank");
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
  }, [mode, onSelect, selectedIndex]);

  return (
    <div className="h-full flex flex-col overflow-auto">
      <h2 className="text-xl mb-4">Projects</h2>
      <div className="space-y-2 flex-1">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`p-4 border ${
              selectedIndex === index
                ? "border-[#b4befe] bg-[#b4befe] bg-opacity-20"
                : "border-[#313244]"
            } cursor-pointer hover:border-[#b4befe] hover:bg-[#b4befe] hover:bg-opacity-10 transition-colors`}
            onClick={() => {
              setSelectedIndex(index);
              onSelect(project.name);
              if (project.demo) {
                window.open(project.demo, "_blank");
              }
            }}
          >
            <div className="flex items-start gap-2">
              {selectedIndex === index && (
                <ChevronRight className="w-4 h-4 mt-1 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold truncate">{project.name}</h3>
                    <p className="text-[#fab387] text-sm mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#89b4fa]"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-1.5 py-0.5 bg-[#313244] rounded whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-[#a6e3a1]">
        {mode === "NORMAL"
          ? "Use j/k to navigate • Enter to open demo"
          : mode === "INSERT"
          ? "Press ESC to return to normal mode"
          : "Enter command"}
      </div>
    </div>
  );
}
