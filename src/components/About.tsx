import React from 'react';
import { Github, Twitter, Linkedin, ExternalLink, Mail, Globe } from 'lucide-react';

type Props = {
  mode: 'NORMAL' | 'COMMAND' | 'INSERT';
  onSelect: (item: string) => void;
};

export default function About({ mode }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?auto=format&fit=crop&w=200&h=200"
          alt="Profile"
          className="w-32 h-32 rounded-lg border-2 border-green-500"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-2">Alex(Tianchang) Wang</h1>
          <p className="text-green-400">Software Engineer, Student</p>
          <p className="text-green-400 mb-4">Sunnyvale, CA</p>
          <div className="flex justify-center sm:justify-start gap-4">
            <a href="https://github.com/chang2000" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/tianchangwang/" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:wangtcalex@gmail.com" className="hover:text-green-300">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://devtcwang.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="leading-relaxed">
          Hello! I'm a passionate software engineer with expertise in building scalable web applications.
          I love working with TypeScript, React, and Node.js.
        </p>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <a href="https://devtcwang.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-green-300">
              <ExternalLink className="w-4 h-4" />
              Website
            </a>
            <a href="mailto:wangtcalex@gmail.com" className="flex items-center gap-1 hover:text-green-300">
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="text-sm text-green-600 text-center sm:text-left">
        {mode === 'NORMAL' ? (
          'Use :projects to see my work'
        ) : mode === 'INSERT' ? (
          'Press ESC to return to normal mode'
        ) : (
          'Enter command'
        )}
      </div>
    </div>
  );
}