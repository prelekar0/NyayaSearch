
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ChatInterface from '../components/ChatInterface';
import { recentCases } from '../utils/mockData';
import { Scale, Search, Bookmark, BookOpen, FileText, History } from 'lucide-react';

const Index = () => {
  const [chatRef, setChatRef] = useState(null);
  
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
          <div className="inline-flex items-center justify-center p-1 bg-law-muted rounded-full mb-6 animate-fade-in">
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
          
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>
        
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden h-[600px] animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <ChatInterface ref={setChatRef} />
          </div>
          
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-lg flex items-center">
                  <FileText className="h-5 w-5 text-law-primary mr-2" />
                  Recent Cases
                </h2>
                <button className="text-sm text-law-primary hover:text-law-accent transition-colors duration-200">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentCases.map((kase, index) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-law-muted/50 transition-colors duration-200 cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-sm">{kase.title}</h3>
                      <button className="text-law-foreground/50 hover:text-law-primary">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-law-foreground/70">{kase.citation}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-law-foreground/60">{kase.date}</span>
                      <span className="text-xs bg-law-muted px-2 py-0.5 rounded-full">{kase.subject}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-medium text-lg flex items-center mb-4">
                <Search className="h-5 w-5 text-law-primary mr-2" />
                Quick Access
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-law-muted/50 rounded-lg hover:bg-law-muted transition-colors duration-200">
                  <BookOpen className="h-6 w-6 text-law-primary mb-2" />
                  <span className="text-sm">Bare Acts</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 bg-law-muted/50 rounded-lg hover:bg-law-muted transition-colors duration-200">
                  <FileText className="h-6 w-6 text-law-primary mb-2" />
                  <span className="text-sm">Judgments</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 bg-law-muted/50 rounded-lg hover:bg-law-muted transition-colors duration-200">
                  <History className="h-6 w-6 text-law-primary mb-2" />
                  <span className="text-sm">History</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 bg-law-muted/50 rounded-lg hover:bg-law-muted transition-colors duration-200">
                  <Bookmark className="h-6 w-6 text-law-primary mb-2" />
                  <span className="text-sm">Saved</span>
                </button>
              </div>
            </div>
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
