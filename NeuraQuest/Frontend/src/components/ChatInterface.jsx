import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa'; // Updated to specific icon imports

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/demo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ query: newMessage }),
      });
      const data = await response.json();
      const formattedResults = formatApiResponse(data.fullText);

      setMessages(prev => [
        ...prev,
        { text: 'Here is what I found about your query:', sender: 'ai', response: formattedResults },
      ]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [
        ...prev,
        { text: 'Sorry, something went wrong. Please try again later.', sender: 'ai' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatApiResponse = (fullText) => {
    const results = fullText.split('============================================================');
    return results.map(result => {
      const parts = result.split('Link:');
      const titlePart = parts[0].split('Title:')[1]?.trim() || 'No Title';
      const headlinePart = parts[0].split('Headline:')[1]?.trim() || 'No Headline';
      const datePart = parts[0].split('Date:')[1]?.trim() || 'No Date';
      const courtPart = parts[0].split('Court:')[1]?.trim() || 'No Court';
      const documentIdPart = parts[0].split('Document ID:')[1]?.trim() || 'No Document ID';
  
      return {
        title: titlePart,
        headline: headlinePart,
        date: datePart,
        court: courtPart,
        documentId: documentIdPart,
        link: parts[1]?.trim() || ''
      };
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col bg-gray-50 p-4 rounded-xl shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-600 max-w-md animate-fade-in">
              <h2 className="text-xl font-semibold mb-2">Welcome to NyāyaSearch</h2>
              <p className="mb-4 text-sm">Ask any question about Indian law, recent judgments, or legal procedures.</p>
              <div className="text-sm bg-law-muted/50 p-4 inline-block rounded-lg">
                Try asking: "What are the recent amendments to the Companies Act?"
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} space-x-4`}>
                {message.sender === 'ai' && (
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
                    <FaRobot className="h-5 w-5" />
                  </div>
                )}
                <div className={`max-w-xl ${message.sender === 'user' ? 'bg-law-muted/50 text-right' : 'bg-gray-50'} p-4 rounded-lg shadow-md`}>
                  <p>{message.text}</p>
                  {message.response && (
                    <div className="mt-4 space-y-2">
                      {message.response.map((result, idx) => (
                        <div key={idx} className="legal-result bg-law-muted/30 p-3 rounded-md">
                          <h3 className="text-md">{result.title}</h3>
                          <a href={result.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" >
                            Read more (Reference)
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {message.sender === 'user' && (
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white ml-2">
                    <FaUser className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-law-primary flex items-center justify-center text-white mr-2">
                  <FaRobot className="h-5 w-5" />
                </div>
                <div className="bg-law-muted/50 p-4 rounded-lg shadow-md flex items-center justify-between space-x-3">
                  <div className="text-gray-500">Typing...</div>
                  <div className="loading-dots flex space-x-1">
                    <span className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-300">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your legal question..."
            className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || newMessage.trim() === ''}
            className={`p-3 rounded-lg transition-all duration-200 ${newMessage.trim() === '' || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            <FaPaperPlane className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
