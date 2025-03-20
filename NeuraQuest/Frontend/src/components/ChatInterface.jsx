
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { mockResponse } from '../utils/mockData';
import LegalResponse from './LegalResponse';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Here is what I found about your query:',
        sender: 'ai',
        response: mockResponse
      }]);
      setIsLoading(false);
    }, 2000);
  };
  
  // Handle external search requests (from SearchBar)
  const handleSearch = (query) => {
    setMessages([...messages, { text: query, sender: 'user' }]);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Here is what I found about your query:',
        sender: 'ai',
        response: mockResponse
      }]);
      setIsLoading(false);
    }, 2000);
  };
  
  // Auto scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-6" style={{ scrollbarWidth: 'thin' }}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-law-foreground/70 max-w-md animate-fade-in">
              <h2 className="text-xl font-medium mb-2">Welcome to NyāyaSearch</h2>
              <p className="mb-4">
                Ask any question about Indian law, recent judgments, or legal procedures.
              </p>
              <div className="text-sm bg-law-muted/50 p-4 rounded-lg inline-block">
                Try asking: "What are the recent amendments to the Companies Act?"
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-law-primary flex items-center justify-center text-white mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                <div className={message.sender === 'user' ? 'user-bubble' : 'ai-bubble'}>
                  <p>{message.text}</p>
                  {message.response && (
                    <div className="mt-4">
                      <LegalResponse response={message.response} />
                    </div>
                  )}
                </div>
                
                {message.sender === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-law-foreground flex items-center justify-center text-white ml-2">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full bg-law-primary flex items-center justify-center text-white mr-2">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="ai-bubble">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your legal question..."
            className="flex-1 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-law-primary/30 focus:outline-none transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || newMessage.trim() === ''}
            className={`p-3 rounded-xl transition-all duration-200 ${
              newMessage.trim() === '' || isLoading
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-law-primary hover:bg-law-accent text-white'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
