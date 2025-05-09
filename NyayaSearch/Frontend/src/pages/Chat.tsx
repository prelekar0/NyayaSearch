import React, { useRef } from 'react';
import ChatInterface from '../components/ChatInterface';
import RecentCases from '../components/RecentCases';
import { BookOpen, FileText, Search, History, Bookmark, Home, TrendingUp, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NewsLayer from '../components/NewsLayer';
// const yourRecentCasesArray = [
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
//     {
//         title: "K.S. Puttaswamy v. Union of India (2017) 10 SCC 1",
//         citation: "2017 SCC (1) 1",
//         date: "2017-01-01",
//         subject: "Privacy"
//     },
// ]

const Index = () => {
    const chatRef = useRef(null);
    const navigate = useNavigate();

    // Function to pass to SearchBar component
    const handleSearch = (query) => {
        if (chatRef.current && chatRef.current.sendMessage) {
            chatRef.current.sendMessage(query);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/3 h-screen overflow-y-auto border-r border-law-border">

                <RecentCases />
            </div>
            <div className="lg:col-span-2 glass-card overflow-hidden animate-fade-up h-screen w-full" style={{ animationDelay: '0.3s' }}>
                <ChatInterface ref={chatRef} />
            </div>
            <div className="w-1/3 h-screen overflow-y-auto border-l border-law-border">

                <div className="glass-card p-6 h-screen">
                    <h2 className="font-medium text-lg flex items-center mb-4">
                        <Search className="h-5 w-5 text-law-primary mr-2" />
                        Quick Access
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center p-4 bg-law-muted/50 rounded-lg hover:bg-law-muted transition-colors duration-200">
                            <Home className="h-6 w-6 text-law-primary mb-2" />
                            <span className="text-sm">Home</span>
                        </button>

                        <button onClick={() => navigate('/pro')} className="flex flex-col items-center justify-center p-4 bg-law-muted/50 rounded-lg hover:bg-law-muted transition-colors duration-200">
                            <Lock className="h-6 w-6 text-law-primary mb-2" />
                            <span className="text-sm">Upgrade to Pro</span>
                        </button>

                        <button onClick={() => navigate('/history')} className="flex flex-col items-center justify-center p-4 bg-law-muted/50 rounded-lg hover:bg-law-muted transition-colors duration-200">
                            <History className="h-6 w-6 text-law-primary mb-2" />
                            <span className="text-sm">User History</span>
                        </button>

                        <button className="flex flex-col items-center justify-center p-4 bg-law-muted/50 rounded-lg hover:bg-law-muted transition-colors duration-200">
                            <User className="h-6 w-6 text-law-primary mb-2" />
                            <span className="text-sm">Profile</span>
                        </button>
                    </div>
                    <NewsLayer />
                </div>
            </div>

        </div>

    );
};

export default Index;