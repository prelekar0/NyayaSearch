
import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check } from 'lucide-react';

const Citation = ({ citation, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(citation.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="glass-card bg-white/90 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto animate-fade-up shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="bg-law-muted text-law-primary text-xs px-2 py-1 rounded-full">CASE LAW</span>
            <h2 className="text-xl font-semibold mt-2">{citation.citation}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-law-foreground/70 hover:text-law-foreground p-1 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-law-foreground/70 mb-1">Summary</h3>
            <p className="text-law-foreground">{citation.summary}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-law-foreground/70 mb-1">Relevant Text</h3>
            <blockquote className="border-l-2 border-law-primary pl-4 py-1 text-law-foreground/90 italic">
              {citation.relevantText}
            </blockquote>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <a 
            href="#" 
            className="text-law-primary hover:text-law-accent flex items-center transition-colors duration-200"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            <span>View Full Case</span>
          </a>
          
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 text-law-foreground/70 hover:text-law-foreground transition-colors duration-200"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Citation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Citation;
