import React, { useState, useCallback } from 'react';
import { User, Code, Heart, Mail, Command, Menu, BracesIcon, AppleIcon } from 'lucide-react';
import About from './components/About';
import Projects from './components/Projects';
import Interests from './components/Interests';
import Connect from './components/Connect';
import Navigation from './components/Navigation';
import CommandLine from './components/CommandLine';
import StatusLine from './components/StatusLine';
import { useKeybindings } from './hooks/useKeybindings';

const sections = ['me', 'projects', 'diggin', 'connect', 'help'] as const;
type Section = typeof sections[number];

function App() {
  const [activeSection, setActiveSection] = useState<Section>('me');
  const [mode, setMode] = useState<'NORMAL' | 'COMMAND' | 'INSERT'>('NORMAL');
  const [command, setCommand] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCommand = useCallback((cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();
    switch (normalizedCmd) {
      case 'q':
      case 'quit':
        alert('Thanks for visiting!');
        break;
      case 'me':
      case 'projects':
      case 'diggin':
      case 'connect':
      case 'help':
        setActiveSection(normalizedCmd as Section);
        setIsMenuOpen(false);
        break;
    }
    setMode('NORMAL');
    setCommand('');
  }, []);

  const handleNavigate = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (direction === 'left' || direction === 'right') {
      setActiveSection(prev => {
        const currentIndex = sections.indexOf(prev);
        if (direction === 'left') {
          return sections[currentIndex === 0 ? sections.length - 1 : currentIndex - 1];
        } else {
          return sections[(currentIndex + 1) % sections.length];
        }
      });
    }
  }, []);

  useKeybindings({
    mode,
    onModeChange: setMode,
    onCommand: handleCommand,
    onEscape: () => {
      setMode('NORMAL');
      setCommand('');
      setIsMenuOpen(false);
    },
    onNavigate: handleNavigate,
    onSelect: () => {
      if (mode === 'NORMAL') {
        setMode('INSERT');
      }
    },
  });

  return (
    <div className="min-h-screen bg-black text-green-500 p-2 sm:p-4 font-mono pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4 border-b border-green-500 pb-2">
          <Command className="w-6 h-6" />
          <h1 className="text-xl">~/alex-wang-portfolio</h1>
          <div className="hidden sm:block ml-auto text-sm">
            <kbd className="bg-green-500 text-black px-1">:help</kbd> for commands
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto sm:hidden p-1 hover:bg-green-500 hover:bg-opacity-20 rounded"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <Navigation 
          sections={sections} 
          activeSection={activeSection} 
          icons={{
            me: User,
            projects: Code,
            diggin: Heart,
            connect: Mail,
            help: Command
          }}
          isMenuOpen={isMenuOpen}
          onSectionClick={() => setIsMenuOpen(false)}
        />

        <main className="mt-4 border border-green-500 p-2 sm:p-4 min-h-[60vh]">
          {activeSection === 'me' && <About mode={mode} onSelect={setSelectedItem} />}
          {activeSection === 'projects' && <Projects mode={mode} onSelect={setSelectedItem} />}
          {activeSection === 'diggin' && <Interests mode={mode} onSelect={setSelectedItem} />}
          {activeSection === 'connect' && <Connect mode={mode} onSelect={setSelectedItem} />}
          {activeSection === 'help' && (
            <div className="space-y-2">
              <h2 className="text-xl mb-4">Help</h2>
              <p>Modes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><kbd className="bg-green-500 text-black px-1">ESC</kbd> - Normal mode</li>
                <li><kbd className="bg-green-500 text-black px-1">i</kbd> - Insert mode</li>
                <li><kbd className="bg-green-500 text-black px-1">:</kbd> - Command mode</li>
              </ul>
              <p className="mt-4">Navigation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use <kbd className="bg-green-500 text-black px-1">h</kbd> or <kbd className="bg-green-500 text-black px-1">←</kbd> to move left</li>
                <li>Use <kbd className="bg-green-500 text-black px-1">l</kbd> or <kbd className="bg-green-500 text-black px-1">→</kbd> to move right</li>
                <li>Use <kbd className="bg-green-500 text-black px-1">j</kbd> or <kbd className="bg-green-500 text-black px-1">↓</kbd> to move down in lists</li>
                <li>Use <kbd className="bg-green-500 text-black px-1">k</kbd> or <kbd className="bg-green-500 text-black px-1">↑</kbd> to move up in lists</li>
              </ul>
              <p className="mt-4">Commands:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>:me - About me</li>
                <li>:projects - View projects</li>
                <li>:diggin - What I'm into</li>
                <li>:connect - Get in touch</li>
                <li>:help - Show this help</li>
                <li>:q or :quit - Exit</li>
              </ul>
            </div>
          )}
        </main>

        {mode === 'COMMAND' && (
          <CommandLine 
            visible={true}
            command={command}
            onChange={setCommand}
            onSubmit={handleCommand}
            onEscape={() => {
              setMode('NORMAL');
              setCommand('');
            }}
          />
        )}

        <StatusLine 
          mode={mode}
          activeSection={activeSection}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
}

export default App;