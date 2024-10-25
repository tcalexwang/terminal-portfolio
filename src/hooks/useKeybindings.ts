import { useEffect, useCallback } from 'react';

type KeybindingMode = 'NORMAL' | 'COMMAND' | 'INSERT';

type KeybindingConfig = {
  mode: KeybindingMode;
  onModeChange: (mode: KeybindingMode) => void;
  onCommand: (command: string) => void;
  onEscape: () => void;
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onSelect: () => void;
};

export function useKeybindings({
  mode,
  onModeChange,
  onCommand,
  onEscape,
  onNavigate,
  onSelect,
}: KeybindingConfig) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (mode === 'INSERT') {
      // In INSERT mode, only handle Escape key
      if (e.key === 'Escape') {
        onEscape();
        onModeChange('NORMAL');
      }
      return; // Allow all other keys to type normally
    }

    // Prevent default behavior only in NORMAL mode
    if (mode === 'NORMAL' && ['h', 'j', 'k', 'l', 'i', ':'].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }

    if (mode === 'NORMAL') {
      switch (e.key.toLowerCase()) {
        case ':':
          onModeChange('COMMAND');
          break;
        case 'i':
          onModeChange('INSERT');
          break;
        case 'h':
        case 'arrowleft':
          onNavigate('left');
          break;
        case 'l':
        case 'arrowright':
          onNavigate('right');
          break;
        case 'j':
        case 'arrowdown':
          onNavigate('down');
          break;
        case 'k':
        case 'arrowup':
          onNavigate('up');
          break;
        case 'enter':
          onSelect();
          break;
      }
    } else if (mode === 'COMMAND') {
      if (e.key === 'Escape') {
        onEscape();
        onModeChange('NORMAL');
      }
    }
  }, [mode, onModeChange, onNavigate, onSelect, onEscape]);

  // Listen for custom command execution events
  useEffect(() => {
    const handleCommandExecution = (e: CustomEvent<{ command: string }>) => {
      onCommand(e.detail.command);
    };

    window.addEventListener('executeCommand', handleCommandExecution as EventListener);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('executeCommand', handleCommandExecution as EventListener);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, onCommand]);

  return mode;
}