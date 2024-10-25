import React, { useState, useEffect } from 'react';
import { ChevronRight, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'AI Video Enhancement(Backend)',
    description: 'In an unicorn AI company',
    tech: ['Golang', 'Docker', 'gRPC', 'MySQL'],
  },
  {
    id: 2,
    name: 'AI Image Dataset Annotation Tool',
    description: 'In an unicorn AI company',
    tech: ['React', 'CanvasJS'],
  },
  {
    id: 3,
    name: 'Yeah! A Dress-Up Game!',
    description: 'A collab with Maria Cai, showcasing a series of illustration art',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Drizzle ORM'],
    demo: 'https://yeah-dressup.vercel.app/'
  },
  {
    id: 4,
    name: 'Movie Blind Box',
    description: 'A community-driven movie recommendation platform',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Prisma ORM'],
    demo: 'https://movie-blindbox.us'
  }
];

type Props = {
  mode: 'NORMAL' | 'COMMAND' | 'INSERT';
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
      if (mode !== 'NORMAL') return;

      switch (e.key.toLowerCase()) {
        case 'j':
        case 'arrowdown':
          e.preventDefault();
          setSelectedIndex(prev => {
            const newIndex = (prev + 1) % projects.length;
            onSelect(projects[newIndex].name);
            return newIndex;
          });
          break;
        case 'k':
        case 'arrowup':
          e.preventDefault();
          setSelectedIndex(prev => {
            const newIndex = prev === 0 ? projects.length - 1 : prev - 1;
            onSelect(projects[newIndex].name);
            return newIndex;
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, onSelect]);

  return (
    <div>
      <h2 className="text-xl mb-4">Projects</h2>
      <div className="space-y-2">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`p-4 border ${
              selectedIndex === index 
                ? 'border-green-500 bg-green-500 bg-opacity-20' 
                : 'border-green-800'
            }`}
          >
            <div className="flex items-start">
              {selectedIndex === index && (
                <ChevronRight className="w-4 h-4 mr-2 mt-1" />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-green-400 text-sm mt-1">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-green-900 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-green-600">
        {mode === 'NORMAL' ? (
          'Use j/k to navigate • i to enter insert mode'
        ) : mode === 'INSERT' ? (
          'Press ESC to return to normal mode'
        ) : (
          'Enter command'
        )}
      </div>
    </div>
  );
}