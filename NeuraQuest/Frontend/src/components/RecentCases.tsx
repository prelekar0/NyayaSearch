import React from 'react';
import { FileText, Bookmark } from 'react-feather';

interface Case {
  title: string;
  citation: string;
  date: string;
  subject: string;
}

interface RecentCasesProps {
  recentCases: Case[];
}

const RecentCases: React.FC<RecentCasesProps> = ({ recentCases }) => {
  return (
    <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-lg flex items-center">
            <FileText className="h-5 w-5 text-law-primary mr-2" />
            Recent Searches
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
    </div>
  );
};

export default RecentCases; 