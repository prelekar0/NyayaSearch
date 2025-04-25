
import React, { useState } from 'react';
import { Search, BookText, Clock, Sparkles } from 'lucide-react';
import { legalQueries } from '../utils/mockData';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
    setQuery('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative transition-all duration-300 transform">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Ask your legal question..."
          className="search-input"
        />
        <button 
          type="submit" 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-law-primary hover:bg-law-accent text-white p-3 rounded-xl transition-colors duration-200"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {isFocused && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-card p-4 z-10 animate-fade-up origin-top">
          <div className="flex items-center space-x-2 text-sm text-law-foreground/70 mb-3">
            <Sparkles className="h-4 w-4 text-law-primary" />
            <span>Suggested Questions</span>
          </div>
          <ul className="space-y-3">
            {legalQueries.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-start space-x-3 p-2 rounded-lg hover:bg-law-muted/50 cursor-pointer transition-colors duration-200"
              >
                {index % 2 === 0 ? (
                  <BookText className="h-5 w-5 text-law-primary mt-0.5" />
                ) : (
                  <Clock className="h-5 w-5 text-law-primary mt-0.5" />
                )}
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
