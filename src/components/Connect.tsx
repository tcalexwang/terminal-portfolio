import React from 'react';
import { Mail, Github, Twitter, Linkedin, Globe } from 'lucide-react';

type Props = {
  mode: 'NORMAL' | 'COMMAND' | 'INSERT';
  onSelect: (item: string) => void;
};

export default function Connect({ mode }: Props) {
  const links = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@example.com',
      href: 'mailto:hello@example.com'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@username',
      href: 'https://github.com'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@handle',
      href: 'https://twitter.com'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'in/profile',
      href: 'https://linkedin.com'
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'example.com',
      href: 'https://example.com'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl mb-4">Let's Connect</h2>
      
      <div className="grid gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-green-800 hover:border-green-500 hover:bg-green-500 hover:bg-opacity-20 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <div>
                <div className="font-bold">{link.label}</div>
                <div className="text-green-400">{link.value}</div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-8 p-4 border border-green-800">
        <h3 className="font-bold mb-2">Open to Opportunities</h3>
        <p className="text-green-400">
          Currently interested in full-stack development roles and open source collaboration.
          Feel free to reach out!
        </p>
      </div>

      <div className="text-sm text-green-600">
        {mode === 'NORMAL' ? (
          'Click any link to connect'
        ) : mode === 'INSERT' ? (
          'Press ESC to return to normal mode'
        ) : (
          'Enter command'
        )}
      </div>
    </div>
  );
}