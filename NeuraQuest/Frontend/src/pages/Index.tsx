
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ChatInterface from '../components/ChatInterface';
import { recentCases } from '../utils/mockData';
import RecentCases from '../components/RecentCases';
import { Scale, Search, Bookmark, BookOpen, FileText, History, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [chatRef, setChatRef] = useState(null);
  const navigate = useNavigate();
  // Function to pass to SearchBar component
  const handleSearch = (query) => {
    if (chatRef) {
      chatRef(query);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-law-muted/30">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pb-12">
        <section className="py-12 md:py-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-law-muted rounded-full mb-6 animate-fade-in">
            <Scale className="h-5 w-5 text-law-primary mr-2" />
            <span className="text-sm text-law-primary">Indian Legal Research Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 animate-fade-up">
            Discover Indian Law with 
            <span className="text-law-primary"> AI Precision</span>
          </h1>
          
          <p className="text-xl text-law-foreground/70 mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Ask questions in plain language and get accurate legal insights backed by Indian case law and statutes
          </p>
          
          <div className="animate-fade-up flex items-center justify-center gap-2" style={{ animationDelay: '0.2s' }}>
            <button onClick={() => navigate('/chat')} className="bg-law-primary hover:bg-law-accent text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-subtle flex items-center">
              New Case Study
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>

            <button onClick={() => navigate('/chat')} className="bg-law-primary hover:bg-law-accent text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-subtle flex items-center">
              <Scale className="h-5 w-5 mr-2" />
              Upgrade to Pro
            </button>
            {/* <SearchBar onSearch={handleSearch} /> */}
          </div>
        </section>
        
        
      </main>
      
      <footer className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-law-foreground/60 text-sm">
          <p>NyāyaSearch &copy; {new Date().getFullYear()} • Legal research reimagined</p>
          <p className="mt-1">This is a demonstration platform. Not for professional legal use.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
