"use client";

import React, { useEffect, useRef } from "react";
import { AlignJustify, X } from "lucide-react";
import { useSidebar } from "./SidebarContext";

const AppHeader: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (   
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 z-50">
      <div className="flex items-center justify-between w-full px-4 py-3 lg:px-6">
        {/* Mobile Sidebar Toggle */}
        <button
          className="lg:hidden p-2 rounded-md border dark:border-gray-700 text-gray-600 dark:text-gray-300"
          onClick={toggleMobileSidebar}
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <AlignJustify className="w-5 h-5" />
          )}
        </button>

        {/* Optional Search (Ctrl+K focusable) */}
        <div className="hidden lg:flex items-center w-full max-w-md ml-auto">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;