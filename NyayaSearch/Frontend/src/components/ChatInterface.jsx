import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaGavel, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

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
      const responseData = await response.json();
      console.log('Raw API response:', responseData);
      
      const formattedResults = formatApiResponse(responseData.data);
      console.log('Formatted results:', formattedResults);

      setMessages(prev => [
        ...prev,
        { text: 'Here is What NyāyaSearch Says!', sender: 'ai', response: formattedResults },
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

  // Helper function to safely parse nested JSON strings
  const safelyParseJSON = (jsonString) => {
    if (typeof jsonString !== 'string') return jsonString;
    
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON string:', error);
      return jsonString;
    }
  };

  // Helper function to extract a value from potentially nested objects
  const extractValue = (obj, paths, defaultValue = null) => {
    if (!obj) return defaultValue;
    
    for (const path of paths) {
      const keys = path.split('.');
      let value = obj;
      
      for (const key of keys) {
        if (value === null || value === undefined || typeof value !== 'object') {
          value = undefined;
          break;
        }
        value = value[key];
      }
      
      if (value !== undefined) return value;
    }
    
    return defaultValue;
  };

  const formatApiResponse = (data) => {
    console.log('Formatting API response, data type:', typeof data);
    
    if (!data) {
      console.error('No data to format');
      return [];
    }
    
    // Handle string data that needs parsing
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error('Error parsing data as JSON:', error);
      }
    }
    
    // Ensure we're working with an array
    const dataArray = Array.isArray(data) ? data : [data];
    
    return dataArray.map(item => {
      // Parse item if it's a JSON string
      const parsedItem = safelyParseJSON(item);
      console.log('Processing item:', parsedItem);
      
      return {
        title: extractValue(parsedItem, ['Title', 'title'], ''),
        headline: extractValue(parsedItem, ['Summary', 'summary'], '') ? 
                 extractValue(parsedItem, ['Summary', 'summary'], '').substring(0, 150) + '...' : 
                 'No Headline',
        date: extractValue(parsedItem, ['MetaData.Date', 'metadata.date', 'MetaData.date'], 'No Date'),
        court: extractValue(parsedItem, ['MetaData.Court', 'metadata.court', 'MetaData.court'], 'No Court'),
        documentId: extractValue(parsedItem, ['MetaData.Case Number', 'metadata.case number', 'MetaData.caseNumber'], 'No Document ID'),
        link: extractValue(parsedItem, ['URL', 'url'], '')
      };
    });
  };

  const handleReferenceClick = async (link, title) => {
    console.log('Fetching case details for:', title, link);
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/get_case_details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          url: link,
          title: title 
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      
      // Process the data - could be in various formats
      let processedData = responseData;
      
      // If the data is in responseData.data, use that
      if (responseData.data) {
        processedData = responseData.data;
      }
      
      // If processedData is a string, try to parse it
      if (typeof processedData === 'string') {
        try {
          processedData = JSON.parse(processedData);
        } catch (error) {
          console.error('Error parsing case details response:', error);
        }
      }
      
      console.log('Processed case details data:', processedData);
      
      setMessages(prev => [
        ...prev,
        { 
          text: 'Here are the details for the case you requested:', 
          sender: 'ai',
          caseDetails: {
            title: title,
            url: link,
            summary: extractValue(processedData, ['Summary', 'summary'], 'No summary available'),
            fullText: extractValue(processedData, ['FullText', 'fullText', 'full_text'], 'No full text available'),
            citations: extractValue(processedData, ['Citations', 'citations'], [])
          }
        },
      ]);
    } catch (error) {
      console.error('Error fetching case details:', error);
      setMessages(prev => [
        ...prev,
        { 
          text: 'Sorry, I could not fetch the details for this case. Please try again later.', 
          sender: 'ai' 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message) => {
    if (message.caseDetails) {
      return (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">{message.caseDetails.title}</h3>
          
          <div className="bg-white p-4 rounded-lg shadow">

            <p className="text-sm mb-4" id="summary_data" dangerouslySetInnerHTML={{ __html: message.caseDetails.summary }}></p>

            {/* <h4 className="font-semibold mb-2 flex items-center">
              <FaFileAlt className="mr-2" /> Full Text:
            </h4>
            <div className="text-sm mb-4 max-h-64 overflow-y-auto p-2 bg-gray-50 rounded">
              {typeof message.caseDetails.fullText === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: message.caseDetails.fullText }} />
              ) : (
                <p>Full text not available</p>
              )}
            </div> */}
            
            {message.caseDetails.citations && message.caseDetails.citations.length > 0 && (
              <>
                <h4 className="font-semibold mb-2 flex items-center">
                  <FaGavel className="mr-2" /> Related Citations:
                </h4>
                <ul className="list-disc pl-6">
                  {message.caseDetails.citations.map((citation, idx) => (
                    <li key={idx} className="text-sm">{citation.citation || citation}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            Source: <a href={message.caseDetails.url} target="_blank" rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline">
              {message.caseDetails.url}
            </a>
          </div>
        </div>
      );
    }

    if (message.response && message.response.length > 0) {
      return (
        <div>
          <p className="mb-4">{message.text}</p>
          <div className="space-y-3">
            {message.response.map((result, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-md">{result.title}</h3>
                
                <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1 mb-2">
                  {result.date && result.date !== 'No Date' && (
                    <div className="flex items-center mr-3 mb-1">
                      <FaCalendarAlt className="mr-1" />
                      <span>Date: {result.date}</span>
                    </div>
                  )}
                  
                  {result.court && result.court !== 'No Court' && (
                    <div className="flex items-center mr-3 mb-1">
                      <FaGavel className="mr-1" />
                      <span>Court: {result.court}</span>
                    </div>
                  )}
                  
                  {result.documentId && result.documentId !== 'No Document ID' && (
                    <div className="flex items-center mb-1">
                      <FaFileAlt className="mr-1" />
                      <span>Doc ID: {result.documentId}</span>
                    </div>
                  )}
                </div>
                
                {result.headline && result.headline !== 'No Headline' && (
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    {result.headline}
                  </p>
                )}
                
                {result.link && (
                  <button 
                    onClick={() => {
                      handleReferenceClick(result.link, result.title);
                      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline focus:outline-none"
                  >
                    View Case Details
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return <p>{message.text}</p>;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col bg-gray-50 p-4 rounded-xl shadow-lg">
      
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-600 max-w-md">
              <h2 className="text-xl font-semibold mb-2">Welcome to NyāyaSearch</h2>
              <p className="mb-4 text-sm">Ask any question about Indian law, recent judgments, or legal procedures.</p>
              <div className="text-sm bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="font-medium text-blue-800 mb-1">Sample Search Queries:</p>  
                <p>"keyword: &lt;keyword&gt;, court: &lt;name&gt;, fromdate: &lt;DD-MM-YYYY&gt;, todate: &lt;DD-MM-YYYY&gt;"</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} space-x-4`}>
                {message.sender === 'ai' && (
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                    <FaRobot className="h-5 w-5" />
                  </div>
                )}
                <div className={`${message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-white'} p-4 rounded-lg shadow-md max-w-3xl`}>
                  {renderMessage(message)}
                </div>
                {message.sender === 'user' && (
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white flex-shrink-0">
                    <FaUser className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                  <FaRobot className="h-5 w-5" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-3 w-32">
                  <div className="text-gray-500">Typing</div>
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Search for legal cases or ask a question..."
            className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isLoading}
            list="suggestions"
          />
          <datalist id="suggestions">
            <option value="keyword: " label="Keyword" />
            <option value="court: " label="Court" />
            <option value="fromdate: " label="From Date" />
            <option value="todate: " label="To Date" />
          </datalist>
          <button
            type="submit"
            disabled={isLoading || newMessage.trim() === ''}
            className={`p-3 rounded-lg transition-all duration-200 ${
              newMessage.trim() === '' || isLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            aria-label="Send message"
          >
            <FaPaperPlane className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;