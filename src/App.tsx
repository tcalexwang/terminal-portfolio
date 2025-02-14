import React, { useState, useCallback } from "react";
import { User, Code, Heart, Mail, Command, Menu } from "lucide-react";
import About from "./components/About";
import Projects from "./components/Projects";
import Interests from "./components/Interests";
import Connect from "./components/Connect";
import Navigation from "./components/Navigation";
import CommandLine from "./components/CommandLine";
import StatusLine from "./components/StatusLine";
import ExitPopup from "./components/ExitPopup";
import Toast from "./components/Toast";
import { useKeybindings } from "./hooks/useKeybindings";

const sections = ["me", "projects", "diggin", "connect", "help"] as const;
type Section = (typeof sections)[number];

function App() {
  const [activeSection, setActiveSection] = useState<Section>("me");
  const [mode, setMode] = useState<"NORMAL" | "COMMAND" | "INSERT">("NORMAL");
  const [command, setCommand] = useState("");
  const [selectedItem, setSelectedItem] = useState<string>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [bookmarkToast, setBookmarkToast] = useState<string | null>(null);

  const handleCommand = useCallback((cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();
    switch (normalizedCmd) {
      case "q":
      case "quit":
        setShowExitConfirm(true);
        break;
      case "w":
        // Show bookmark shortcut hint
        setBookmarkToast(
          `Press ${
            navigator.platform.toLowerCase().includes("mac") ? "⌘" : "Ctrl"
          }+D to bookmark this page`
        );
        setTimeout(() => setBookmarkToast(null), 4000);
        break;
      case "me":
      case "projects":
      case "diggin":
      case "connect":
      case "help":
        setActiveSection(normalizedCmd as Section);
        setIsMenuOpen(false);
        break;
    }
    setMode("NORMAL");
    setCommand("");
  }, []);

  const handleExit = useCallback(() => {
    // This will close the current tab
    window.close();
    // As a fallback, we can redirect to a different page
    window.location.href = "about:blank";
  }, []);

  const handleNavigate = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (direction === "left" || direction === "right") {
        setActiveSection((prev) => {
          const currentIndex = sections.indexOf(prev);
          if (direction === "left") {
            return sections[
              currentIndex === 0 ? sections.length - 1 : currentIndex - 1
            ];
          } else {
            return sections[(currentIndex + 1) % sections.length];
          }
        });
      }
    },
    []
  );

  useKeybindings({
    mode,
    onModeChange: setMode,
    onCommand: handleCommand,
    onEscape: () => {
      setMode("NORMAL");
      setCommand("");
      setIsMenuOpen(false);
    },
    onNavigate: handleNavigate,
    onSelect: () => {
      if (mode === "NORMAL" && selectedItem) {
        const event = new CustomEvent("activateSelection", {
          detail: { item: selectedItem },
        });
        window.dispatchEvent(event);
      }
    },
  });

  return (
    <div className="h-screen overflow-hidden bg-[#1e1e2e] text-[#cdd6f4] p-2 sm:p-4 terminal-text">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        <div
          className="flex items-center gap-2 mb-4 
        pb-2"
        >
          <h1 className="text-xl">~/alex-wang</h1>
          <div className="hidden sm:block ml-auto text-sm">
            <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">:help</kbd> for
            commands
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto sm:hidden p-1 hover:bg-[#b4befe] hover:bg-opacity-20 rounded"
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
            help: Command,
          }}
          isMenuOpen={isMenuOpen}
          onSectionClick={() => setIsMenuOpen(false)}
        />

        <main className="mt-4 border border-[#b4befe] p-2 sm:p-4 flex-1 overflow-hidden mb-8">
          {activeSection === "me" && (
            <About mode={mode} onSelect={setSelectedItem} />
          )}
          {activeSection === "projects" && (
            <Projects mode={mode} onSelect={setSelectedItem} />
          )}
          {activeSection === "diggin" && (
            <Interests mode={mode} onSelect={setSelectedItem} />
          )}
          {activeSection === "connect" && (
            <Connect mode={mode} onSelect={setSelectedItem} />
          )}
          {activeSection === "help" && (
            <div className="space-y-2">
              <h2 className="text-xl mb-4">Help</h2>
              <p>Modes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">ESC</kbd> -
                  Normal mode
                </li>
                <li>
                  <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">i</kbd> -
                  Insert mode
                </li>
                <li>
                  <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">:</kbd> -
                  Command mode
                </li>
              </ul>
              <p className="mt-4">Navigation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Use <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">h</kbd>{" "}
                  or <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">←</kbd>{" "}
                  to move left
                </li>
                <li>
                  Use <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">l</kbd>{" "}
                  or <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">→</kbd>{" "}
                  to move right
                </li>
                <li>
                  Use <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">j</kbd>{" "}
                  or <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">↓</kbd>{" "}
                  to move down in lists
                </li>
                <li>
                  Use <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">k</kbd>{" "}
                  or <kbd className="bg-[#b4befe] text-[#1e1e2e] px-1">↑</kbd>{" "}
                  to move up in lists
                </li>
              </ul>
              <p className="mt-4">Commands:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>:me - About me</li>
                <li>:projects - View projects</li>
                <li>:diggin - What I'm into</li>
                <li>:connect - Get in touch</li>
                <li>:help - Show this help</li>
                <li>:w - Save current section to bookmarks</li>
                <li>:q or :quit - Exit</li>
              </ul>
            </div>
          )}
        </main>

        {mode === "COMMAND" && (
          <CommandLine
            visible={true}
            command={command}
            onChange={setCommand}
            onSubmit={handleCommand}
            onEscape={() => {
              setMode("NORMAL");
              setCommand("");
            }}
          />
        )}

        <StatusLine
          mode={mode}
          activeSection={activeSection}
          selectedItem={selectedItem}
        />

        {showExitConfirm && (
          <ExitPopup
            onConfirm={handleExit}
            onCancel={() => setShowExitConfirm(false)}
          />
        )}

        {showToast && (
          <Toast
            message="This site uses Vim-like keymaps. Consider disabling Vimium/Vimium C extension for the best experience."
            duration={4000}
            onClose={() => setShowToast(false)}
          />
        )}

        {bookmarkToast && (
          <Toast
            message={bookmarkToast}
            duration={4000}
            onClose={() => setBookmarkToast(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
