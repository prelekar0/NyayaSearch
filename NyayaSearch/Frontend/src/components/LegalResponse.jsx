
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronDown, ChevronUp, PanelRight, FileText } from 'lucide-react';
import Citation from './Citation';

const LegalResponse = ({ response, isLoading }) => {
  const [expandedView, setExpandedView] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const contentRef = useRef(null);
  
  // Process text to add highlighting and citations
  const processText = (text) => {
    if (!text) return '';
    
    // Process highlights
    let processed = text.replace(
      /<highlight>(.*?)<\/highlight>/g, 
      (_, p1) => `<span class="highlight">${p1}</span>`
    );
    
    // Process citations
    processed = processed.replace(
      /<citation>(.*?)<\/citation>/g,
      (_, p1) => `<span class="citation" data-citation="${p1}">${p1}</span>`
    );
    
    return processed;
  };
  
  // Handle citation click
  const handleCitationClick = (e) => {
    if (e.target.classList.contains('citation')) {
      const citationText = e.target.getAttribute('data-citation');
      const citation = response.citations.find(c => c.citation === citationText);
      if (citation) {
        setSelectedCitation(citation);
      }
    }
  };
  
  // Add click listeners to citation elements
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.addEventListener('click', handleCitationClick);
      return () => {
        contentRef.current?.removeEventListener('click', handleCitationClick);
      };
    }
  }, [response]);
  
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-pulse-subtle">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
      </div>
    );
  }
  
  if (!response) return null;
  
  return (
    <>
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 transform">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-law-primary" />
            <h2 className="font-medium text-lg">Legal Analysis</h2>
          </div>
          
          <div
            ref={contentRef}
            className={`prose prose-slate max-w-none transition-all duration-500 ${
              expandedView ? '' : 'max-h-56 overflow-hidden relative'
            }`}
            dangerouslySetInnerHTML={{ __html: expandedView ? 
              processText(response.fullText) : 
              processText(response.summary) 
            }}
          />
          
          {!expandedView && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 p-4">
          <button
            onClick={() => setExpandedView(!expandedView)}
            className="flex items-center space-x-2 text-law-primary hover:text-law-accent transition-colors duration-200 text-sm"
          >
            {expandedView ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>View Summary</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>View Full Analysis</span>
              </>
            )}
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-law-foreground/70 hover:text-law-foreground transition-colors duration-200 text-sm">
              <PanelRight className="h-4 w-4" />
              <span>Related Cases</span>
            </button>
            
            <button className="flex items-center space-x-2 text-law-foreground/70 hover:text-law-foreground transition-colors duration-200 text-sm">
              <FileText className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
      
      {selectedCitation && (
        <Citation 
          citation={selectedCitation}
          onClose={() => setSelectedCitation(null)}
        />
      )}
    </>
  );
};

export default LegalResponse;
