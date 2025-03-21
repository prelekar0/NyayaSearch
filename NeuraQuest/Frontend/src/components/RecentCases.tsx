import React, { useState, useEffect } from 'react';
import { FileText, Bookmark } from 'react-feather';

interface Case {
  title: string;
  citation: string;
  date: string;
  subject: string;
}

const RecentCases: React.FC = () => {
  const [recentCases, setRecentCases] = useState<Case[]>([]);

  useEffect(() => {
    const fetchRecentCases = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get_search_history/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        const cases = data.data.map((item: any) => ({
          title: item.query, // Assuming the query is the title
          citation: '', // Placeholder, as citation is not provided
          date: '', // Placeholder, as date is not provided
          subject: '', // Placeholder, as subject is not provided
        }));
        setRecentCases(cases);
      } catch (error) {
        console.error('Error fetching recent cases:', error);
      }
    };

    setInterval(() => {
      fetchRecentCases();
    }, 1000);
  }, []);

  return (
    <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
      <div className="glass-card p-6 h-screen">
        <div className="flex items-center justify-between mb-4 border-b border-law-border pb-2">
          <h2 className="font-medium text-lg flex items-center">
            <FileText className="h-5 w-5 text-law-primary mr-2" />
            Recent Searches
          </h2>
          <button className="text-sm text-law-primary hover:text-law-accent transition-colors duration-200">
            View All
          </button>
        </div>
        <div className="space-y-0">
          {recentCases.map((kase, index) => (
            <div key={index} className="p-3 rounded-lg hover:bg-law-muted/50 transition-colors duration-200 cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap" title={kase.title}>{kase.title}</h3>
                <button className="text-law-foreground/50 hover:text-law-primary overflow-hidden truncate">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentCases;