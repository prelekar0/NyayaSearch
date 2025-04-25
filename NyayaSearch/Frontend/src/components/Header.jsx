
import React from 'react';
import { Scale, BookOpen, Gavel } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 z-10">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3 animate-fade-in">
          <Scale className="h-8 w-8 text-law-primary" />
          <h1 className="text-2xl font-semibold">NyāyaSearch</h1>
          <span className="bg-law-muted text-law-primary text-xs px-2 py-1 rounded-full">BETA</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-law-foreground/80 hover:text-law-primary transition-colors duration-200 flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Resources</span>
          </a>
          <a href="#" className="text-law-foreground/80 hover:text-law-primary transition-colors duration-200 flex items-center">
            <Gavel className="h-4 w-4 mr-2" />
            <span>Case Law</span>
          </a>
          <button className="bg-law-primary hover:bg-law-accent text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-subtle">
            Sign In
          </button>
        </nav>
        
        <button className="md:hidden text-law-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
